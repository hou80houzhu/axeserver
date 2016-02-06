/*!
 * @packet contenter.advance;
 * @require contenter.form;
 * @require contenter.codeBeautiful;
 * @include contenter.editor;
 * @dom contenter.template.editortemplate;
 * @css contenter.style.advance;
 */
Module({
    name: "leftbar",
    extend: "viewgroup",
    className: "leftbar",
    layout: domstr("@editortemplate", "leftbar"),
    option: {
        rbtns: [
//            {name: "重置系统", action: "refreshsystem", icon: "fa fa-refresh"},
//            {name: "导出数据", action: "exports", icon: "fa fa-download"}
        ],
        onebtns: [
            {name: "Pages", action: "setheader", icon: "fa fa-edit"},
            {name: "Modules", action: "setmodule", icon: "fa fa-edit"},
            {name: "Resource", action: "setresource", icon: "fa fa-edit"},
            {name: "Images", action: "setimages", icon: "fa fa-edit"}
        ]
    },
    show: function () {
        this.dom.show();
    },
    hide: function () {
        this.hide();
    },
    bind_btn: function (dom) {
        var num = parseInt(dom.attr("num"));
        var a = this.option.rbtns[num];
        if (a) {
            this.dispatchEvent(a.action, {
                btn: dom,
                info: a
            });
        }
    },
    bind_btnt: function (dom) {
        var num = parseInt(dom.attr("num"));
        var a = this.option.onebtns[num];
        if (a) {
            this.dispatchEvent(a.action, {
                btn: dom,
                info: a
            });
        }
    },
    bind_minall: function () {
        this.childEach(function () {
            this.hide();
            this.parameters.btn.removeClass("hover");
        });
    },
    openWindow: function (btn, option) {
        btn.addClass("hover");
        var has = false;
        this.childEach(function () {
            if (this.parameters.btn.get(0) === btn.get(0)) {
                has = true;
                this.show();
            } else {
                this.hide();
                this.parameters.btn.removeClass("hover");
            }
        });
        if (!has) {
            this.addChild({
                type: "@.window",
                option: option,
                parameters: {
                    btn: btn
                }
            });
        }
    },
    resetSave:function(){
        this.childEach(function(){
            if(this.getChildAt(0).type("@.editpage")){
                this.getChildAt(0).getChildAt(0).refresh();
            }
        });
    },
    event_winmin: function (e) {
        e.target.parameters.btn.removeClass("hover");
        e.target.hide();
    },
    event_winclose: function (e) {
        e.target.parameters.btn.removeClass("hover");
        e.target.close();
    },
    event_exports: function () {
        $().create("a").attr("href", basePath + "contenter/exports").attr("target", "_blank").trigger("click");
    },
    event_exportspage: function () {
        $().create("a").attr("href", basePath + "contenter/exportspage").attr("target", "_blank").trigger("click");
    },
    event_refreshsystem: function (e) {
        var a = e.data.btn.children(0).addClass("fa-spin");
        e.data.btn.html("<i class='fa fa-refresh fa-spin'></i>");
        this.postData({
            url: basePath + "contenter/refresh",
            back: function () {
                e.data.btn.children(0).removeClass("fa-spin");
                this.parentView.getChildByType("@editor.pager", 0).refreshPage();
            }
        });
    },
    event_setheader: function (e) {
        this.openWindow(e.data.btn, {
            title: "edit the page",
            inner: "@.editpage"
        });
    },
    event_setmodule: function (e) {
        this.openWindow(e.data.btn, {
            title: "edit the modules",
            inner: "@.editmodules"
        });
    },
    event_setresource: function (e) {
        this.openWindow(e.data.btn, {
            title: "edit resource",
            inner: "@.editresource"
        });
    },
    event_setimages: function (e) {
        this.openWindow(e.data.btn, {
            title: "edit images",
            inner: "@form.imagesuploader",
            "@form.imagesuploader": {
                url: basePath + "contenter/saveimage",
                editurl: basePath + "contenter/imagepath",
                filename: "image"
            }
        });
    }
});

