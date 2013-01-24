Ext.define('XV.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    _comicSelPanel: null,

    requires: ['Ext.TitleBar'],
    config: {
        tabBarPosition: 'bottom',
        ui: 'mainTabpanel',

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
                styleHtmlContent: true,
                cls: 'subtext'
            }]

        }, {
                title: 'About',
                iconCls: 'info2',
                items:[{
                    xtype: 'titlebar',
                    title: 'YDCV - Your Daily Comic Viewer',
                    docked: 'top',
                    ui: 'topbar'
                }, {
                    styleHtmlContent: true,
                    cls: 'about',
                    html:
                    '<div class="subtitle">A very simplistic, fast, slick web comic viewer offering exactly the solution for my need: reading my favorite web comics. Not more, not less.</div>'+
                    '<div class="disclaimer">&copy; 2013 Alexander Schenkel, <a href="http://www.alexi.ch">alexi.ch</a></div>'+
                    '<div class="thanks">Thanks to:<ul><li><a href="http://schtoeffel.ch/">schtoeffel</a> for many ideas, designs, code</li></ul></div>'
                }]
            }
        ]
    },

    initialize: function() {
        this.callParent(arguments);
        var comicItems = [];

        Ext.Object.each(XV.classes.AbstractComic.comics, function(ident,item) {
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
