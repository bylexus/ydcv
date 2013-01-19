Ext.define('XV.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
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
                    title: 'YDC',
                    itemId: 'imageTitlebar',
                    items: [{
                        text: 'prev',
                        ui: 'back',
                        action: 'lastComic',
                        align: 'left'
                    }, {
                        iconCls: 'list',
                        iconMask: true,
                        align: 'right',
                        action: 'selectComic'
                    },{
                        text: 'next',
                        ui: 'forward',
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

            }, {
                title: 'Settings',
                iconCls: 'settings'
            }, {
                title: 'About',
                iconCls: 'info2'
            }]
    },

    onBtnClick: function(btn) {
        console.log(btn);
    }
});