Module({
    name: "window",
    extend: "viewgroup",
    className: "window",
    layout: domstr("@editortemplate", "window"),
    option: {
        title: "window",
        btns: [
            {action: "winmin", icon: "fa fa-minus", title: "action"},
            {action: "winclose", icon: "fa fa-times", title: "action"}
        ],
        inner: "@.sortlistgroup"
    },
    close: function () {
        this.remove();
    },
    show: function () {
        this.dom.show();
    },
    hide: function () {
        this.dom.hide();
    },
    bind_btn: function (dom) {
        var num = parseInt(dom.attr("num"));
        var a = this.option.btns[num];
        if (a) {
            this.dispatchEvent(a.action, {
                btn: dom,
                info: a
            });
        }
    }
});

Module({
    name: "advancemessagebox",
    className: "advancemessagebox",
    extend: "viewgroup",
    layout: domstr("@editortemplate", "advancemessagebox"),
    option: {
        title: "",
        width: "500px",
        btns: [
            {name: "导出页面", action: "close", icon: "fa fa-cube"}
        ]
    },
    init: function () {
    },
    btn_close: function () {
        this.remove();
    },
    addView: function (type, option, id) {
        return this.addChild({
            type: type,
            option: option || {},
            id: id || this.getUUID(),
            container: this.dom.find(".axcontent")
        });
    },
    close: function () {
        this.remove();
    },
    showMask: function () {
        this.dom.find(".acontent-mask").show();
    },
    hideMask: function () {
        this.dom.find(".acontent-mask").hide();
    },
    event_showMask: function () {
        this.showMask();
    },
    event_hideMask: function () {
        this.hideMask();
    },
    show: function () {
        this.dom.show();
    },
    hide: function () {
        this.dom.hide();
    }
});

Module({
    name: "sortlist",
    extend: "view",
    className: "sortlist",
    option: {
        url: basePath + "contenter/allpagelist"
    },
    template: domstr("@editortemplate", "sortlist"),
    init: function () {
        this.items = [];
        this._toggle = {};
        this.getData();
        this.dataok = false;
    },
    bind_item: function (dom) {
        var num = dom.attr("num").split("-");
        for (var i in this.items) {
            if (this.items[i].get(0) !== dom.get(0)) {
                this.items[i].removeClass("active");
            }
            dom.addClass("active");
        }
        this.dispatchEvent("itemclick", {
            btn: dom,
            data: this.data[num[0]][num[1]]
        });
    },
    bind_toggle: function (dom) {
        if (dom.parent().hasClass("hide")) {
            this._toggle[dom.parent().attr("num")] = true;
            dom.parent().removeClass("hide");
        } else {
            this._toggle[dom.parent().attr("num")] = false;
            dom.parent().addClass("hide");
        }
    },
    bind_toggleall: function (dom) {
        if (dom.hasClass("hide")) {
            dom.removeClass("hide");
            this.openToggle();
        } else {
            dom.addClass("hide");
            this.closeToggle();
        }
    },
    activeItem: function (sort, type, value) {
        var at = this.data[sort], b = 0;
        for (var i in at) {
            if (at[i][type] === value) {
                b = i;
                break;
            }
        }
        for (var i in this.items) {
            if (this.items[i].attr("num") === sort + "-" + b) {
                this.items[i].addClass("active");
            } else {
                this.items[i].removeClass("active");
            }
        }
    },
    unactive: function () {
        for (var i in this.items) {
            this.items[i].removeClass("active");
        }
    },
    find_item: function (dom) {
        this.items.push(dom);
    },
    getData: function () {
        this.dispatchEvent("showloading");
        this.postData({
            url: this.option.url,
            back: function (data) {
                this.data = data;
                this.render(data);
                this.dataok = true;
                this.dispatchEvent("showsuccess");
                this.dispatchEvent("hideloading");
            }
        });
    },
    slientRefresh: function (sort, type, value) {
        this.postData({
            url: this.option.url,
            back: function (data) {
                this.data = data;
                this.render(data);
                this.dispatchEvent("showsuccess");
                this.dispatchEvent("hideloading");
                this.activeItem(sort, type, value);
                this.resetToggle();
            }
        });
    },
    resetToggle: function () {
        var ths = this;
        this.dom.find(".sortlist-header").each(function () {
            if (ths._toggle[$(this).attr("num")] === false) {
                $(this).addClass("hide");
            }
        });
    },
    firstClick: function () {
        if (this.dataok) {
            this.items[0].click();
        } else {
            var ths = this;
            setTimeout(function () {
                ths.firstClick();
            }, 500);
        }
    },
    refresh: function () {
        this.items = [];
        this.getData();
        this.dataok = false;
        this.firstClick();
    },
    search: function (text) {
        for (var i in this.items) {
            if (this.items[i].html().indexOf(text) !== -1) {
                this.items[i].show();
            } else {
                this.items[i].hide();
            }
        }
    },
    openToggle: function () {
        for (var i in this.toggle) {
            this._toggle[i] = true;
        }
        this.dom.find(".sortlist-header").each(function () {
            $(this).removeClass("hide");
        });
    },
    closeToggle: function () {
        for (var i in this.toggle) {
            this._toggle[i] = false;
        }
        this.dom.find(".sortlist-header").each(function () {
            $(this).addClass("hide");
        });
    }
});

