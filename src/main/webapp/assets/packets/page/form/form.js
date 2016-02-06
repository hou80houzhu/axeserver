/*!
 * @packet page.form.form;
 * @require page.form.base; 
 */
Module({
    name:"staticform",
    extend:"@base.baseform",
    init:function(){
        this.delegateAll();
    },
    bind_submit:function(){
        this.submit().done(function(){
            console.log("========uploaded=======");
        });
    }
});
Module({
    name: "simpleform",
    extend: "@base.baseform",
    option: {
        colnum: 3,
        btns: [{type: "submit", name: "submit"}, {type: "reset", name: "reset"}]
    },
    layout: "<div class='con'><div class='row'>" +
            "<%for(var i in data.option.fields){%>" +
            "<div class='span1-<%=data.option.colnum;%>'>" +
            "<div view-<%=data.id;%>='<%=data.option.fields[i]._type;%>' viewid='k<%=i;%>'></div>" +
            "</div>" +
            "<%}%>" +
            "</div></div>",
    init: function () {
        this.dom.addClass("horizion");
    },
    event_simpleformreset: function (e) {
        this.reset();
        e.stop();
    }
});
Module({
    name: "listform",
    extend: "@base.baseform",
    layout: "<%for(var i in data.option.fields){%>" +
            "<div><%=module(data.option.fields[i].type,'','t'+i);%></div>" +
            "<%}%>",
    init: function () {
        this.setValues(this.parameters);
    }
});
Module({
    name: "singleform",
    extend: "@base.baseform",
    option: {
        btns: [{type: "submit", name: "submit"}, {type: "reset", name: "reset"}]
    },
    layout: "<div style='position:absolute;left:0;top:0;right:0;bottom:50px;overflow:auto;padding:10px;'>" +
            "<%for(var i in data.option.fields){%>" +
            "<div view-<%=data.id;%>='<%=data.option.fields[i]._type;%>' viewid='m<%=i;%>'></div>" +
            "<%}%>" +
            "</div>" +
            "<div style='position:absolute;left:0;right:0;bottom:0;padding:10px 10px 0 10px;border-top:1px solid #D7D7D7;'>" +
            "<div class='btn-group'>" +
            "<%for(var i in data.option.btns){%>" +
            "<div class='btn' type='<%=data.option.btns[i].type;%>'><%=data.option.btns[i].name;%></div>" +
            "<%}%>" +
            "</div>" +
            "</div>",
    init: function () {
//        this.super("init");
        this.setValues(this.parameters);
        var ths = this;
        this.dom.find(".btn").each(function () {
            $(this).click(function () {
                var type = $(this).attr("type");
                ths.dispatchEvent("singleform_" + type, ths.getValues());
            });
        });
    },
    event_singleform_submit: function (e) {
        if (this.check()) {
            this.submit();
        }
        e.stop();
    },
    event_singleform_reset: function (e) {
        this.reset();
        e.stop();
    }
});
Module({
    name: "gridform",
    extend: "@base.baseform",
    option: {
        cols: 6
    },
    layout: "<div class='row'>" +
            "<%for(var i in data.option.fields){%>" +
            "<div class='span<%=data.option.fields[i].col;%>-<%=data.option.cols;%>'>" +
            "<div view-<%=data.id;%>='<%=data.option.fields[i]._type;%>' viewid='m<%=i;%>'></div>" +
            "</div>" +
            "<%}%>",
    init: function () {
//        this.super("init");
        this.setValues(this.parameters);
    }
});
Module({
    name: "freeform",
    extend: "@base.baseform",
    option: {
        btns: []
    },
    layout: "<%for(var i in data.option.fields){%>" +
            "<div view-<%=data.id;%>='<%=data.option.fields[i]._type;%>' viewid='<%=i;%>'></div>" +
            "<%}%>",
    init: function () {
//        this.super("init");
        this.setValues(this.parameters);
        this.dom.find(".btn").each(function () {
            $(this).click(function () {
                var type = $(this).attr("type");
                ths.dispatchEvent("freeform_" + type, ths.getValues());
            });
        });
    },
    onbeforeinit: function (a) {
        console.log(a);
    },
    onsetlayout: function (layout) {
        if (this.option.btns.length > 0) {
            var t = "<div style='position:absolute;left:0;top:0;right:0;bottom:50px;overflow:auto;padding:10px;'>" +
                    layout +
                    "</div>" +
                    "<div style='position:absolute;left:0;right:0;bottom:0;padding:10px 10px 0 10px;border-top:1px solid #D7D7D7;'>" +
                    "<div class='btn-group'>" +
                    "<%for(var i in data.option.btns){%>" +
                    "<div class='btn' type='<%=data.option.btns[i].type;%>'><%=data.option.btns[i].name;%></div>" +
                    "<%}%>" +
                    "</div>" +
                    "</div>";
            return t;
        } else {
            return layout;
        }
    },
    ondomready: function (a) {
        console.log(a);
        var id = this.getId();
        var ths = this;
        this.dom.find("div[viewid]").each(function () {
            var num = $(this).attr("viewid");
            var data = ths.option.fields[num];
            $(this).attr("view-" + id, data._type);
        });
    },
    onoption: function (option, view, viewid) {
        return this.option.fields[viewid];
    },
    event_freeform_submit: function (e) {
        if (this.check()) {
            this.submit();
        }
        e.stop();
    },
    event_freeform_reset: function (e) {
        this.reset();
        e.stop();
    }
});