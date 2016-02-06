/*!
 * @packet question.root; 
 * @require question.main;
 */
Option({
    name: "main",
    option: {
        override_event_start: function () {
            this.children[0].remove();
            this.addChild({
                type: "@main.page",
                parameters: $.global.info
            });
        },
        override_event_alldone: function (e) {
            $.loadingbar().showLoading("submiting...");
            this.postRequest(basePath+"question/post",this.getPostData(e.data)).data(function () {
                $.loadingbar().close();
                this.children[0].remove();
                this.addChild({
                    type: "@main.end",
                    option: {desc: $.global.info.end.desc}
                });
            });
        },
        override_onendinit: function () {
            $.loadingbar().showLoading("正在初始化程序...");
            this.postRequest(basePath+"data/question.json").data(function (a) {
                $.global.info = a;
                $.loadingbar().close();
                this.addChild({
                    type: "@main.start",
                    option: a
                });
            });
        },
        override_getPostData: function (data) {
            var temp = "<h1>" + $.global.info.name + "[" + $.global.info.id + "]</h1>", values = [], completes = [];
//            temp += "<p>" + $.global.info.desc + "</p>";
            for (var i = 0; i < data.length; i++) {
                var complete = data[i].complete;
                var value = data[i].value;
                temp += "<h2>" + complete.label + "[" + complete.id + "]</h2>";
                temp += "<ul>";
                for (var t in complete.value) {
                    console.log(complete.value[t]);
                    temp += "<li>" + complete.value[t] + "</li>";
                }
                temp += "</ul>";
                values.push(value);
                completes.push(complete);
            }
            temp=temp.replace(/\(/g,function(){
                return "(<span style='color:#0078D7;padding:0 5px 0 5px 0;'>";
            }).replace(/\)/g,function(){
                return "</span>)";
            });
            return {
                id:$.global.info.id,
                html: temp,
                values: window.JSON.stringify(values),
                complete: window.JSON.stringify(completes)
            };
        }
    }
});