Module({
    name: "sortlistgroup",
    extend: "viewgroup",
    className: "sortlistgroup",
    layout: domstr("@editortemplate", "sortlistgroup"),
    option: {
        '@.editortool': {
            title: "&nbsp;",
            "@form.codeditor": {
                type: "ace/mode/html"
            },
            btns: [
                {action: "saveone", icon: "fa fa-check", title: "action"},
                {action: "saveall", icon: "fa fa-times", title: "action"}
            ]
        },
        list: '@.sortlist',
        editor: '@.editortool'
    },
    init: function () {
        this.getFirstChild().firstClick();
    },
    event_itemclick: function (e) {
        var data = e.data.data;
        var title = e.data.btn.html();
        this.parentView.__pageId = data.id;
        this.dispatchEvent("showMask");
        this.postData({
            url: basePath + "contenter/getpageheader",
            data: {pageId: data.id},
            back: function (data) {
                this.dispatchEvent("hideMask");
                this.getLastChild().setTitle(title);
                this.getLastChild().setValue(data);
            }
        });
    }
});

Module({
    name: "sortlistformgroup",
    extend: "viewgroup",
    className: "sortlistformgroup",
    layout: domstr("@editortemplate", "sortlistformgroup"),
    option: {
        list: "@.sortlist",
        form: "@form.listform",
        editor: "@.editortool",
        '@form.listform': {
            fields: [
                {type: "@form.imageupload", label: "icon", name: "icon", url: basePath + "contenter/moduleicon", filename: "moduleicon"},
                {type: "@form.text", label: "version", name: "version", placeholder: "1.0", value: "1.0"},
                {type: "@form.text", label: "type", name: "type", placeholder: "test", required: true},
                {type: "@form.text", label: "desc", name: "desc", placeholder: "A module for test"},
                {type: "@form.text", label: "sort", name: "sort", placeholder: "system", value: "system"},
                {type: "@form.text", label: "view", name: "view", placeholder: "page.base.basepagemodule", value: "page.base.basepagemodule"},
                {type: "@.optionsetter", label: "editSetting", name: "editSetting"},
                {type: "@form.select", label: "singleton", name: "single", defaults: [
                        {key: "false", value: "false"},
                        {key: "true", value: "true"}
                    ]},
                {type: "@form.select", label: "editable", name: "editable", defaults: [
                        {key: "true", value: "true"},
                        {key: "false", value: "false"}
                    ]},
                {type: "@form.select", label: "removeable", name: "removeable", defaults: [
                        {key: "true", value: "true"},
                        {key: "false", value: "false"}
                    ]},
                {type: "@form.extendform", label: "组件配置(一旦修改将重置所有实例)", name: "fields", fields: [
                        {type: "@.optiongetter"}
                    ], override: {
                        asys: function (fn) {
                            var n = [];
                            this.childEach(function () {
                                var tp = this.getFirstChild().getValue();
                                if (!$.is.isEmptyObject(tp)) {
                                    n.push(tp);
                                }
                            });
                            var t = "{}";
                            try {
                                t = window.JSON.stringify(n);
                            } catch (e) {
                            }
                            fn && fn(t);
                        }
                    }}
            ]
        },
        '@.sortlist': {
            url: basePath + "contenter/allmodulelist"
        },
        '@.editortool': {
            title: "&nbsp;",
            "@form.codeditor": {
                type: "ace/mode/html"
            },
            btns: [
                {action: "save", icon: "fa fa-check", title: "action"}
            ]
        }
    },
    init: function () {
//        this.dom.addClass("hide");
        this.getFirstChild().firstClick();
        this.dom.bind("keydown", function (e) {
            if (e.ctrlKey && e.keyCode === 83) {
                console.log("---0000---0000----");
                e.preventDefault();
                e.stopPropagation();
            }
        });
    },
    btn_hide: function () {
        this.dom.toggleClass("hide");
    },
    btn_add: function () {
    },
    btn_refresh: function () {
    },
    bind_search: function (dom) {
        var a = dom.val();
        this.getFirstChild().search(a);
    },
    event_itemclick: function (e) {
        var data = e.data.data;
        var title = e.data.btn.html();
        this.getLastChild().setTitle(title);
        this.getChildAt(1).setValues(data);
        this.getLastChild().setValue(data.template || "");
    },
    showLoading: function () {
        if (this.dom.find(".sortlistformgroup-mask").length === 0) {
            $("<div class='sortlistformgroup-mask'><div class='sortlistformgroup-mask-loading'><i class='fa fa-refresh fa-spin'></i></div></div>").appendTo(this.dom);
        } else {
            this.dom.find(".sortlistformgroup-mask").html("<div class='sortlistformgroup-mask-loading'><i class='fa fa-refresh fa-spin'></i></div>");
        }
    },
    hideLoading: function () {
        var ths = this;
        setTimeout(function () {
            ths.dom.find(".sortlistformgroup-mask").remove();
        }, 1500);
    },
    showError: function () {
        if (this.dom.find(".sortlistformgroup-mask").length === 0) {
            $("<div class='sortlistformgroup-mask'><div class='sortlistformgroup-mask-loading'><i class='fa fa-times'></i></div></div>").appendTo(this.dom);
        } else {
            this.dom.find(".sortlistformgroup-mask").html("<div class='sortlistformgroup-mask-loading'><i class='fa fa-times'></i></div>");
        }
    },
    showSuccess: function () {
        if (this.dom.find(".sortlistformgroup-mask").length === 0) {
            $("<div class='sortlistformgroup-mask'><div class='sortlistformgroup-mask-loading'><i class='fa fa-check'></i></div></div>").appendTo(this.dom);
        } else {
            this.dom.find(".sortlistformgroup-mask").html("<div class='sortlistformgroup-mask-loading'><i class='fa fa-check'></i></div>");
        }
    },
    event_showloading: function () {
        this.showLoading();
    },
    event_hideloading: function () {
        this.hideLoading();
    },
    event_showsuccess: function () {
        this.showSuccess();
    },
    event_showerror: function () {
        this.showError();
    }
});

