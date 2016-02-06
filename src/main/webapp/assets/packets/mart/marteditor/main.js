/*!
 * @packet mart.marteditor.main; 
 * @require mart.form;
 * @include mart.marteditor.inject;
 * @template mart.marteditor.template.main;
 * @css mart.marteditor.style.main:pp;
 * @css mart.marteditor.style.font-awesome-min;
 * @js mart.marteditor.lib.underscore-min;
 * @json mart.marteditor.manifest;
 * @json mart.pagemapping;
 */
var toSource = function (value) {
    function show(value) {
        if (_.isUndefined(value)) {
            value = "undefined";
        } else if (_.isFunction(value)) {
            value = "" + value;
            var indentMatches = value.match(/^ +/mg);
            if (!_.isEmpty(indentMatches)) {
                var indentSize = Math.min.apply(null, _.map(indentMatches, function (x) {
                    return x.length;
                }));
                value = value.replace(new RegExp("^ {" + indentSize + "}", "mg"), "");
            }
        } else if (_.isString(value)) {
            value = '"' + value + '"';
        } else if (_.isArray(value)) {
            value = _.isEmpty(value) ? "[]" : "[\n" + _.map(value, show).join(",\n").replace(/^/mg, "  ") + "\n]";
        } else if (_.isObject(value)) {
            value = _.isEmpty(value) ? "{}" : "{\n" + _.map(value, function (value, key) {
                return key + ": " + show(value);
            }).join(",\n").replace(/^/mg, "  ") + "\n}";
        }
        return value;
    }
    return show(value);
};
Module({
    name: "main",
    className: "main",
    extend: "viewgroup",
    layout: module.getTemplate("@main", "main"),
    option: {
        url: basePath + "index"
    },
    init: function () {
        var ths = this;
        this.pagemapping=module.getJson("@pagemapping").data;
        this.modulemapping=module.getJson("@manifest").data;
        this.child = this.dom.find("iframe").get(0).contentWindow;
        this.dom.find("iframe").bind("load", function () {
            ths.initPageEidtor();
        });
    },
    find_mask: function (dom) {
        this.mask = dom;
    },
    find_form: function (dom) {
        this.form = dom;
    },
    find_code: function (code) {
        var ths = this;
        this.code = code;
        this.addChild({
            type: "@form.codeditor",
            container: code
        }).done(function (a) {
            ths.coder = a;
        });
    },
    find_box: function (dom) {
        this.box = dom;
    },
    find_boxcontent: function (dom) {
        this.boxcontent = dom;
    },
    find_modulename: function (dom) {
        this.modulename = dom;
    },
    find_masktitle: function (dom) {
        this.masktitle = dom;
    },
    find_pagecode: function (dom) {
        var ths = this;
        this.pagecode = dom;
        this.addChild({
            type: "@form.codeditor",
            container: dom
        }).done(function (code) {
            ths.pageCoder = code;
        });
    },
    find_addbox:function(dom){
        this.addbox=dom;
    },
    bind_savemodule: function () {
        var ths = this;
        var c = this.getChildByType("@form.codeditor", 0).getValue();
        var override = new Function(c)();
        this.getChildByType("@form.simpleform", 0).getValues().done(function (data) {
            data["override"] = override;
            console.log(data);
            ths.child.brooder("body").getModule().getChildByType("@inject.injector", 0).dispatchEvent("editmodule", data);
        });
    },
    bind_open: function () {
        var data=this.pagemapping;
        this.boxcontent.html("<div class='pagelist'>" + $.template(module.getTemplate("@main", "pagelist")).render(data) + "</div>");
        this.box.transform().y(0);
        this.delegateEvent("opennewpage");
    },
    bind_plus: function () {
        var data = this.modulemapping;
        this.boxcontent.html("<div class='modulelist'>" + $.template(module.getTemplate("@main", "modulelist")).render(data) + "</div>");
        this.box.transform().y(0);
        this.delegateEvent("addmodule");
    },
    bind_toggle: function () {
        this.dom.toggleClass("close");
    },
    bind_closebox: function () {
        this.box.transform().y("100%");
        this.boxcontent.empty();
    },
    bind_opennewpage: function (dom) {
        this.child.brooder("body").getModule().dispatchEvent("openPage", {
            url: dom.attr("href")
        });
        this.box.transform().y("100%");
        this.boxcontent.empty();
    },
    bind_addmodule: function (dom) {
        this.child.brooder("body").getModule().getChildByType("@inject.injector", 0).dispatchEvent("addmodule", dom.attr("module"));
        this.box.transform().y("100%");
        this.boxcontent.empty();
    },
    bind_code: function () {
        this.dom.addClass("showcode");
        this.child.brooder("body").getModule().getChildByType("@inject.injector", 0).dispatchEvent("pageCode");
    },
    bind_codesave: function () {
        var code = this.pageCoder.getValue();
        var fn = new Function(code)();
        this.child.brooder("body").getModule().getChildByType("@inject.injector").dispatchEvent("editpagecode", fn);
    },
    bind_codeclose: function () {
        this.dom.toggleClass("showcode");
    },
    bind_savepagecode: function () {
        var code = this.pageCoder.getValue();
        var fn = new Function(code)();
        this.child.brooder("body").getModule().getChildByType("@inject.injector").dispatchEvent("editpagecode", fn);
    },
    bind_refresh: function () {
        this.child.brooder("body").getModule().getChildByType("@inject.injector").dispatchEvent("refresh");
    },
    bind_openaddbox:function(){
        this.addChild({
            type:"@form.listform",
            option:{
                fields:[
                    {type:"@form.text",name:"name",label:"name",required:true}
                ]
            },
            container:this.addbox.children(1)
        });
        this.addbox.transition().set("-all-transform").scope().transform().x("0");
    },
    bind_addboxclose:function(){
        this.addbox.transition().set("-all-transform").done(function(){
            this.children(1).empty();
        }).scope().transform().x("100%");
    },
    bind_addboxok:function(){
        var ths=this;
        if(this.getLastChild().check()){
            this.getLastChild().getValues().done(function(data){
                var a="op"+new Date().getTime()+"";
                data["packetName"]="mart.option.custom."+a+".page";
                data["type"]=a;
                ths.pagemapping.push({
                    name:data.name,
                    option:"mart.option.custom."+a+".page",
                    url:a
                });
                ths.child.brooder("body").getModule().getChildByType("@inject.injector").dispatchEvent("createpage",data);
                ths.bind_addboxclose();
            });
        }
    },
    initPageEidtor: function () {
        var ths = this;
        setTimeout(function () {
            if (ths.child.brooder("body").getModule()) {
                ths.child.brooder("body").getModule()["event_pageready"] = function (e) {
                    this.getChildByType("@inject.injector").ready(e.target);
                };
                ths.child.brooder("body").getModule().addChild({
                    type: "@inject.injector"
                });
                ths.dispatchEvent("ready");
            } else {
                ths.initPageEidtor();
            }
        }, 100);
    },
    event_ready: function () {
        this.mask.remove();
    },
    event_moduleclick: function (e) {
        this.modulename.html(e.data.type);
        this.masktitle.html(e.data.type);
        var op = this.modulemapping[e.data.type];
        if (op) {
            this.dom.addClass("showcode");
            this.dom.addClass("closemask");
            this.form.empty();
            this.addChild({
                type: "@form.simpleform",
                option: {
                    fields: op.mapping
                },
                container: this.form,
                parameters: e.data.values
            });
            this.getChildByType("@form.codeditor", 0).setValue("return " + (e.data.values.override?toSource(e.data.values.override):"{}") + ";");
        } else {
            this.dom.removeClass("showcode");
            this.dom.removeClass("closemask");
        }
    },
    event_pageCoding: function (e) {
        this.pageCoder.setValue("return " + toSource(e.data) + ";");
        this.dom.removeClass("showcode");
        this.dom.removeClass("closemask");
        this.modulename.html("");
        this.masktitle.html("");
    },
    event_contentok:function(e){
        var data=null;
        console.log(e.data.packetName);
        for(var i in this.pagemapping){
            if(this.pagemapping[i].option===e.data.packetName+".page"){
                data=this.pagemapping[i];
                break;
            }
        }
        this.postData({
            url: basePath + "marteditor/savepacket",
            data: $.extend({
                packetName: e.data.packetName,
                packetContent: e.data.code
            },data),
            back:function(){
                this.child.brooder("body").getModule().getChildByType("@inject.injector").dispatchEvent("editpageoption",{
                    type:data.url,
                    option:data.option
                });
                console.log("-------ok--------");
            }
        });
    }
});