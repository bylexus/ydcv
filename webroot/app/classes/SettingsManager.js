Ext.define('XV.class.SettingsManager', {
    alias: 'settingsManager',
    singleton: true,

    getLastComicIdent: function() {
        if (localStorage) {
            var last = localStorage.getItem('lastComic');
            if (last)
                return last;
        }
        return null;
    },

    setLastComicIdent: function(ident) {
        if (localStorage) {
            localStorage.setItem('lastComic',ident);
        }
    }
});