Module({
    name: "editheader",
    extend: "@.sortlistgroup",
    option: {
        '@form.codeditor': {
            type: "ace/mode/html"
        },
        list: '@.sortlist',
        editor: '@form.codeditor',
        btns: [
            {action: "saveone", icon: "fa fa-check", title: "action"},
            {action: "saveall", icon: "fa fa-times", title: "action"}
        ],
        override_btn_saveall: function () {
            this.postData({
                url: basePath + "contenter/editallpageheader",
                data: {headerstring: this.getFirstChild().getLastChild().getValue().value},
                back: function () {
                    this.close();
                }
            });
        },
        override_btn_saveone: function () {
            this.postData({
                url: basePath + "contenter/editpageheader",
                data: {pageId: this.__pageId, headerstring: this.getFirstChild().getLastChild().getValue().value},
                back: function () {
                    this.close();
                }
            });
        }
    }
});

Module({
    name: "editpage",
    extend: "@.sortlistformgroup",
    option: {
        '@form.listform': {
            fields: [
                {type: "@form.text", label: "id", name: "id", placeholder: "page id", required: true, disabled: true},
                {type: "@form.text", label: "author", name: "author", placeholder: "author", value: "brooder"},
                {type: "@form.select", label: "editable", name: "editable", defaults: [
                        {key: "true", value: "true"},
                        {key: "false", value: "false"}
                    ]},
                {type: "@form.text", label: "keywords", name: "keywords", placeholder: "name,name2", value: "1.0"},
                {type: "@form.text", label: "sort", name: "sort", placeholder: "system", value: "system"},
                {type: "@form.text", label: "title", name: "title", placeholder: "title"},
                {type: "@form.text", label: "desc", name: "desc", placeholder: "desc"},
                {type: "@form.text", label: "content", name: "content", placeholder: "content"},
                {type: "@form.text", label: "pageurl", name: "pageurl", placeholder: "test"}
            ]
        },
        '@.sortlist': {
            url: basePath + "contenter/allpagelist"
        },
        '@.editortool': {
            title: "&nbsp;",
            "@form.codeditor": {
                type: "ace/mode/jsp"
            },
            btns: [
                {action: "saveone", icon: "fa fa-check", title: "action"}
            ]
        }
    },
    init: function () {
        var ths = this;
        this.getFirstChild().firstClick();
        this.dom.bind("keydown", function (e) {
            if (e.ctrlKey && e.keyCode === 83) {
                ths.dispatchEvent("saveone");
                e.preventDefault();
                e.stopPropagation();
            }
        });
    },
    btn_add: function () {
        var ths = this;
        this.getChildAt(0).unactive();
        this.getChildAt(1).empty();
        this.getChildAt(1).getFirstChild().disable(false);
        this.getChildAt(2).setTitle("New Page");
        this.showLoading();
        this.postData({
            url: basePath + "contenter/getbasepage",
            back: function (data) {
                ths.hideLoading();
                data=require("@codeBeautiful").html(data);
                ths.getChildAt(2).setValue(data);
            }
        });
    },
    btn_refresh: function () {
        this.getChildAt(0).refresh();
    },
    btn_download: function () {
        this.getChildAt(1).getValues().done(function (data) {
            $().create("a").attr("href", basePath + "contenter/downloadpage?id=" + data.id).attr("target", "_blank").trigger("click");
        });
    },
    event_itemclick: function (e) {
        var data = e.data.data;
        var title = e.data.btn.html();
        this.getLastChild().setTitle(title);
        this.getChildAt(1).setValues(data);
        this.getChildAt(1).getFirstChild().disable(true);
        this.getLastChild().setValue(require("@codeBeautiful").html(data.template || ""));
    },
    event_saveone: function () {
        var ths = this;
        var temp = this.getChildAt(2).getValue();
        if (this.getChildAt(1).check()) {
            this.getChildAt(1).getValues().done(function (data) {
                data["template"] = temp;
                ths.showLoading();
                ths.postData({
                    url: basePath + "contenter/savepageinfo",
                    data: data,
                    back: function () {
                        ths.getChildAt(0).slientRefresh(data.sort, "id", data.id);
                        ths.dispatchEvent("refresheditpage");
                    }
                });
            });
        }
    }
});

