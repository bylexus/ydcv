Ext.define('XV.model.Adresse', {
    extend: 'Ext.data.Model',
    alias: 'model.Adresse',
    requires: ['XV.proxy.Adresse'],
    config: {
    	proxy: 'Adresse',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'vorname', type: 'string'},
            {name: 'nachname', type: 'string'}
        ]
    }
});