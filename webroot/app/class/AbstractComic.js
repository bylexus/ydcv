Ext.define('XV.class.AbstractComic', {
	statics: {
		comics: {
	        'xkcd': {
	            name: 'XKCD',
	            className: 'XV.class.XkcdComic'
	        },
	        'dilbert': {
	            name: 'Dilbert',
	            className: 'XV.class.DilbertComic'
	        },
	        'smbc': {
	            name: 'SMBC',
	            className: 'XV.class.SmbcComic'
	        }
	    },

	    /**
	     * static factory function to return an implementing
	     * comic class.
	     */
	    getComicObject: function(ident,callback,scope) {
	    	Ext.require(this.comics[ident].className, function() {
	            var comicObj = Ext.create(this.comics[ident].className);
	            callback.call(scope,comicObj);
	        }, this);
	    }
	},



	/**
	 * Abstract class, need to be implemented by child class.
	 * @see XV.class.XkcdComic
	 */
	getActComicInfo: function(callback) {

	},

	/**
	 * Abstract class, need to be implemented by child class.
	 * @see XV.class.XkcdComic
	 */
	prepareNewerComic: function() {

	},

	/**
	 * Abstract class, need to be implemented by child class.
	 * @see XV.class.XkcdComic
	 */
	prepareOlderComic: function() {
		
	},

	/**
	 * Abstract class, need to be implemented by child class.
	 * @see XV.class.XkcdComic
	 */
	hasNewerComic: function() {

	},

	/**
	 * Abstract class, need to be implemented by child class.
	 * @see XV.class.XkcdComic
	 */
	hasOlderComic: function() {

	},

	/**
	 * Abstract class, need to be implemented by child class.
	 * @see XV.class.XkcdComic
	 */
	getComicInfo: function() {}
});