Module({
    name: "editmodules",
    extend: "@.sortlistformgroup",
    option: {
        '@.sortlist': {
            url: basePath + "contenter/allmodulelist"
        },
        '@.editortool': {
            title: "&nbsp;",
            "@form.codeditor": {
                type: "ace/mode/jsp"
            },
            btns: [
                {action: "save", icon: "fa fa-check", title: "action"}
            ]
        }
    },
    init: function () {
        var ths = this;
        this.getFirstChild().firstClick();
        this.dom.bind("keydown", function (e) {
            if (e.ctrlKey && e.keyCode === 83) {
                ths.dispatchEvent("save");
                e.preventDefault();
                e.stopPropagation();
            }
        });
    },
    btn_add: function () {
        this.getChildAt(0).unactive();
        this.getChildAt(1).setValues({
            version: "1.0",
            sort: "system",
            type: "",
            desc: "",
            view: "page.base.basepagemodule",
            option: "",
            fields: "[]"
        });
        this.getChildAt(2).setValue("");
        this.getChildAt(2).setTitle("New Module");
    },
    btn_refresh: function () {
        this.getChildAt(0).refresh();
    },
    btn_download: function () {
        this.getChildAt(1).getValues().done(function (data) {
            $().create("a").attr("href", basePath + "contenter/downloadmodule?type=" + data.type).attr("target", "_blank").trigger("click");
        });
    },
    event_save: function () {
        var ths = this;
        var temp = this.getChildAt(2).getValue();
        if (this.getChildAt(1).check()) {
            this.getChildAt(1).getValues().done(function (data) {
                data["template"] = temp;
                ths.showLoading();
                ths.postData({
                    url: basePath + "contenter/savemoduleinfo",
                    data: data,
                    back: function () {
                        ths.getChildAt(2).setTitle(data.type);
                        ths.getChildAt(0).slientRefresh(data.sort, "type", data.type);
                        ths.dispatchEvent("refresheditpage");
                    }
                });
            });
        }
    }
});

