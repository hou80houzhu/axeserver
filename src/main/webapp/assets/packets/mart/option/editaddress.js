/*!
 * @packet mart.option.editaddress;
 * @include mart.main; 
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.editaddress", option: ""}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "编辑地址"
});