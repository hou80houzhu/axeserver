/*!
 * @packet admin.option.test;
 * @include admin.group;
 * @include admin.form;
 * @include admin.photo;
 * @include admin.datepicker;
 */
Option({
    name: "main",
    find: {
        action: basePath + "data/dataok.json",
        fields: [
            {type: "@form.selecttree", label: "xxxx", name: "xx"},
            {type: "@form.selecttable", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"}
        ]
    },
    tableremove: {
        url: basePath + "data/dataok.json"
    },
    tableadd: {
        action: basePath + "data/dataok.json",
        fields: [
            {type: "@datepicker.datepicker", label: "xxxx", name: "xx"},
            {type: "@form.selecttree", label: "xxxx", name: "xx"},
            {type: "@form.selecttable", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"}
        ]
    },
    tableedit: {
        action: basePath + "data/dataok.json",
        fields: [
            {type: "@form.selecttree", label: "xxxx", name: "xx"},
            {type: "@form.selecttable", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"}
        ]
    },
    table: {
        dataurl: "data/table.json",
        cols: [
            {name: "keywords", key: 'keywords', ishow: true, width: 200},
            {name: "goods_no", key: 'goods_no', ishow: true, width: 200},
            {name: "状态", key: 'state', ishow: true, width: 200, center: true},
            {name: "content", key: 'bName', ishow: true, width: 200}
        ],
        tool: ["search", "refresh", "deletemulti", "add",
            {title: "popup", img: "fa fa-upload", type: "popup"},
        {title: "popup", img: "fa fa-upload", type: "popup2"}]
    },
    override: {
        event_popup: function () {
            this.addChild({
                type: "@group.popup"
            });
        },
        event_popup2:function(){
            this.addChild({
                type:"@group.popupgroup",
                option:{
                    type:"@group.tablegroup",
                    option:"admin.option.test.main",
                    width:800
                }
            });
        }
    }
});
Option({
    name: "quickmenu",
    mapping: {
        0: "admin.main.quicklink",
        1: "admin.main.quicklink",
        8: "admin.main.quicklink",
        14: "admin.main.quicklink",
        18: "admin.main.quicklink",
        23: "admin.main.quicklink",
        28: "admin.main.quicklink"
    }
});
Option({
    name: "site",
    mapping: {name: "kk"}
});
Option({
    name: "site-root",
    override: {
        oninitimportstart: function () {
            console.log("----start");
        },
        oninitimportprogress: function (e) {
            console.log("------progress--%o", e);
        },
        oninitimportend: function () {
            console.log("-------end");
        },
        onimportstart: function (a) {
            console.log("-------->>import:%o", a.module);
        },
        oninitchild: function (e) {
            console.log("-------->>%o---%o", e.id, e.type);
        }
    }
});
Option({
    name: "gallery",
    url: "data/gallery_1.json"
});

Option({
    name: "table2",
    treeadd: {
        action: basePath + "data/dataok.json",
        fields: [
            {type: "@datepicker.datepicker", label: "xxxx", name: "xx"},
            {type: "@form.selecttree", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"}
        ]
    },
    treeedit: {
        action: basePath + "data/dataok.json",
        fields: [
            {type: "@datepicker.datepicker", label: "xxxx", name: "xx"},
            {type: "@form.selecttree", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"}
        ]
    },
    find: {
        action: basePath + "data/dataok.json",
        fields: [
            {type: "@form.selecttree", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"}
        ]
    },
    tableedit: {
        action: basePath + "data/dataok.json",
        fields: [
            {type: "@form.selecttree", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"}
        ]
    },
    tableadd: {
        action: basePath + "data/dataok.json",
        fields: [
            {type: "@datepicker.datepicker", label: "xxxx", name: "xx"},
            {type: "@form.selecttree", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"},
            {type: "@form.text", label: "xxxx", name: "xx"}
        ]
    },
    table: {
        dataurl: "data/table.json",
        cols: [
            {name: "keywords", key: 'keywords', ishow: true, width: 200},
            {name: "goods_no", key: 'goods_no', ishow: true, width: 200},
            {name: "状态", key: 'state', ishow: true, width: 200, center: true},
            {name: "content", key: 'bName', ishow: true, width: 200}
        ],
        tool: ["search", "refresh", "deletemulti", "add"]
    }
});
Option({
    name: "tab",
    tabs: [
        {name: "tab1", inner: "@group.treetablegroup", option: "admin.option.test.main"},
        {name: "tab2", inner: "", option: ""}
    ]
});