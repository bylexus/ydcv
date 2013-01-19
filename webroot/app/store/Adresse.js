Ext.define("XV.store.Adresse", {
    extend: 'Ext.data.Store',
    config: {
        requires: ['XV.model.Adresse'],
        model: "XV.model.Adresse",
        proxy: 'Adresse',
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true
    }
    
});