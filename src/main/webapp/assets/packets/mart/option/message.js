/*!
 * @packet mart.option.message; 
 * @include mart.main;
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.datalist-message", option: "@.message"}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "系统消息"
});
Option({
    name:"message",
    url: basePath+"mart/messagelist.json"
});