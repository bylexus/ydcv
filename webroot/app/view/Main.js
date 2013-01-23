Ext.define('XV.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    _comicSelPanel: null,

    comics: {
        'xkcd': {
            name: 'XKCD',
            className: 'XV.class.XkcdComic'
        },
        'dilbert': {
            name: 'Dilbert',
            className: 'XV.class.DilbertComic'
        }
    },

    requires: ['Ext.TitleBar'],
    config: {
        tabBarPosition: 'bottom',

        items: [{
            title: 'Comic',
            iconCls: 'photos2',
            itemId: 'comicPanel',
            scrollable: false,
            layout: {
                type: 'fit',
                align: 'stretch'
            },

            items: [{
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
                }, {
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
                items: [{
                    itemId: 'image',
                    margin: '0 0 20 0'
                }]

            }, {
                docked: 'bottom',
                itemId: 'subtext',
                tpl: ['<div class="descriptiveText">', '<div class="title"><a href="http://xkcd.com/{nr}" target="_blank">#{nr}</a>: {title}</div>', '<div class="content">{content}</div>', '</div>']

            }]

        }
        /*, {
                title: 'Settings',
                iconCls: 'settings'
            }, {
                title: 'About',
                iconCls: 'info2'
            }*/
        ]
    },

    initialize: function() {
        this.callParent(arguments);
        var comicItems = [];

        Ext.Object.each(this.comics, function(ident,item) {
            comicItems.push({
                xtype: 'radiofield',
                name: 'comic',
                value: ident,
                label: item.name
            });
        });

        var comicChoosePanel = Ext.create('Ext.form.Panel',{
            xtype: 'formpanel',
            itemId: 'comicChoosePanel',
            items: [{
                xtype: 'fieldset',
                title: 'Choose comic:',
                defaults: {
                    labelWidth: 80
                },
                items: comicItems
            }]
        });

        this._comicSelPanel = Ext.create('Ext.Panel', {
            left: 0,
            top: 0,
            width: 250,
            height: '50%',
            layout: 'fit',
            itemId: 'floatPanel',
            modal: true,
            padding: 5,
            hideOnMaskTap: true,
            items: [comicChoosePanel]
        });
    }
});
