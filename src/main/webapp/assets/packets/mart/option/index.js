/*!
 * @packet mart.option.index; 
 * @require mart.main;
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.searchbar", option: "@.search"},
        {name: "@main.pictab", option: "@.pictab"},
        {name: "@main.iconmapping", option: "@.iconmapping"},
        {name: "@main.wrapline", option: "@.wrapline"},
        {name: "@main.temai", option: ""},
        {name: "@main.goodsboard", option: "@.goodsboardone"},
        {name: "@main.wrapline", option: "@.zhuti"},
        {name: "@main.iconmapping", option: "@.iconmapping2"},
        {name: "@main.wraptitle", option: "@.wraptitle"},
        {name: "@main.goodsboard2", option: "@.goodsboard2"},
        {name: "@main.sortmapping", option: "@.sortmapping"},
        {name: "@main.wraptitle", option: "@.wraptitle"},
        {name: "@main.goodsboard2", option: "@.goodsboard2"},
        {name: "@main.sortmapping", option: "@.sortmapping"},
        {name: "@main.wraptitle", option: "@.wraptitle"},
        {name: "@main.datalist-twocol", option: ""},
        {name: "@main.bottombar", option: "@.bottombar"}
    ]
});

Option({
    name: "search",
    url: "search",
    inputName: "query",
    parameter: {},
    placeholder: "搜索"
});
Option({
    name: "pictab",
    tabs: [
        {pic: "data/images/a.png", url: ""},
        {pic: "data/images/a.png", url: ""},
        {pic: "data/images/a.png", url: ""},
        {pic: "data/images/a.png", url: ""}
    ],
    override: {
        event_aa: function () {
            console.log("--------------->>>");
        }
    }
});
Option({
    name: "iconmapping",
    mapping: [
        {name: "商品类目", icon: basePath + 'assets/packets/mart/style/images/icons/icon-11.png', url: "", title: ""},
        {name: "购物车", icon: basePath + 'assets/packets/mart/style/images/icons/icon-12.png', url: "", title: ""},
        {name: "我的牧元", icon: basePath + 'assets/packets/mart/style/images/icons/icon-13.png', url: "", title: ""},
        {name: "充值", icon: basePath + 'assets/packets/mart/style/images/icons/icon-14.png', url: "", title: ""},
        {name: "热卖推荐", icon: basePath + 'assets/packets/mart/style/images/icons/icon-15.png', url: "", title: ""},
        {name: "精选商品", icon: basePath + 'assets/packets/mart/style/images/icons/icon-16.png', url: "", title: ""},
        {name: "我的牧元", icon: basePath + 'assets/packets/mart/style/images/icons/icon-17.png', url: "", title: ""},
        {name: "充值", icon: basePath + 'assets/packets/mart/style/images/icons/icon-18.png', url: "", title: ""}
    ]
});
Option({
    name: "wrapline",
    title: "今日特卖"
});
Option({
    name: "goodsboardone",
    goods: [
        {img: basePath + "mart/images/boardone-1.png", url: ""},
        {img: basePath + "mart/images/boardone-2.png", url: ""},
        {img: basePath + "mart/images/boardone-3.png", url: ""},
        {img: basePath + "mart/images/boardone-4.png", url: ""}
    ]
});
Option({
    name: "zhuti",
    title: "主题分类"
});
Option({
    name: "iconmapping2",
    mapping: [
        {name: "牛肉", icon: basePath + 'assets/packets/mart/style/images/icons/icon-21.png', url: "", title: ""},
        {name: "羊肉", icon: basePath + 'assets/packets/mart/style/images/icons/icon-22.png', url: "", title: ""},
        {name: "肉干", icon: basePath + 'assets/packets/mart/style/images/icons/icon-23.png', url: "", title: ""},
        {name: "奶酪", icon: basePath + 'assets/packets/mart/style/images/icons/icon-24.png', url: "", title: ""},
        {name: "奶茶", icon: basePath + 'assets/packets/mart/style/images/icons/icon-25.png', url: "", title: ""},
        {name: "马奶酒", icon: basePath + 'assets/packets/mart/style/images/icons/icon-26.png', url: "", title: ""},
        {name: "旅游", icon: basePath + 'assets/packets/mart/style/images/icons/icon-27.png', url: "", title: ""},
        {name: "其他", icon: basePath + 'assets/packets/mart/style/images/icons/icon-28.png', url: "", title: ""}
    ]
});
Option({
    name: "wraptitle",
    title: "<i class='fa fa-coffee'></i> 猜你喜欢"
});
Option({
    name: "goodsboard2",
    goods: [
        {img: basePath + "mart/images/goods2-1.png", url: ""},
        {img: basePath + "mart/images/goods2-2.png", url: ""},
        {img: basePath + "mart/images/goods2-3.png", url: ""}
    ]
});
Option({
    name: "sortmapping",
    mapping: [
        {name: "牛肉", url: ""},
        {name: "牛肉", url: ""},
        {name: "牛肉", url: ""},
        {name: "牛肉", url: ""},
        {name: "牛肉", url: ""},
        {name: "牛肉", url: ""},
        {name: "牛肉", url: ""},
        {name: "牛肉", url: ""},
        {name: "牛肉", url: ""},
        {name: "牛肉", url: ""}
    ]
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