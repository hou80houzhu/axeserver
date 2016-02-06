/*!
 * @packet mart.option.selectfavourable;
 * @include mart.main; 
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.datalist-favourable", option: "@.favourable"}
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
Option({
    name: "favourable",
    url: basePath + "mart/favourablelist.json"
});