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
            }
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {

        this.getComicInfo(this.onComicInfo);
    },

    getComicInfo: function(callback,nr) {
        nr = nr || 0;
        this.getLastComicBtn().disable();
        this.getNextComicBtn().disable();

        var url = 'http://xkcd.com/';
        if (nr > 0) {
            url += nr;
        }
        url += '/info.0.json';
        Ext.Viewport.setMasked(true);
        Ext.Ajax.request({
            url: url,
            success: function(ret) {
                try {
                    var retObj = Ext.JSON.decode(ret.responseText);
                    if (nr < 1) this.newestComic = retObj.num;
                    this.actComic = retObj.num;
                    this.onComicInfo(retObj);
                } catch (e) {

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
        var me = this;
        img.onload = function() {
            html = Ext.String.format(html,obj.img,img.width,img.height);
            me.getImage().setHtml(html);
            me.getImage().setSize({
                width: img.width,
                height: img.height
            });
            var imgEl = me.getImage().element.down('img');
            imgEl.setStyle({'vertical-align':'middle'});
            var cont = imgEl.parent();
            var panel = me.getImage().up('container');
            cont.setStyle({
                'text-align': 'center',
                'line-height': (panel.element.getHeight())+'px'
            });
            Ext.Viewport.setMasked(false);
        };
        img.src = obj.img;
        
        
        
        //this.getImage().setSrc(obj.img);
        
        this.getSubtext().setData({
            nr: obj.num,
            title: Ext.String.htmlEncode(obj.safe_title),
            content: Ext.String.htmlEncode(obj.alt)

        });
        this.getLastComicBtn().disable();
        this.getNextComicBtn().disable();
        if (this.newestComic > obj.num) {
            this.getNextComicBtn().enable();
        }
        if (obj.num > 1) {
            this.getLastComicBtn().enable();
        }
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
        this.getComicInfo(this.onComicInfo,this.actComic-1);
    },

    onNextComicTap: function() {
        this.getComicInfo(this.onComicInfo,this.actComic+1);
    }



});