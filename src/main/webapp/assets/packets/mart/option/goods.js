/*!
 * @packet mart.option.goods; 
 * @include mart.main;
 * @include mart.option.page1;
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.pictab", option: "@page1.pictab"},
        {name: "@main.goodsdetail", option: ""},
        {name: "@main.wraptitle", option: "@.wraptitle"},
        {name: "@main.datalist-twocol", option: ""}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "商品详情"
});
Option({
    name: "wraptitle",
    title: "<i class='fa fa-coffee'></i> 精选商品"
});