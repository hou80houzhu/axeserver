/*!
 * @packet mart.option.integraldetail;
 * @include mart.main; 
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.datalist-integraldetail", option: "@.integraldetail"}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "积分明细"
});
Option({
    name:"integraldetail",
    url:basePath+"mart/integraldetaillist.json"
});