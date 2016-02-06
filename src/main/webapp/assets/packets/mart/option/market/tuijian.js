/*!
 * @packet mart.option.market.tuijian; 
 * @require mart.main;
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.pictab", option: "@.pictab"},
        {name: "@main.datalist-twocol", option: "@.twocol"},
        {name: "@main.bottombar", option: "@.bottombar"}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "今日推荐"
});
Option({
    name: "pictab",
    tabs: [
        {pic: basePath+"mart/images/a.png", url: ""},
        {pic: basePath+"mart/images/a.png", url: ""},
        {pic: basePath+"mart/images/a.png", url: ""},
        {pic: basePath+"mart/images/a.png", url: ""}
    ]
});
Option({
    name:"twocol",
    url:basePath+"mart/datalist_1.json"
});
Option({
    name: "bottombar",
    btns: [
        {name: "首页", title: "首页", icon: "fa fa-home", url: "index"},
        {name: "推荐", title: "推荐", icon: "fa fa-tags", url: "market/tuijian"},
        {name: "购物车", title: "购物车", icon: "fa fa-shopping-cart", url: "shoppingcar"},
        {name: "我的牧元", title: "我的牧元", icon: "fa fa-user", url: "user"}
    ]
});