Module({
    name: "editortool",
    extend: "viewgroup",
    className: "editortool",
    layout: domstr("@editortemplate", "editortool"),
    option: {
        editor: "@form.codeditor",
        title: "&nbsp;",
        btns: [
            {action: "save", icon: "fa fa-check", title: "action"}
        ]
    },
    init: function () {
        this.render(this.option);
    },
    bind_btn: function (dom) {
        this.dispatchEvent(dom.attr("action"), {
            btn: dom,
            data: this.option.btns[dom.attr("num")]
        });
    },
    find_title: function (dom) {
        this.title = dom;
    },
    setTitle: function (title) {
        this.title.html(title);
    },
    setValue: function (code) {
        this.getLastChild().setValue(code);
    },
    getValue: function () {
        return this.getLastChild().getValue();
    }
});

Module({
    name: "resourcelist",
    extend: "view",
    className: "resourcelist",
    template: domstr("@editortemplate", "resourcelist"),
    option: {},
    init: function () {
        this.cssitems = [];
        this.jsitems = [];
        this.render(this.option);
        this.getCssPath();
        this.getJsPath();
    },
    find_cssitem: function (dom) {
        this.cssitems.push(dom);
    },
    bind_cssitem: function (dom) {
        for (var i in this.cssitems) {
            if (this.cssitems[i].get(0) === dom.get(0)) {
                this.cssitems[i].addClass("hover");
            } else {
                this.cssitems[i].removeClass("hover");
            }
        }
        this.dispatchEvent("cssitemclick", {
            name: dom.html(),
            path: dom.attr("path")
        });
    },
    find_jsitem: function (dom) {
        this.jsitems.push(dom);
    },
    bind_jsitem: function (dom) {
        for (var i in this.jsitems) {
            if (this.jsitems[i].get(0) === dom.get(0)) {
                this.jsitems[i].addClass("hover");
            } else {
                this.jsitems[i].removeClass("hover");
            }
        }
        this.dispatchEvent("jsitemclick", {
            name: dom.html(),
            path: dom.attr("path")
        });
    },
    bind_image: function (dom) {
        this.dispatchEvent("imageclick");
    },
    find_build: function (dom) {
        this._build = dom;
    },
    bind_build: function () {
        var val = this._build.find("input").val();
        if (val !== "") {
            this._build.find("input").attr("placeholder", "filename");
            if (this._build.attr("type") === "css") {
                this.postData({
                    url: basePath + "contenter/savecss",
                    data: {cssname: val + ".css", csscontent: "/*page.css." + val.css + "*/"},
                    back: function () {
                        this.dispatchEvent("buildok");
                    }
                });
            }
            if (this._build.attr("type") === "js") {
                this.postData({
                    url: basePath + "contenter/savejs",
                    data: {jsname: val + ".js", jscontent: "/*!\r\n *@packet page." + val + ";\r\n */"},
                    back: function () {
                        this.dispatchEvent("buildok");
                    }
                });
            }
        } else {
            this._build.find("input").attr("placeholder", "filename can not empty");
        }
    },
    bind_addcss: function () {
        this._build.attr("type", "css");
        this._build.show();
        this._build.find("input").val("").get(0).focus();
    },
    bind_addjs: function () {
        this._build.attr("type", "js");
        this._build.show();
        this._build.find("input").val("").get(0).focus();
    },
    bind_buildclose: function (dom) {
        dom.parent().removeAttr("type");
        dom.parent().hide();
    },
    event_buildok: function () {
        this.cssitems = [];
        this.jsitems = [];
        this.render(this.option);
        this.getCssPath();
        this.getJsPath();
    },
    getCssPath: function () {
        var ths = this;
        this.postData({
            url: basePath + "contenter/csspath",
            back: function (data) {
                var str = "";
                for (var i in data) {
                    str += "<div class='resourcelist-head-item' path='" + data[i] + "' data-find='cssitem' data-bind='click:cssitem'>" + i + "</div>";
                }
                ths.dom.find(".resourcelist-head-css").html(str);
                ths.delegateAll();
                ths.cssitems[0].click();
            }
        });
    },
    getJsPath: function () {
        var ths = this;
        this.postData({
            url: basePath + "contenter/jspath",
            back: function (data) {
                var str = "";
                for (var i in data) {
                    str += "<div class='resourcelist-head-item' path='" + data[i] + "' data-find='jsitem' data-bind='click:jsitem'>" + i + "</div>";
                }
                ths.dom.find(".resourcelist-head-js").html(str);
                ths.delegateAll();
            }
        });
    }
});

