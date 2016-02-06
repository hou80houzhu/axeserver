/*!
 * @packet mart.option.shoppingcar; 
 * @require mart.main;
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.datalist-shoppingcar", option: "@.list"},
        {name: "@main.shoppingcarbtn", option: "@.shoppingcarbtn"},
        {name: "@main.bottombar", option: "@.bottombar"}
    ],
    override:{
        event_nodata:function(e){
            this.getChildAt(2).remove();
        }
    }
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "购物车"
});
Option({
    name: "list",
    url: basePath + "mart/shoppingcar.json"
});
Option({
    name:"shoppingcarbtn",
    override:{
        find_check:function(dom){
            var ths=this;
            dom.button(function(){
                if($(this).hasClass("check")){
                    ths.parentView.getChildAt(1).unCheckAll();
                    $(this).removeClass("check");
                }else{
                    ths.parentView.getChildAt(1).checkAll();
                    $(this).addClass("check");
                }
            });
        }
    }
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