/*!
 * @packet mart.option.express;
 * @include mart.main; 
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.express", option: "@.express"}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [
    ],
    title: "查看快递"
});
Option({
    name:"express",
    override:{
        onendinit:function(){
            this.postData({
                url:basePath+"mart/express.json",
                back:function(data){
                    this.setValue(data);
                }
            });
        }
    }
});