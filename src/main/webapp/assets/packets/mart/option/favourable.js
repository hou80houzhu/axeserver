/*!
 * @packet mart.option.favourable;
 * @include mart.main; 
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.integral", option: ""},
        {name: "@main.datalist-favourable", option: "@.favourable"},
        {name: "@main.favourablebtn", option: ""}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "我的钱包"
});
Option({
    name:"favourable",
    url:basePath+"mart/favourablelist.json"
});