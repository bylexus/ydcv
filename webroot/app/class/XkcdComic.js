Ext.define('XV.class.XkcdComic', {
    extend: 'XV.class.AbstractComic',
    actComic: 0,
    newestComic: 0,

    getActComicInfo: function(callback, scope) {
        var nr = this.actComic || 0;

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
                    this.actComic = retObj.num;
                    callback.call(scope, this, {
                        img: retObj.img,
                        num: retObj.num,
                        safe_title: retObj.safe_title,
                        safe_text: Ext.String.htmlEncode(retObj.alt)
                    });
                } catch(e) {
                    console.log(e);
                }
            },
            failure: function() {},
            scope: this
        });
    },

    prepareNewerComic: function() {
        if(this.actComic < this.newestComic) {
            this.actComic++;
        }

    },
    prepareOlderComic: function() {
        if(this.actComic > 1) {
            this.actComic--;
        }
    },

    hasNewerComic: function() {
        return this.newestComic > this.actComic;
    },

    hasOlderComic: function() {
        return this.actComic > 1;
    }


});