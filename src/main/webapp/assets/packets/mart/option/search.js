/*!
 * @packet mart.option.search; 
 * @require mart.main;
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.searchbar", option: "@.searchbar"},
        {name: "@main.multisearch", option: "@.multisearch"},
        {name: "@main.datalist", option: "@.list"}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "搜索"
});
Option({
    name: "searchbar",
    url: "search",
    inputName: "query",
    parameter: {},
    placeholder: "搜索",
    override: {
        onendinit: function () {
            var val = this.parentView.parameters.query;
            if (val) {
                this.dom.find("input").val(val.query);
            }
        }
    }
});
Option({
    name: "multisearch",
    override: {
        event_selectend: function () {
            this.parentView.getChildAt(3).search();
        }
    }
});
Option({
    name: "list",
    url: basePath + "data/datalist.json",
    pageName: "page",
    pageSizeName: "pageSize",
    pageSize: 10,
    autoLoad: true,
    override: {
        onendinit: function () {
            this.search();
        },
        search: function () {
            var t = {};
            $.extend(t, this.parentView.parameters.parameters);
            $.extend(t, this.parentView.getChildAt(2).getValue());
            this.setParameter(t);
            this.refresh();
        }
    }
});