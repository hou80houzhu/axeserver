/*!
 * @packet mart.option.worderdetail;
 * @include mart.main; 
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.worderdetail", option: "@.worderdetail"}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "填写订单"
});
Option({
    name:"worderdetail",
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