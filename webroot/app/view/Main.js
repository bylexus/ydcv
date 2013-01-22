Ext.define('XV.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    _comicSelPanel: null,

    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Comic',
                iconCls: 'photos2',
                itemId: 'comicPanel',
                scrollable: false,
                layout: {
                    type: 'fit',
                    align: 'stretch'
                },

                items: [/*{
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2',
                    items: [{
                        iconCls: 'more',
                        iconMask: true,
                        action: 'sqlBtn'

                    }]
                }, {
                    xtype: 'list',
                    itemTpl: '{vorname} {nachname}',
                    store: 'Adresse'

                }*/
                {
                    xtype: 'titlebar',
                    docked: 'top',
                    title: 'YDCV',
                    itemId: 'imageTitlebar',
                    ui: 'topbar',
                    defaults: {
                        ui: 'topbtn'
                    },
                    items: [{
                        text: 'prev',
                        cls: 'x-button-back',
                        action: 'lastComic',
                        align: 'left'
                    }, {
                        iconCls: 'list',
                        iconMask: true,
                        align: 'right',
                        action: 'selectComic'
                    },{
                        text: 'next',
                        cls: 'x-button-forward',
                        action: 'nextComic',
                        align: 'right'
                    }]
                }, {
                    scrollable: 'both',
                    itemId: 'imageContainer',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'left'
                    },
                    items:[{
                        cls: 'comicImg',
                        itemId: 'image',
                        margin: '0 0 20 0',
                    }]
                    
                }, {
                    docked: 'bottom',
                    itemId: 'subtext',
                    tpl: [
                        '<div class="descriptiveText">',
                            '<div class="title"><a href="http://xkcd.com/{nr}" target="_blank">#{nr}</a>: {title}</div>',
                            '<div class="content">{content}</div>',
                        '</div>'
                    ]

                }]

            }/*, {
                title: 'Settings',
                iconCls: 'settings'
            }, {
                title: 'About',
                iconCls: 'info2'
            }*/]
    },

    initialize: function() {
        this.callParent(arguments);
        this._comicSelPanel = Ext.create('Ext.Panel', {
            left: 0,
            top: 0,
            layout: 'fit',
            modal: true,
            padding: 5,
            hideOnMaskTap: true,
            items: [{
                xtype: 'fieldset',
                title: 'Choose comic:',
                defaults: {
                    labelWidth: 160
                },
                items: [{
                    xtype: 'radiofield',
                    name: 'comic',
                    value: 'xkcd',
                    label: 'XKCD',
                    checked: true
                }, {
                    xtype: 'radiofield',
                    name: 'comic',
                    value: 'dilbert',
                    label: 'Dilbert'
                }]
            }]
        });
    }
});
