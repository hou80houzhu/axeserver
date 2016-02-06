/*!
 * @packet mart.option.page1; 
 * @include mart.form;
 */
Option({
    name: "pictab",
    tabs: [
        {pic: "data/images/a.png", url: ""},
        {pic: "data/images/a.png", url: ""},
        {pic: "data/images/a.png", url: ""},
        {pic: "data/images/a.png", url: ""}
    ]
});
Option({
    name: "btntab",
    tabs: [
        {title: "tab1"},
        {title: "tab2"},
        {title: "tab3"},
        {title: "tab4"}
    ]
});
Option({
    name: "bottombar",
    btns: [
        {name: "首页", title: "首页", icon: "fa fa-home", url: "mart.php"},
        {name: "推荐", title: "推荐", icon: "fa fa-tags", url: "test/page1"},
        {name: "购物车", title: "购物车", icon: "fa fa-shopping-cart", url: "test/page2"},
        {name: "我的牧元", title: "我的牧元", icon: "fa fa-user", url: "test/login"}
    ]
});
Option({
    name: "regist",
    form: {
        fields: [
            {type: "@form.text", name: "username", label: "username", required: true},
            {type: "@form.text", name: "password", label: "password", required: true},
            {type: "@form.text", name: "password", label: "password", required: true}
        ]
    }
});

