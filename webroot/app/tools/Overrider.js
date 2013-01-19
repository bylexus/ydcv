Ext.define('Ext.ContainerOverride', {
     override: 'Ext.Container',
     setMasked: function(value) {
     	if (value !== false) {
     		value = {
			    xtype: 'loadmask',
				message: 'lade...'
 			};
 		}
     	this.callParent([value]);
     }
 });