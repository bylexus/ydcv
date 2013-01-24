Ext.define('XV.classes.AbstractComic', {
	statics: {
		comics: {
			'xkcd': {
				name: 'XKCD',
				className: 'XV.classes.XkcdComic'
			},
			'dilbert': {
				name: 'Dilbert',
				className: 'XV.classes.DilbertComic'
			},
			'smbc': {
				name: 'SMBC',
				className: 'XV.classes.SmbcComic'
			}
		},

		/**
		 * static factory function to return an implementing
		 * comic class.
		 */
		getComicObject: function(ident, callback, scope) {
			Ext.require(this.comics[ident].className, function() {
				var comicObj = Ext.create(this.comics[ident].className);
				callback.call(scope, comicObj);
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