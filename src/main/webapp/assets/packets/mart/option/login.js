/*!
 * @packet mart.option.login; 
 * @include mart.main;
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.login", option: ""}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "用户登录"
});