Module({
    name: "editresource",
    extend: "viewgroup",
    className: "editresource",
    layout: domstr("@editortemplate", "editresource"),
    option: {
        list: '@.resourcelist'
    },
    event_cssitemclick: function (e) {
        var ths = this;
        if (this.children.length > 1) {
            this.getLastChild().remove();
        }
        this.addChild({
            type: "@.editortool",
            option: {
                title: e.data.name,
                "@form.codeditor": {
                    type: "ace/mode/css"
                },
                override_onendinit: function () {
                    var ths = this;
                    this.dom.bind("keydown", function (e) {
                        if (e.ctrlKey && e.keyCode === 83) {
                            ths.dispatchEvent("save");
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                },
                override_event_save: function () {
                    ths.showLoading();
                    this.postData({
                        url: basePath + "contenter/savecss",
                        data: {
                            cssname: this.parameters,
                            csscontent: this.getLastChild().getValue()
                        },
                        back: function () {
                            ths.showSuccess();
                            ths.hideLoading();
                            console.log("====css saveed=====");
                        }
                    });
                }
            },
            container: this.dom.find(".editresource-right"),
            parameters: e.data.name
        }).done(function () {
            var ths = this;
            $.ajax({
                url: basePath + e.data.path,
                dataType: "text",
                success: function (text) {
                    ths.getLastChild().getLastChild().setValue(text);
                }
            });
        });
    },
    event_jsitemclick: function (e) {
        var ths = this;
        if (this.children.length > 1) {
            this.getLastChild().remove();
        }
        this.addChild({
            type: "@.editortool",
            option: {
                title: e.data.name,
                "@form.codeditor": {
                    type: "ace/mode/javascript"
                },
                override_onendinit: function () {
                    var ths = this;
                    this.dom.bind("keydown", function (e) {
                        if (e.ctrlKey && e.keyCode === 83) {
                            ths.dispatchEvent("save");
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                },
                override_event_save: function () {
                    ths.showLoading();
                    this.postData({
                        url: basePath + "contenter/savejs",
                        data: {
                            jsname: this.parameters,
                            jscontent: this.getLastChild().getValue()
                        },
                        back: function () {
                            ths.showSuccess();
                            ths.hideLoading();
                            console.log("====js saveed=====");
                        }
                    });
                }
            },
            container: this.dom.find(".editresource-right"),
            parameters: e.data.name
        }).done(function () {
            var ths = this;
            $.ajax({
                url: basePath + e.data.path,
                dataType: "text",
                success: function (text) {
                    ths.getLastChild().getLastChild().setValue(text);
                }
            });
        });
    },
    event_imageclick: function () {
        if (this.children.length > 1) {
            this.getLastChild().remove();
        }
        this.addChild({
            type: "@form.imagesuploader",
            option: {
                url: basePath + "contenter/saveimage",
                editurl: basePath + "contenter/imagepath",
                filename: "image"
            },
            container: this.dom.find(".editresource-right")
        }).done(function () {
        });
    },
    showLoading: function () {
        if (this.dom.find(".editresource-mask").length === 0) {
            $("<div class='editresource-mask'><div class='editresource-mask-loading'><i class='fa fa-refresh fa-spin'></i></div></div>").appendTo(this.dom);
        } else {
            this.dom.find(".editresource-mask").html("<div class='editresource-mask-loading'><i class='fa fa-refresh fa-spin'></i></div>");
        }
    },
    hideLoading: function () {
        var ths = this;
        setTimeout(function () {
            ths.dom.find(".editresource-mask").remove();
        }, 1500);
    },
    showError: function () {
        if (this.dom.find(".editresource-mask").length === 0) {
            $("<div class='editresource-mask'><div class='editresource-mask-loading'><i class='fa fa-times'></i></div></div>").appendTo(this.dom);
        } else {
            this.dom.find(".editresource-mask").html("<div class='editresource-mask-loading'><i class='fa fa-times'></i></div>");
        }
    },
    showSuccess: function () {
        if (this.dom.find(".editresource-mask").length === 0) {
            $("<div class='editresource-mask'><div class='editresource-mask-loading'><i class='fa fa-check'></i></div></div>").appendTo(this.dom);
        } else {
            this.dom.find(".editresource-mask").html("<div class='editresource-mask-loading'><i class='fa fa-check'></i></div>");
        }
    }
});

Module({
    name: "optiongetter",
    extend: "@form.fieldgroup",
    className: "optiongetter",
    option: {
    },
    layout: domstr("@editortemplate", "optiongetter"),
    init: function () {
        this.value = null;
        this.dom.find(".optiongetter-btn").html(this.parentView.parameters ? this.parentView.parameters.name : "null");
    },
    bind_btn: function () {
        var ths = this;
        var mask = $($.template(domstr("@editortemplate", "optiongettermask")).render(this.option)).appendTo("body");
        mask.find(".optiongetter-mes-tools-btn").click(function () {
            try {
                ths.value = window.JSON.parse(ths.getFirstChild().getValue());
            } catch (e) {
                ths.value = {};
            }
            ths.dom.find(".optiongetter-btn").html(ths.value.name || "error");
            mask.remove();
        });
        this.addChild({
            type: "@form.codeditor",
            option: {
                type: "ace/mode/json"
            },
            container: mask.find(".optiongetter-mes-con")
        }).done(function () {
            var str = "", strr = {type: "", name: "", label: "",value:""};
            try {
                if (this.value === null && this.parentView.parameters) {
                    str = window.JSON.stringify(this.parentView.parameters, null, 4);
                } else {
                    if (this.value === null) {
                        str = window.JSON.stringify(strr, null, 4);
                    } else {
                        str = window.JSON.stringify(this.value, null, 4);
                    }
                }
            } catch (e) {
            }
            this.getLastChild().setValue(str);
        });
        this.mask = mask;
    },
    getValue: function () {
        return $.is.isEmptyObject(this.value) ? this.parentView.parameters : this.value;
    }
});

Module({
    name: "optionsetter",
    extend: "@.optiongetter",
    className: "optiongetter",
    option: {
    },
    layout: domstr("@editortemplate", "optiongetter"),
    init: function () {
        this.dom.find(".optiongetter-btn").html(this.option.label);
    },
    bind_btn: function () {
        var ths = this;
        var mask = $($.template(domstr("@editortemplate", "optiongettermask")).render(this.option)).appendTo("body");
        mask.find(".optiongetter-mes-tools-btn").click(function () {
            try {
                ths.value = window.JSON.parse(ths.getFirstChild().getValue());
            } catch (e) {
                ths.value = {};
            }
            mask.remove();
        });
        this.addChild({
            type: "@form.codeditor",
            option: {
                type: "ace/mode/json"
            },
            container: mask.find(".optiongetter-mes-con")
        }).done(function () {
            var str = "", strr = {width: 600};
            try {
                if (this.value === null) {
                    str = window.JSON.stringify(strr, null, 4);
                } else {
                    str = window.JSON.stringify(this.value, null, 4);
                }
            } catch (e) {
            }
            this.getLastChild().setValue(str);
        });
        this.mask = mask;
    },
    setValue: function (str) {
        try {
            this.value = window.JSON.parse(str);
        } catch (e) {
            this.value = {};
        }
    },
    getValue: function () {
        try {
            return window.JSON.stringify(this.value);
        } catch (e) {
            return '{"width":600}';
        }
    }
});