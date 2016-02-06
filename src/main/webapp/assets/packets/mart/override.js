(function ($) {
    $.overrideRoot({
        onimportoptionstart:function(){
            $("body").html("<div style='position:absolute;left:0;top:0;right:0;bottom:0;background:url("+basePath+"assets/packets/mart/style/images/muyuan.png) no-repeat center white;'></div><div style='line-height:40px;text-align:center;position:absolute;left:0;bottom:0;right:0;background:#E9EFF8;'>Loading...</div>");
        },
        onimportoptionend:function(){
            $("body").empty();
        },
        onimportprogress:function(e){
            console.log(e);
        }
    });
})(brooder);