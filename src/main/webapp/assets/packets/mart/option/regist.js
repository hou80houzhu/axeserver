/*!
 * @packet mart.option.regist; 
 * @include mart.main;
 * @include mart.option.page1;
 */
Option({
    name: "page",
    autoLoad: true,
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.header", option: "@.header"},
        {name: "@main.regist", option: "@page1.regist"}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: ""
});
Option({
    name:"header",
    title:"用户注册"
});
