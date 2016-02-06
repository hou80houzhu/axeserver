/*!
 * @packet mart.option.orderdetail;
 * @include mart.main; 
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.header", option: "@.header"},
        {name: "@main.orderdetail", option: "@.orderdetail"}
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
    title:"订单详情"
});
Option({
    name:"orderdetail",
    override:{
        onendinit:function(){
            this.postData({
                url:basePath+"mart/orderdetail.json",
                back:function(data){
                    this.setValue(data);
                }
            });
        }
    }
});