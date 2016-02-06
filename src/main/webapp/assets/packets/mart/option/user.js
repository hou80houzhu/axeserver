/*!
 * @packet mart.option.user; 
 * @include mart.main;
 */
Option({
    name: "page",
    autoLoad: false,
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.userheader", option: ""},
        {name: "@main.iconmapping", option: "@.iconmapping"},
        {name: "@main.wrapline", option: "@.zhuti"},
        {name: "@main.datalist-twocol", option: ""},
        {name: "@main.bottombar", option: "@.bottombar"}
    ],
    override: {
        onendinit: function () {
            this.postData({
                url: window.basePath + "data/dataok.json",
                back:function(){
                    this.loadPage();
                },
                dataerror: function () {
                    this.dispatchEvent("redirecPage", {url: "login"});
                }
            });
        }
    }
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "用户中心"
});
Option({
    name: "iconmapping",
    mapping: [
        {name: "我的订单", icon: basePath + 'packets/mart/style/images/icons/icon-1.png', url: "orderlist", title: "orderlist"},
//        {name: "待付款", icon: basePath + 'packets/mart/style/images/icons/icon-2.png', url: "", title: ""},
//        {name: "待收货", icon: basePath + 'packets/mart/style/images/icons/icon-3.png', url: "", title: ""},
//        {name: "待发货", icon: basePath + 'packets/mart/style/images/icons/icon-4.png', url: "", title: ""},
        {name: "消息", icon: basePath + 'packets/mart/style/images/icons/icon-5.png', url: "message", title: ""},
        {name: "我的钱包", icon: basePath + 'packets/mart/style/images/icons/icon-6.png', url: "favourable", title: ""},
        {name: "账户管理", icon: basePath + 'packets/mart/style/images/icons/icon-7.png', url: "userinfo", title: ""}
//        {name: "退款/售后", icon: basePath + 'packets/mart/style/images/icons/icon-8.png', url: "", title: ""}
    ]
});
Option({
    name: "zhuti",
    title: "猜你喜欢"
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
