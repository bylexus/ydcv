Ext.define('XV.class.XkcdComic', {
    extend: 'XV.class.AbstractComic',
    actComic: 0,
    newestComic: 0,

    getActComicInfo: function(callback, scope) {
        var nr = ((this.actComic)?this.actComic.num:0)||0;

        var url = 'http://xkcd.com/';
        if(nr > 0) {
            url += nr;
        }
        url += '/info.0.json';
        Ext.Ajax.request({
            url: url,
            success: function(ret) {
                try {
                    var retObj = Ext.JSON.decode(ret.responseText);
                    if(nr < 1) this.newestComic = retObj.num;
                    this.actComic = retObj;
                    callback.call(scope, this, this.getComicInfo());
                } catch(e) {
                    console.log(e);
                }
            },
            failure: function() {},
            scope: this
        });
    },
    getComicInfo: function() {
        return {
                        img: this.actComic.img,
                        num: this.actComic.num,
                        safe_title: this.actComic.safe_title,
                        safe_text: Ext.String.htmlEncode(this.actComic.alt)
                    }
    },
    prepareNewerComic: function() {
        if(this.actComic.num < this.newestComic) {
            this.actComic.num++;
        }

    },
    prepareOlderComic: function() {
        if(this.actComic.num > 1) {
            this.actComic.num--;
        }
    },

    hasNewerComic: function() {
        return this.newestComic > this.actComic.num;
    },

    hasOlderComic: function() {
        return this.actComic.num > 1;
    }


});