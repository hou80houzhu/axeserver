/*!
 * @packet mart.option.bill;
 * @include mart.main; 
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.bill", option: ""}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [
        {action: "ok", icon: "fa fa-check"}
    ],
    title: "选择优惠券",
    override:{
        event_ok:function(){
            window.history.back();
        }
    }
});