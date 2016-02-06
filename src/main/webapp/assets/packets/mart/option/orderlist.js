/*!
 * @packet mart.option.orderlist; 
 * @include mart.main;
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.singlestatebar", option: "@.singlestatebar"},
        {name: "@main.datalist-orderlist", option: "@.orderlist"}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "订单管理"
});
Option({
    name: "singlestatebar",
    state: [
        {name: "全部", value: ""},
        {name: "未付款", value: ""},
        {name: "待收货", value: ""},
        {name: "待发货", value: ""}
    ]
});
Option({
    name: "orderlist",
    url: basePath + "mart/orderlist.json"
});