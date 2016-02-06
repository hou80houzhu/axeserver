/*!
 * @packet mart.option.addresslist;
 * @include mart.main; 
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.datalist-addresslist", option: "@.addresslist"}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [
        {action: "add", icon: "fa fa-plus"}
    ],
    title: "地址管理",
    override:{
        event_add:function(){
            this.dispatchEvent("openPage",{
                url:"editaddress"
            });
        }
    }
});
Option({
    name:"addresslist",
    url:basePath+"mart/addresslist.json"
});