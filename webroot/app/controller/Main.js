Ext.define('XV.controller.Main', {
    extend: 'Ext.app.Controller',

    actComic: 0,
    newestComic: 0,

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
            selComicBtn: 'button[action=selectComic]'
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
                initialize: 'initSwipeNavigation'
            }
        }
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {
        this.getComicInfo(this.onComicInfo);
    },
    initSwipeNavigation: function(cmp) {
        cmp.element.on('swipe', function(e){
            if (e.direction === 'left') {
                this.onNextComicTap();
            } else {
                this.onLastComicTap();
            }
        },this);
    },
    getComicInfo: function(callback, nr) {
        nr = nr || 0;
        this.getLastComicBtn().disable();
        this.getNextComicBtn().disable();

        var url = 'http://xkcd.com/';
        if(nr > 0) {
            url += nr;
        }
        url += '/info.0.json';
        Ext.Viewport.setMasked(true);

        Ext.Ajax.request({
            url: url,
            success: function(ret) {
                try {
                    var retObj = Ext.JSON.decode(ret.responseText);
                    if(nr < 1) this.newestComic = retObj.num;
                    this.actComic = retObj.num;
                    this.onComicInfo(retObj);
                } catch(e) {

                }
            },
            failure: function() {
                Ext.Viewport.setMasked(false);
            },
            scope: this
        });

    },

    onComicInfo: function(obj) {
        var html = '<img src="{0}" width="{1}" height="{2}"/>';
        var img = new Image();
        Ext.Anim.run(this.getImage(), 'slide', {
            out: true,
            autoClear: false,
            direction: this.direction || 'left',
            after: function() {
                img.src = obj.img;
                //this.getImage().setSrc(obj.img);
                this.getSubtext().setData({
                    nr: obj.num,
                    title: Ext.String.htmlEncode(obj.safe_title),
                    content: Ext.String.htmlEncode(obj.alt)

                });
                this.getLastComicBtn().disable();
                this.getNextComicBtn().disable();
                if(this.newestComic > obj.num) {
                    this.getNextComicBtn().enable();
                }
                if(obj.num > 1) {
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
        this.direction = 'right';
        this.getComicInfo(this.onComicInfo, this.actComic - 1);
    },

    onNextComicTap: function() {
        this.direction = 'left';
        this.getComicInfo(this.onComicInfo, this.actComic + 1);
    },


    onSelComicBtn: function(btn) {
        console.log('here');
        this.getMain()._comicSelPanel.showBy(btn);
    }



});