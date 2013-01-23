Ext.define('XV.controller.Main', {
    extend: 'Ext.app.Controller',

    _comicObj: null,

    config: {
        models: ['Adresse'],
        stores: ['Adresse'],
        refs: {
            main: 'main',
            comicPanel: '#comicPanel',
            imageTitlebar: '#imageTitlebar',
            image: '#image',
            subtext: '#subtext',
            lastComicBtn: 'button[action=lastComic]',
            nextComicBtn: 'button[action=nextComic]',
            selComicBtn: 'button[action=selectComic]',
            comicChoosePanel: '#comicChoosePanel'
        },
        control: {
            sqlBtn: {
                tap: 'onSqlBtnTap'
            },
            lastComicBtn: {
                tap: 'onLastComicTap'
            },
            nextComicBtn: {
                tap: 'onNextComicTap'
            },
            selComicBtn: {
                tap: 'onSelComicBtn'
            },
            main: {
                initialize: 'onMainInit'
            },
            '#comicChoosePanel radiofield[name=comic]': {
                check: 'onComicChoose'
            }
        }
    },
    
    onMainInit: function(cpanel) {
        var radio = this.getComicChoosePanel().down('radiofield[name=comic]');
        radio.check();
        this.onComicChoose(radio);
        this.initSwipeNavigation(cpanel);
    },

    initSwipeNavigation: function(cmp) {
        cmp.element.on('swipe', function(e){
            if (e.duration > 90) return true;
            if (e.direction === 'left') {
                this.onNextComicTap();
            } else if (e.direction === 'right'){
                this.onLastComicTap();
            }
        },this);
    },

    getComicInfo: function(comicObj) {
        this.getLastComicBtn().disable();
        this.getNextComicBtn().disable();

        Ext.Viewport.setMasked(true);
        comicObj.getActComicInfo(this.onComicInfo,this);
    },

    onComicInfo: function(comicObj,obj) {
        console.log('object: ',obj);
        var html = '<img src="{0}" width="{1}" height="{2}"/>';
        var img = new Image();
        Ext.Anim.run(this.getImage(), 'slide', {
            out: true,
            autoClear: false,
            direction: this.direction || 'left',
            after: function() {
                img.src = obj.img;
        
                this.getSubtext().setData({
                    nr: obj.num,
                    title: Ext.String.htmlEncode(obj.safe_title),
                    content: Ext.String.htmlEncode(obj.safe_text)

                });
                this.getLastComicBtn().disable();
                this.getNextComicBtn().disable();
                if (comicObj.hasNewerComic()) {
                    this.getNextComicBtn().enable();
                }
                if (comicObj.hasOlderComic()) {
                    this.getLastComicBtn().enable();
                }
            },
            scope: this
        });
        img.onload = function() {
            Ext.Anim.run(this.getImage(), 'slide', {
                out: false,
                autoClear: false,
                direction: this.direction || 'left'
            });
            html = Ext.String.format(html, obj.img, img.width, img.height);
            this.getImage().setHtml(html);
            this.getImage().setSize({
                width: img.width,
                height: img.height
            });
            var imgEl = this.getImage().element.down('img');
            imgEl.setStyle({
                'vertical-align': 'middle'
            });
            var cont = imgEl.parent();
            var panel = this.getImage().up('container');
            cont.setStyle({
                'text-align': 'center',
                'line-height': (panel.element.getHeight()) + 'px'
            });
            Ext.Viewport.setMasked(false);
        }.bind(this);
    },

    onSqlBtnTap: function() {
        Ext.Viewport.setMasked(true);
        var m = Ext.create('XV.model.Adresse', {
            vorname: 'Alex',
            nachname: 'Schenkel'
        });

        var st = Ext.getStore('Adresse');
        st.add(m);
        st.sync();
    },

    onLastComicTap: function() {
        if (this._comicObj) {
            this._comicObj.prepareOlderComic();
            this.direction = 'right';
            this.getComicInfo(this._comicObj);
        }
    },

    onNextComicTap: function() {
        if (this._comicObj) {
            this._comicObj.prepareNewerComic();
            this.direction = 'left';
            this.getComicInfo(this._comicObj);
        }
    },


    onSelComicBtn: function(btn) {
        this.getMain()._comicSelPanel.showBy(btn);
    },

    onComicChoose: function(radiofield) {
        var comic = this.getComicChoosePanel().getValues().comic;
        Ext.require(this.getMain().comics[comic].className,function() {
            this._comicObj = Ext.create(this.getMain().comics[comic].className);
            this.getComicInfo(this._comicObj);
        },this);

        var panel = radiofield.up('#floatPanel');
        if (panel)
            panel.hide();
    }
});