//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'XV': 'app'
});
//</debug>

Ext.application({
    name: 'XV',

    requires: [
        'Ext.MessageBox',
        'Ext.dataview.List',
        'XV.class.AbstractComic'
    ],

    views: ['Main'],
    controllers: ['Main'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('XV.view.Main'));
        /*
        Ext.create('Ext.Container',{
            fullscreen: true,
            items:[{
                docked: 'top',
                xtype: 'titlebar',
                title: 'title',
                items: [{
                    xtype: 'button',
                    text: 'open floating panel form',
                    handler: function(btn) {
                        var panel = Ext.create('Ext.Panel', {
                            left: 0,
                            top: 0,
                            layout: 'fit',
                            modal: true,
                            hideOnMaskTap: true,
                            items: [{
                                    xtype: 'textfield',
                                    name: 'myfield',
                                    label: 'myfield',
                                    labelWidth: 200
                                
                            }]
                        });
                        panel.showBy(btn);
                    }
                }]
            }, {
                    html: 'test content'
            }]
        });
*/
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
