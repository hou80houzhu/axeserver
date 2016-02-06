/*!
 * @packet contenter.editor;
 * @include contenter.form;
 * @require contenter.plugins;
 * @dom contenter.template.editortemplate; 
 * @css contenter.style.font-awesome-min;
 */
Module({
    name: "header",
    extend: "view",
    className: "header",
    template: domstr("@editortemplate", "header"),
    option: {
        rbtns: [
            {name: "打开", action: "pagelist", icon: "fa fa-folder"},
            {name: "设置", action: "pagesetting", icon: "fa fa-cogs"},
            {name: "保存", action: "savepage", icon: "fa fa-save"},
            {name: "预览", action: "eye", icon: "fa fa-eye"},
            {name: "刷新", action: "refresh", icon: "fa fa-refresh"}
        ]
    },
    init: function () {
        this.render(this.option);
        this.dom.transform().y("-100%");
    },
    setTitle: function (title) {
        this.dom.find(".ctitle").html(title);
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
    event_refresh: function (e) {
        this.parentView.getChildByType("@.pager", 0).refreshPage();
    },
    event_refreshsystem: function (e) {
        var a = e.data.btn.children(0).addClass("fa-spin");
        e.data.btn.html("<i class='fa fa-refresh fa-spin'></i>");
        this.postData({
            url: basePath + "contenter/refresh",
            back: function () {
                e.data.btn.children(0).removeClass("fa-spin");
                this.parentView.getChildByType("@.pager", 0).refreshPage();
            }
        });
    },
    event_savepage: function (e) {
        e.data.btn.html("<i class='fa fa-refresh fs-spin'></i>");
        this.dispatchEvent("getpageinfo");
    },
    event_pagelist: function (e) {
        this.parentView.getChildrenByType("@.boxcontainer")[0].dispatchEvent("showPageList");
    },
    event_eye: function (e) {
        this.dispatchEvent("review");
    },
    event_pagesetting: function (e) {
        this.dispatchEvent("editpageinfo");
    },
    event_exports: function () {
        $().create("a").attr("href", basePath + "contenter/exports").attr("target", "_blank").trigger("click");
    },
    event_exportspage: function () {
        $().create("a").attr("href", basePath + "contenter/exportspage").attr("target", "_blank").trigger("click");
    },
    hide: function () {
        this.dom.transition().set("-all-transform").scope().transform().y("-100%");
    },
    show: function () {
        this.dom.transition().set("-all-transform").scope().transform().y(0);
    },
    resetSave: function () {
        this.dom.find("div[action='savepage']").html("<i class='fa fa-save'></i>");
    },
    btn_asphone: function (dom) {
        dom.parent().children().each(function () {
            $(this).removeClass("hover");
        });
        dom.addClass("hover");
        this.parentView.dispatchChildEvent({type: "showPage"});
        this.parentView.getChildByType("@.pager", 0).asphone();
        this.parentView.getChildByType("@.boxcontainer", 0).hideAll();
        this.dispatchEvent("cleanFocus");
    },
    btn_aspad: function (dom) {
        dom.parent().children().each(function () {
            $(this).removeClass("hover");
        });
        dom.addClass("hover");
        this.parentView.dispatchChildEvent({type: "showPage"});
        this.parentView.getChildByType("@.pager", 0).aspad();
        this.parentView.getChildByType("@.boxcontainer", 0).hideAll();
        this.dispatchEvent("cleanFocus");
    },
    btn_asdesk: function (dom) {
        dom.parent().children().each(function () {
            $(this).removeClass("hover");
        });
        dom.addClass("hover");
        this.parentView.dispatchChildEvent({type: "showPage"});
        this.parentView.getChildByType("@.pager", 0).asdesk();
        this.parentView.getChildByType("@.boxcontainer", 0).hideAll();
        this.dispatchEvent("cleanFocus");
    },
    btn_asedit: function (dom) {
        dom.parent().children().each(function () {
            $(this).removeClass("hover");
        });
        dom.addClass("hover");
        this.parentView.dispatchChildEvent({type: "endShowPage"});
        this.parentView.getChildByType("@.pager", 0).asdesk();
    },
    asedit: function () {
        this.dom.find(".cbtn").each(function () {
            $(this).removeClass("hover");
        });
        this.dom.find(".cbtn").last().addClass("hover");
//        this.parentView.dispatchChildEvent({type: "endShowPage"});
        this.parentView.getChildByType("@.pager", 0).asdesk();
    }
});
Module({
    name: "pager",
    extend: "view",
    className: "pager",
    option: {
        infoAction: basePath + "contenter/pagelist"
    },
    template: "<div class='pagelistcon'>" +
            "<div class='pagelistitle'>选择一个用于编辑的页面</div>" +
            "</div>",
    init: function () {
        this.datais = {};
        this.render(this.option);
        this.showPageList();
    },
    showPageList: function () {
        var ths = this;
        this.postData({
            url: ths.option.infoAction,
            back: function (data) {
                for (var i in data) {
                    for (var t in data[i]) {
                        ths.datais[data[i][t].id] = data[i][t];
                    }
                }
                $($.template(domstr("@editortemplate", "pagelistcontentinit")).render(data)).appendTo(ths.dom.find(".pagelistcon")).tab({
                    titleClass: "listname"
                });
                ths.delegateEvent();
            }
        });
    },
    initPageEidtor: function (fn) {
        var ths = this;
        setTimeout(function () {
            if (ths.child.brooder("body").getModule()) {
                ths.child.brooder.loader().css(basePath + "assets/packets/contenter/style/inject.css", function () {
                    ths.child.brooder("body").getModule().addChild({
                        type: "@.editorlite"
                    });
                    fn && fn();
                });
            } else {
                ths.initPageEidtor(fn);
            }
        }, 500);
    },
    bind_open: function () {
        this.parentView.getChildrenByType("@.boxcontainer")[0].dispatchEvent("showPageList");
    },
    openPage: function (data) {
        var ths = this;
        this.datais = data;
        this.dom.html("<div class='mask'><div class='loading'><i class='fa fa-refresh fa-spin'></i></div></div><iframe src='" + basePath + "contenter/render?pagename=" + data.id + "'></iframe>");
        this.dom.find("iframe").bind("load", function () {
            window.editor_pagename = data.id;
            window.parent.current_edit_pageId = data.id;
            ths.child = $(this).get(0).contentWindow;
            ths.child.editor_pagename = data.id;
            ths.initPageEidtor(function () {
                ths.dom.find(".mask").remove();
            });
        }).get(0).contentWindow.ISEDIT=true;
    },
    refreshPage: function () {
        this.parentView.getChildByType("@.boxcontainer", 0).reset();
        this.openPage(this.datais);
    },
    review: function () {
        $().create("a").attr("href", basePath + "contenter/render?pagename=" + this.datais.id).attr("target", "_blank").trigger("click");
    },
    showLoading: function () {
        this.dom.find(".content").append("<div class='xloading'><div class='con'><i class='fa fa-refresh fa-spin'></i></div></div>");
    },
    hideLoading: function () {
        this.dom.find(".xloading").remove();
    },
    bind_rowclick: function (dom) {
        this.dom.find(".modulerow").each(function () {
            $(this).removeClass("hover");
        });
        dom.toggleClass("hover");
        var id = this.dom.find(".modulerow.hover").attr("pageid");
        this.dispatchEvent("gotopage", this.datais[id]);
    },
    asphone: function () {
        this.dom.addClass("phone").removeClass("pad");
    },
    aspad: function () {
        this.dom.addClass("pad").removeClass("phone");
    },
    asdesk: function () {
        this.dom.removeClass("phone").removeClass("pad");
    },
    show: function () {
        this.dom.css("top", "35px");
    },
    showBottom:function(){
        this.dom.css("bottom","35px");
    }
});
Module({
    name: "boxcontainer",
    extend: "viewgroup",
    className: "boxcontainer",
    layout: "<div class='mask' data-bind='click:mask'></div>",
    init: function () {
    },
    bind_mask: function () {
        this.dom.removeClass("hover");
        this.hideAll();
        this.dispatchEvent("cleanFocus");
    },
    event_showModuleInfo: function (e) {
        if (!this.getChildByType("@.modulebox", 0)) {
            this.hideAll();
            this.dom.addClass("hover");
            this.addChild({
                type: "@.modulebox",
                container: this.dom,
                parameters: e.data
            });
        }
        e.stopPropagation();
    },
    event_hideModuleInfo: function (e) {
        var a = this.getChildrenByType("@.modulebox");
        for (var i = 0; i < a.length; i++) {
            a[i].hide();
        }
        e.stopPropagation();
    },
    event_showModuleList: function (e) {
        if (!this.getChildByType("@.modulelist", 0)) {
            this.hideAll();
            this.dom.addClass("hover");
            this.addChild({
                type: "@.modulelist",
                container: this.dom,
                parameters: e.data
            });
        }
        e.stopPropagation();
    },
    event_hideModuleList: function (e) {
        var a = this.getChildrenByType("@.modulelist");
        for (var i = 0; i < a.length; i++) {
            a[i].hide();
        }
        e.stopPropagation();
    },
    event_addgloballayout: function (e) {
        if (!this.getChildByType("@.globallayoutmapping", 0)) {
            this.hideAll();
            this.dom.addClass("hover");
            this.addChild({
                type: "@.globallayoutmapping",
                container: this.dom,
                parameters: e.data
            });
        }
        e.stopPropagation();
    },
    event_hidegloballayout: function (e) {
    },
    event_showPageList: function (e) {
        if (!this.getChildByType("@.pagelist", 0)) {
            this.hideAll();
            this.dom.addClass("hover");
            this.addChild({
                type: "@.pagelist",
                container: this.dom,
                parameters: e.data
            });
        }
        e.stopPropagation();
    },
    event_hidePageList: function (e) {
    },
    event_showLayout: function (e) {
        if (!this.getChildByType("@.layoutmapping", 0)) {
            this.hideAll();
            this.dom.addClass("hover");
            this.addChild({
                type: "@.layoutmapping",
                container: this.dom,
                parameters: e.data
            });
        }
        e.stopPropagation();
    },
    event_hideLayout: function (e) {
    },
    event_layoutsetting: function (e) {
        if (!this.getChildByType("@.layoutsetting", 0)) {
            this.hideAll();
            this.dom.addClass("hover");
            this.addChild({
                type: "@.layoutsetting",
                container: this.dom,
                parameters: e.data
            });
        }
        e.stopPropagation();
    },
    hideAll: function () {
        this.childEach(function () {
            this.hide();
        });
    },
    hideMask: function () {
        this.dom.removeClass("hover");
    },
    reset: function () {
        this.hideAll();
        this.hideMask();
    }
});
Module({
    name: "modulebox",
    extend: "viewgroup",
    className: "modulebox",
    layout: domstr("@editortemplate", "box"),
    option: {
        title: "组件配置",
        editAction: basePath + "contenter/editmoduleinfo",
        infoAction: basePath + "contenter/moduleinfo",
        btns: [{name: "save", action: "save", icon: "fa fa-check"},
            {name: "close", action: "close", icon: "fa fa-long-arrow-right"}]
    },
    init: function () {
        this.show();
    },
    bind_btn: function (dom) {
        var a = this.option.btns[parseInt(dom.attr("num"))];
        if (a) {
            this.dispatchEvent(a.action, {
                btn: dom,
                info: a
            });
        }
    },
    show: function () {
        var ths = this;
        this.showLoading();
        this.postData({
            url: this.option.infoAction,
            data: {
                moduleId: this.parameters.moduleId,
                moduleType: this.parameters.moduleType,
                values: this.parameters.isedit ? this.parameters.values : null
            },
            back: function (dta) {
                ths.hideLoading();
                var setting = dta.editSetting ? window.JSON.parse(dta.editSetting) : {width: 350};
                ths.dom.width(setting.width);
                var d = $.template(domstr("@editortemplate", "module")).render(dta);
                $(d).appendTo(this.dom.find(".content")).tab();
                if (dta.editable) {
                    var t = {};
                    if (ths.parameters.isedit) {
                        t = ths.parameters.values;
                    } else {
                        try {
                            t = window.JSON.parse(dta.values);
                        } catch (e) {
                        }
                    }
                    ths.addChild({
                        type: "@form.listform",
                        option: {
                            action: "",
                            fields: window.JSON.parse(dta.fields)
                        },
                        parameters: t,
                        container: ths.dom.find(".module-tab .content").eq(0)
                    });
                } else {
                    ths.dom.find(".module-tab .content").eq(0).html("<div class='noedit'>没有可编辑属性</div>");
                }
            }
        });
        this.dom.transition().set("-all-transform").scope().transform().x(0);
    },
    showLoading: function () {
        this.dom.find(".content").append("<div class='xloading'><div class='con'><i class='fa fa-refresh fa-spin'></i></div></div>");
    },
    hideLoading: function () {
        this.dom.find(".xloading").remove();
    },
    hide: function () {
        this.dispatchEvent("hidemask");
        this.dom.transition().set("-all-transform").always(function () {
            this.scope().remove();
        }).scope().transform().x("100%");
    },
    event_close: function (e) {
        this.hide();
        this.dispatchEvent("cleanFocus");
        e.stopPropagation();
    },
    event_save: function (e) {
        var ths = this;
        this.hide();
        this.getFirstChild().getValues().done(function (values) {
            ths.dispatchEvent("callpage", {
                type: "updatemodule",
                data: {
                    moduleId: ths.parameters.moduleId,
                    values: values
                }
            });
        });
        this.dispatchEvent("cleanFocus");
        e.stopPropagation();
    }
});
Module({
    name: "modulelist",
    extend: "view",
    className: "modulelist",
    template: domstr("@editortemplate", "modulelist"),
    option: {
        title: "组件列表",
        editAction: basePath + "contenter/editmoduleinfo",
        infoAction: basePath + "contenter/modulelist",
        addAction: basePath + "contenter/newmodule",
        btns: [{name: "close", action: "close", icon: "fa fa-long-arrow-right"}]
    },
    init: function () {
        this.render(this.option);
        this.show();
    },
    bind_btn: function (dom) {
        var a = this.option.btns[parseInt(dom.attr("num"))];
        if (a) {
            this.dispatchEvent(a.action, {
                btn: dom,
                info: a
            });
        }
    },
    bind_rowclick: function (dom) {
        this.dom.find(".modulerow").each(function () {
            $(this).removeClass("hover");
        });
        dom.toggleClass("hover");
        var c = dom.find(".icon").css("background-image");
        this.dispatchEvent("moduleimg", c.substring(4, c.length - 1));
    },
    bind_dbclick: function (dom, e) {
        this.dom.find(".modulerow").each(function () {
            $(this).removeClass("hover");
        });
        dom.parent(".modulerow").toggleClass("hover");
        this.dispatchEvent("add");
        e.stopPropagation();
    },
    bind_search: function (dom) {
        var val = dom.val();
        this.dom.find(".cctitle").each(function () {
            if ($(this).html().indexOf(val) !== -1) {
                $(this).parent(".modulerow").show();
            } else {
                $(this).parent(".modulerow").hide();
            }
        });
    },
    show: function () {
        var ths = this;
        this.showLoading();
        this.postData({
            url: this.option.infoAction,
            back: function (data) {
                ths.hideLoading();
                $($.template(domstr("@editortemplate", "modulelistcontent")).render(data)).appendTo(this.dom.find(".content")).tab({
                    titleClass: "listname"
                });
                ths.delegateEvent();
            }
        });
        this.dom.transition().set("-all-transform").scope().transform().x(0);
    },
    hide: function () {
        this.dispatchEvent("hidemask");
        this.dom.transition().set("-all-transform").always(function () {
            this.scope().remove();
        }).scope().transform().x("100%");
    },
    showLoading: function () {
        this.dom.find(".content").append("<div class='xloading'><div class='con'><i class='fa fa-refresh fa-spin'></i></div></div>");
    },
    hideLoading: function () {
        this.dom.find(".xloading").remove();
    },
    event_close: function (e) {
        this.hide();
        this.dispatchEvent("cleanFocus");
        e.stopPropagation();
    },
    event_add: function (e) {
        var ths = this;
        var a = this.dom.find(".modulerow.hover");
        if (a.length > 0) {
            this.postData({
                url: this.option.addAction,
                data: {moduleType: a.attr("key")},
                back: function (data) {
                    ths.dispatchEvent("addModulext", data);
                    ths.hide();
                }
            });
        }
        e.stopPropagation();
    }
});
Module({
    name: "layoutmapping",
    extend: "view",
    className: "layoutmapping",
    template: domstr("@editortemplate", "layoutmapping"),
    option: {
        title: "布局管理",
        editAction: basePath + "contenter/editmoduleinfo",
        infoAction: basePath + "contenter/modulelist",
        btns: [{name: "save", action: "save", icon: "fa fa-check"},
            {name: "close", action: "close", icon: "fa fa-long-arrow-right"}]
    },
    init: function () {
        this.render(this.option);
        this.show();
    },
    bind_btn: function (dom) {
        var a = this.option.btns[parseInt(dom.attr("num"))];
        if (a) {
            this.dispatchEvent(a.action, {
                btn: dom,
                info: a
            });
        }
    },
    bind_num: function (dom) {
        var ths = this;
        dom.parent(2).children().each(function () {
            if (dom.parent().get(0) === $(this).get(0)) {
                dom.parent().toggleClass("hover");
                if (dom.parent().hasClass("hover")) {
                    ths.dom.find(".customset").hide();
                } else {
                    ths.dom.find(".customset").show();
                }
            } else {
                if ($(this).hasClass("hover")) {
                    $(this).removeClass("hover");
                }
            }
        });
    },
    bind_num2: function (dom) {
        dom.parent().toggleClass("hover");
    },
    find_option: function (dom) {
        var ths = this;
        dom.bind("change", function () {
            ths.addcon.empty();
            var num = $(this).val() / 1, str = "";
            for (var i = 0; i < num; i++) {
                str += "<div><span class='editor_child_page_en'>列[" + (i + 1) + "]占比：</span><select class='editor_child_page_en_selected lsis'>" +
                        "<option>1</option><option>2</option><option>3</option><option>4</option>" +
                        "<option>5</option><option>6</option><option>7</option><option>8</option>" +
                        "<option>9</option><option>10</option><option>11</option><option>12</option>" +
                        "</select></div>";
            }
            ths.addcon.html(str);
        });
    },
    find_addcon: function (dom) {
        this.addcon = dom;
    },
    show: function () {
        this.dom.transition().set("-all-transform").scope().transform().x(0);
    },
    hide: function () {
        this.dispatchEvent("hidemask");
        this.dom.transition().set("-all-transform").always(function () {
            this.scope().remove();
        }).scope().transform().x("100%");
    },
    showMessage: function (mes) {
        var ths = this;
        this.dom.find(".editor_child_page_message").show().find("span").html(mes);
        setTimeout(function () {
            ths.hideMessage();
        }, 2000);
    },
    hideMessage: function () {
        this.dom.find(".editor_child_page_message").hide();
    },
    event_close: function (e) {
        this.hide();
        this.dispatchEvent("cleanFocus");
        e.stopPropagation();
    },
    event_save: function () {
        var a = {}, b = false;
        a.fixed = this.dom.find(".tlis").hasClass("hover") ? false : true;
        this.dom.find(".fsis").each(function () {
            if ($(this).hasClass("hover")) {
                b = true;
                a.num = $(this).find(".fsnum").html() / 1;
                a.rows = [];
                for (var i = 0; i < a.num; i++) {
                    a.rows.push(1);
                }
                a.total = a.rows.length;
            }
        });
        if (!b) {
            var lieshu = this.dom.find(".lieshuis").val() / 1;
            var c = [];
            this.dom.find(".lsis").each(function () {
                c.push($(this).val());
            });
            var total = 0;
            for (var i in c) {
                total += c[i] / 1;
            }
            if (total > 12) {
                this.showMessage("列占比之和不能大于12");
            } else {
                a.total = total;
                a.num = lieshu;
                a.rows = c;
                console.log(a);
                this.hide();
                this.dispatchEvent("addLayout", a);
            }
        } else {
            this.hide();
            this.dispatchEvent("addLayout", a);
        }
    }
});
Module({
    name: "globallayoutmapping",
    extend: "view",
    className: "globallayoutmapping",
    template: domstr("@editortemplate", "globallayoutmapping"),
    option: {
        title: "添加全局布局",
        editAction: basePath + "contenter/editmoduleinfo",
        infoAction: basePath + "contenter/modulelist",
        btns: [{name: "save", action: "save", icon: "fa fa-check"},
            {name: "close", action: "close", icon: "fa fa-long-arrow-right"}]
    },
    init: function () {
        this.render(this.option);
        this.show();
    },
    bind_num: function (dom) {
        var ths = this;
        dom.parent(2).children().each(function () {
            if (dom.parent().get(0) === $(this).get(0)) {
                dom.parent().toggleClass("hover");
                if (dom.parent().hasClass("hover")) {
                    ths.dom.find(".customset").hide();
                } else {
                    ths.dom.find(".customset").show();
                }
            } else {
                if ($(this).hasClass("hover")) {
                    $(this).removeClass("hover");
                }
            }
        });
    },
    bind_num2: function (dom) {
        dom.parent().toggleClass("hover");
    },
    find_option: function (dom) {
        var ths = this;
        dom.bind("change", function () {
            ths.addcon.empty();
            var num = $(this).val() / 1, str = "";
            for (var i = 0; i < num; i++) {
                str += "<div><span class='editor_child_page_en'>列[" + (i + 1) + "]占比：</span><select class='editor_child_page_en_selected lsis'>" +
                        "<option>1</option><option>2</option><option>3</option><option>4</option>" +
                        "<option>5</option><option>6</option><option>7</option><option>8</option>" +
                        "<option>9</option><option>10</option><option>11</option><option>12</option>" +
                        "</select></div>";
            }
            ths.addcon.html(str);
        });
    },
    find_addcon: function (dom) {
        this.addcon = dom;
    },
    show: function () {
        this.dom.transition().set("-all-transform").scope().transform().x(0);
    },
    hide: function () {
        this.dispatchEvent("hidemask");
        this.dom.transition().set("-all-transform").always(function () {
            this.scope().remove();
        }).scope().transform().x("100%");
    },
    showMessage: function (mes) {
        var ths = this;
        this.dom.find(".editor_child_page_message").show().find("span").html(mes);
        setTimeout(function () {
            ths.hideMessage();
        }, 2000);
    },
    hideMessage: function () {
        this.dom.find(".editor_child_page_message").hide();
    },
    btn_close: function () {
        this.hide();
        this.dispatchEvent("cleanFocus");
    },
    btn_save: function () {
        var a = {}, b = false;
        a.fixed = this.dom.find(".tlis").hasClass("hover") ? false : true;
        this.dom.find(".fsis").each(function () {
            if ($(this).hasClass("hover")) {
                b = true;
                a.num = $(this).find(".fsnum").html() / 1;
                a.rows = [];
                for (var i = 0; i < a.num; i++) {
                    a.rows.push(1);
                }
                a.total = a.rows.length;
            }
        });
        if (!b) {
            var lieshu = this.dom.find(".lieshuis").val() / 1;
            var c = [];
            this.dom.find(".lsis").each(function () {
                c.push($(this).val());
            });
            var total = 0;
            for (var i in c) {
                total += c[i] / 1;
            }
            if (total > 12) {
                this.showMessage("列占比之和不能大于12");
            } else {
                a.total = total;
                a.num = lieshu;
                a.rows = c;
                console.log(a);
                this.hide();
                this.dispatchEvent("addGlobalLayout", a);
            }
        } else {
            this.hide();
            this.dispatchEvent("addGlobalLayout", a);
        }
    }
});
Module({
    name: "layoutsetting",
    extend: "view",
    className: "layoutsetting",
    template: domstr("@editortemplate", "layoutsetting"),
    option: {
        title: "布局管理",
        editAction: basePath + "contenter/editmoduleinfo",
        infoAction: basePath + "contenter/modulelist",
        btns: [{name: "save", action: "save", icon: "fa fa-check"},
            {name: "close", action: "close", icon: "fa fa-long-arrow-right"}]
    },
    init: function () {
        this.removes = [];
        this.option["parameters"] = this.parameters;
        this.render(this.option);
        this.show();
    },
    bind_add: function (dom) {
        var str = domstr("@editortemplate", "layoutsettingcolspan");
        $(str).appendTo(this.dom.find(".clospancon"));
        this.delegateEvent();
    },
    bind_btn: function (dom) {
        this.dispatchEvent(dom.attr("type"), {btn: dom});
    },
    bind_btns: function (dom) {
        var a = this.option.btns[parseInt(dom.attr("num"))];
        if (a) {
            this.dispatchEvent(a.action, {
                btn: dom,
                info: a
            });
        }
    },
    show: function () {
        this.dom.transition().set("-all-transform").scope().transform().x(0);
    },
    hide: function () {
        this.dispatchEvent("hidemask");
        this.dom.transition().set("-all-transform").always(function () {
            this.scope().remove();
        }).scope().transform().x("100%");
    },
    event_moveup: function (e) {
        var btn = e.data.btn;
        var t = btn.parent(2);
        if (t.prev().length > 0) {
            t.insertBefore(t.prev());
        }
    },
    event_movedown: function (e) {
        var btn = e.data.btn;
        var t = btn.parent(2);
        if (t.next().length > 0) {
            t.insertAfter(t.next());
        }
    },
    event_remove: function (e) {
        var btn = e.data.btn;
        if(btn.parent(3).children().length>1){
            if (btn.parent(2).attr("num")) {
                this.removes.push(btn.parent(2).attr("num"));
            }
            btn.parent(2).remove();
        }else{
            $.toast("行中至少有一列");
        }
    },
    event_save: function (e) {
        var on480 = this.dom.find(".on480").val() === "0" ? null : "on480-row-" + this.dom.find(".on480").val() + "col";
        var on768 = this.dom.find(".on768").val() === "0" ? null : "on768-row-" + this.dom.find(".on768").val() + "col";
        var options = [];
        this.dom.find(".colspan").each(function () {
            options.push({
                fs: $(this).find("select").val() / 1,
                num: $(this).attr("num")
            });
        });
        var cd = [], total = 0;
        on480 && (cd.push(on480));
        on768 && (cd.push(on768));
        for (var i in options) {
            total += options[i].fs / 1;
        }
        var k = {addClass: cd, cols: options, total: total, remove: this.removes};
        this.dispatchEvent("chagenchildlayout", k);
        this.hide();
        e.stopPropagation();
    },
    event_close: function (e) {
        this.hide();
        this.dispatchEvent("cleanFocus");
        e.stopPropagation();
    }
});
Module({
    name: "pagelist",
    extend: "viewgroup",
    className: "pagelist",
    layout: domstr("@editortemplate", "pagelist"),
    option: {
        title: "页面管理",
        editAction: basePath + "contenter/editmoduleinfo",
        infoAction: basePath + "contenter/pagelist",
        addAction: basePath + "contenter/newmodule",
        btns: [{name: "addpage", action: "addpage", icon: "fa fa-plus"},
            {name: "close", action: "close", icon: "fa fa-long-arrow-right"}]
    },
    init: function () {
        this.datais = {};
        this.show();
    },
    bind_btn: function (dom) {
        var a = this.option.btns[parseInt(dom.attr("num"))];
        if (a) {
            this.dispatchEvent(a.action, {
                btn: dom,
                info: a
            });
        }
    },
    bind_rowclick: function (dom) {
        this.dom.find(".modulerow").each(function () {
            $(this).removeClass("hover");
        });
        dom.toggleClass("hover");
        var id = this.dom.find(".modulerow.hover").attr("pageid");
        this.hide();
        this.dispatchEvent("gotopage", this.datais[id]);
    },
    bind_clone: function (dom, e) {
        this.addChild({
            type: "@.messagebox",
            parameters: dom.parent(2).attr("pageid"),
            option: {
                inner: "@form.listform",
                title: "克隆页面",
                "@form.listform": {
                    fields: [
                        {"type": "@form.text", "label": "页面标题", "name": "pagename", "value": "xxxx"},
                        {"type": "@form.text", "label": "页面描述", "name": "pagedesc", "value": "xxxx"},
                        {"type": "@form.text", "label": "关键字", "name": "pagekeywords", "value": "xxxx"},
                        {"type": "@form.text", "label": "内容概要", "name": "pagecontent", "value": "xxxx"},
                        {"type": "@form.text", "label": "URL", "name": "pageurl", "value": "xxxx"}
                    ]
                },
                btns: [
                    {name: "checkclone", action: "checkclone", icon: "fa fa-check"},
                    {name: "close", action: "close", icon: "fa fa-times"}
                ],
                override: {
                    event_checkclone: function (e) {
                        var ths = this;
                        this.getChildrenByType("@form.listform")[0].getValues().done(function (data) {
                            data["pageclone"] = ths.parameters;
                            console.log(data);
                            ths.dispatchEvent("checkclonet", data);
                        });
                    }
                }
            }
        });
        e.stopPropagation();
    },
    bind_remove: function (dom, e) {
        var ths = this;
        var pageid = dom.parent(2).attr("pageid");
        this.postData({
            url: basePath + "contenter/removepage",
            data: {pagename: pageid},
            back: function (e) {
                this.postData({
                    url: ths.option.infoAction,
                    back: function (data) {
                        ths.dom.find(".content").empty();
                        for (var i in data) {
                            for (var t in data[i]) {
                                ths.datais[data[i][t].id] = data[i][t];
                            }
                        }
                        $($.template(domstr("@editortemplate", "pagelistcontent")).render(data)).appendTo(ths.dom.find(".content")).tab({
                            titleClass: "listname"
                        });
                        ths.delegateEvent();
                    }
                });
            }
        });
        e.stopPropagation();
    },
    bind_search: function (dom) {
        var val = dom.val();
        this.dom.find(".cctitle").each(function () {
            if ($(this).html().indexOf(val) !== -1) {
                $(this).parent(".modulerow").show();
            } else {
                $(this).parent(".modulerow").hide();
            }
        });
    },
    bind_toedit: function (dom, e) {
        var pagename = dom.parent(2).attr("pageid");
        this.addChild({
            type: "@.messagebox",
            option: {
                inner: "@form.listform",
                title: "修改页面信息",
                "@form.listform": {
                    fields: [
                        {"type": "@form.text", "label": "页面标题", "name": "pagename", "value": "xxxx"},
                        {"type": "@form.text", "label": "页面描述", "name": "pagedesc", "value": "xxxx"},
                        {"type": "@form.text", "label": "关键字", "name": "pagekeywords", "value": "xxxx"},
                        {"type": "@form.text", "label": "内容概要", "name": "pagecontent", "value": "xxxx"},
                        {"type": "@form.text", "label": "URL", "name": "pageurl", "value": "xxxx"}
                    ]
                },
                btns: [
                    {name: "check", action: "check", icon: "fa fa-check"},
                    {name: "close", action: "close", icon: "fa fa-times"}
                ],
                override: {
                    onendinit: function () {
                        this.getChildByType("@form.listform", 0).disable();
                        this.postData({
                            url: basePath + "contenter/pageinfo",
                            data: {pagename: pagename},
                            back: function (data) {
                                this.getChildrenByType("@form.listform")[0].setValues({
                                    pagename: data.title,
                                    pagedesc: data.desc,
                                    pagekeywords: data.keywords,
                                    pagecontent: data.content,
                                    pageurl: data.pageurl
                                });
                            }
                        });
                    },
                    event_check: function (e) {
                        var ths = this;
                        this.getChildrenByType("@form.listform")[0].getValues().done(function (da) {
                            da["pageId"] = pagename;
                            ths.postData({
                                url: basePath + "contenter/editpageinfo",
                                data: da,
                                back: function () {
                                    ths.hide();
                                }
                            });
                        });
                    }
                }
            }
        });
        e.stopPropagation();
    },
    show: function () {
        var ths = this;
        this.showLoading();
        this.postData({
            url: this.option.infoAction,
            back: function (data) {
                this.hideLoading();
                for (var i in data) {
                    for (var t in data[i]) {
                        ths.datais[data[i][t].id] = data[i][t];
                    }
                }
                $($.template(domstr("@editortemplate", "pagelistcontent")).render(data)).appendTo(this.dom.find(".content")).tab({
                    titleClass: "listname"
                });
                ths.delegateEvent();
            }
        });
        this.dom.transition().set("-all-transform").scope().transform().x(0);
    },
    hide: function () {
        this.dispatchEvent("hidemask");
        this.dom.transition().set("-all-transform").always(function () {
            this.scope().remove();
        }).scope().transform().x("100%");
    },
    showLoading: function () {
        this.dom.find(".content").append("<div class='xloading'><div class='con'><i class='fa fa-refresh fa-spin'></i></div></div>");
    },
    hideLoading: function () {
        this.dom.find(".xloading").remove();
    },
    event_close: function (e) {
        this.hide();
        this.dispatchEvent("cleanFocus");
        e.stopPropagation();
    },
    event_openpage: function (e) {
        var id = this.dom.find(".modulerow.hover").attr("pageid");
        this.hide();
        this.dispatchEvent("gotopage", this.datais[id]);
        e.stopPropagation();
    },
    event_addpage: function (e) {
        this.addChild({
            type: "@.messagebox",
            option: {
                inner: "@form.listform",
                title: "创建页面",
                "@form.listform": {
                    fields: [
                        {"type": "@form.text", "label": "页面标题", "name": "pagename", "value": "xxxx"},
                        {"type": "@form.text", "label": "页面描述", "name": "pagedesc", "value": "xxxx"},
                        {"type": "@form.text", "label": "关键字", "name": "pagekeywords", "value": "xxxx"},
                        {"type": "@form.text", "label": "内容概要", "name": "pagecontent", "value": "xxxx"},
                        {"type": "@form.text", "label": "URL", "name": "pageurl", "value": "xxxx"}
                    ]
                },
                btns: [
                    {name: "check", action: "check", icon: "fa fa-check"},
                    {name: "close", action: "close", icon: "fa fa-times"}
                ],
                override: {
                    event_check: function (e) {
                        var ths = this;
                        this.getChildrenByType("@form.listform")[0].getValues().done(function (data) {
                            ths.dispatchEvent("checkt", data);
                        });
                    }
                }
            }
        });
    },
    event_checkt: function (e) {
        var ths = this;
        this.postData({
            url: basePath + "contenter/addpage",
            data: e.data,
            back: function (e) {
                ths.getLastChild().hide();
                this.postData({
                    url: ths.option.infoAction,
                    back: function (data) {
                        ths.dom.find(".content").empty();
                        for (var i in data) {
                            for (var t in data[i]) {
                                ths.datais[data[i][t].id] = data[i][t];
                            }
                        }
                        $($.template(domstr("@editortemplate", "pagelistcontent")).render(data)).appendTo(ths.dom.find(".content")).tab({
                            titleClass: "listname"
                        });
                        ths.delegateEvent();
                    }
                });
            }
        });
        e.stopPropagation();
    },
    event_checkclonet: function (e) {
        var ths = this;
        this.postData({
            url: basePath + "contenter/addpage",
            data: e.data,
            back: function (e) {
                ths.getLastChild().hide();
                this.postData({
                    url: ths.option.infoAction,
                    back: function (data) {
                        ths.dom.find(".content").empty();
                        for (var i in data) {
                            for (var t in data[i]) {
                                ths.datais[data[i][t].id] = data[i][t];
                            }
                        }
                        $($.template(domstr("@editortemplate", "pagelistcontent")).render(data)).appendTo(ths.dom.find(".content")).tab({
                            titleClass: "listname"
                        });
                        ths.delegateEvent();
                    }
                });
            }
        });
        e.stopPropagation();
    },
    event_edit: function (e) {

    }
});
Module({
    name: "messagebox",
    extend: "viewgroup",
    className: "messagebox",
    layout: domstr("@editortemplate", "messagebox"),
    option: {
        title: "messagebox",
        width: 350,
        inner: "",
        btns: [{name: "close", action: "close", icon: "fa fa-long-arrow-right"}]
    },
    init: function () {
        this.show();
    },
    bind_btn: function (dom) {
        var a = this.option.btns[parseInt(dom.attr("num"))];
        if (a) {
            this.dispatchEvent(a.action, {
                btn: dom,
                info: a
            });
        }
    },
    show: function () {
        this.dom.find(".messagebox-con").transition().set("-all-transform").scope().transform().x(0);
    },
    hide: function () {
        this.dom.find(".messagebox-con").transition().set("-all-transform").always(function () {
            this.scope().parent().remove();
        }).scope().transform().x("100%");
    },
    event_close: function (e) {
        this.hide();
        e.stopPropagation();
    }
});
Module({
    name: "img",
    extend: "view",
    template: "<img style='width:100%;' src='<%=data.img;%>'>",
    option: {img: ""},
    init: function () {
        this.render(this.option);
    }
});
//other page
Module({
    name: "editorlite",
    extend: "view",
    className: "eidtorlite",
    init: function () {
        window.__editable__ = true;
        this.initPage();
        this.initRow();
        this.initSpan();
        this.initModule();
        this.dom.insertBefore($("body").children(0));
    },
    dispatchParentEvent: function (type, data) {
        window.parent.brooder("body").getModule().dispatchEvent(type, data);
    },
    initPage: function () {
        var ths = this;
        var defaultModules = [];
        $("*[module]").each(function () {
            defaultModules.push($(this).attr("data-view-id"));
        });
        $("body").prepend("<div class='editor_child_headtools'>" +
                "<div class='editor_child_btn' type='addgloballayout'><i class='fa fa-th'></i></div>" +
                "</div>").find(".editor_child_btn").each(function () {
            $(this).click(function () {
                ths.dispatchParentEvent($(this).attr("type"));
            });
        });
        this.defaultModules = defaultModules;
    },
    initRow: function () {
        var ths = this;
        $(".row").each(function () {
            if (!$(this).children(0).hasClass("editor_child_tools")) {
                $(this).prepend("<div class='editor_child_tools'>" +
                        "<div class='editor_row_color'></div>" +
                        "<div class='editor_child_btns'>" +
                        "<div class='editor_child_btn' type='showLayout'><i class='fa fa-th-large'></i></div>" +
                        "<div class='editor_child_btn' type='deleteRow'><i class='fa fa-times'></i></div>" +
                        "<div class='editor_child_btn' type='moveup'><i class='fa fa-angle-up'></i></div>" +
                        "<div class='editor_child_btn' type='movedown'><i class='fa fa-angle-down'></i></div>" +
                        "<div class='editor_child_btn' type='layoutsetting'><i class='fa fa-sliders'></i></div>" +
                        "</div>" +
                        "</div>").find(".editor_child_btn").each(function () {
                    $(this).click(function () {
                        $(".clicked").each(function () {
                            $(this).removeClass("clicked");
                        });
                        $(".editor_child_spanhover").each(function () {
                            if ($(this).hasClass("editor_child_spanhover")) {
                                $(this).removeClass("editor_child_spanhover").removeAttr("id");
                            }
                        });
                        $(this).parent(3).addClass("editor_child_spanhover").attr("id", "editor_child_spanid");
                        if ($(this).attr("type") === "showLayout" || $(this).attr("type") === "layoutsetting") {
                            var total = 0, rows = [], num = 0, phone = 0, pad = 0;
                            var nt = $(this).parent(3).attr("class").split(" ");
                            for (var i in nt) {
                                if (nt[i].indexOf("on480") === 0) {
                                    phone = nt[i].split("-")[2][0];
                                }
                                if (nt[i].indexOf("on768") === 0) {
                                    pad = nt[i].split("-")[2][0];
                                }
                            }
                            $(this).parent(3).children().each(function () {
                                var cla = "", clas = $(this).attr("class") ? $(this).attr("class").split(" ") : [];
                                for (var i in clas) {
                                    if (clas[i].indexOf("span") === 0) {
                                        cla = clas[i];
                                        break;
                                    }
                                }
                                if (cla !== "") {
                                    var n = cla.split("-");
                                    total = n[1];
                                    num += 1;
                                    rows.push(n[0].substring(4));
                                }
                            });
                            ths.dispatchParentEvent($(this).attr("type"), {
                                num: num,
                                total: total,
                                rows: rows,
                                phone: phone,
                                pad: pad
                            });
                        } else {
                            ths.dispatchEvent($(this).attr("type"), {btn: $(this)});
                        }
                    });
                });
            }
        });
    },
    initSpan: function () {
        var ths = this;
        $(".row *[class*='span']").each(function () {
            if (!$(this).children(0).hasClass("editor_child_tools")) {
                $(this).prepend("<div class='editor_child_tools'>" +
                        "<div class='editor_col_color'></div>" +
                        "<div class='editor_child_btns'>" +
                        "<div class='editor_child_btn' type='showLayout'><i class='fa fa-th-large'></i></div>" +
//                        "<div class='editor_child_btn' type='deleteSpan'><i class='fa fa-times'></i></div>" +
                        "<div class='editor_child_btn' type='moveleft'><i class='fa fa-angle-left'></i></div>" +
                        "<div class='editor_child_btn' type='moveright'><i class='fa fa-angle-right'></i></div>" +
                        "<div class='editor_child_btn' type='showModuleList'><i class='fa fa-plus'></i></div>" +
                        "</div>" +
                        "</div>").find(".editor_child_btn").each(function () {
                    $(this).click(function () {
                        $(".clicked").each(function () {
                            $(this).removeClass("clicked");
                        });
                        $(".editor_child_spanhover").each(function () {
                            if ($(this).hasClass("editor_child_spanhover")) {
                                $(this).removeClass("editor_child_spanhover").removeAttr("id");
                            }
                        });
                        $(this).parent(3).addClass("editor_child_spanhover").attr("id", "editor_child_spanid");
                        if ($(this).attr("type") === "showModuleList" || $(this).attr("type") === "showLayout") {
                            ths.dispatchParentEvent($(this).attr("type"));
                        } else {
                            ths.dispatchEvent($(this).attr("type"), {btn: $(this)});
                        }
                    });
                });
            }
        });
    },
    initModule: function () {
        var ths = this;
        $("*[module]").each(function () {
            if (!$(this).parent().hasClass("editor_module_wrapper")) {
                var c = $(this).wrap("<div class='editor_module_wrapper'></div>");
                var sttr="<div class='editor_child_modulemask'><div class='editor_child_moduleicon'><i class='fa fa-times'></i></div></div>";
                if($(this).attr("removeable")===false||$(this).attr("removeable")==="false"){
                    sttr="<div class='editor_child_modulemask'></div>";
                }
                $(sttr).appendTo(c.parent()).click(function () {
                    if (window.__editable__ && !$(this).hasClass("clicked")) {
                        $(".clicked").each(function () {
                            $(this).removeClass("clicked");
                        });
                        $(".editor_child_spanhover").each(function () {
                            if ($(this).hasClass("editor_child_spanhover")) {
                                $(this).removeClass("editor_child_spanhover").removeAttr("id");
                            }
                        });
                        $(this).addClass("clicked");
                        var c = $(this).parent().children(0).getModule();
                        ths.dispatchParentEvent("showModuleInfo", {
                            moduleId: c.getId(),
                            moduleType: c.dom.attr("module"),
                            isedit: c.__isedit__,
                            values: c.__values__
                        });
                    } else {
                        $(this).removeClass("clicked");
                        ths.dispatchParentEvent("hideModuleInfo");
                    }
                }).find(".editor_child_moduleicon").click(function (e) {
                    $(this).parent(2).remove();
                    e.stopPropagation();
                });
            }
        });
        this.cleanModule();
    },
    cleanModule: function () {
        $("*[module]").each(function () {
            $(this).find(".editor_child_tools").remove();
        });
    },
    topToolbar: function () {
        $(".editor_child_tools").each(function () {
            if ($(this).parent().children(0).get(0) !== $(this).get(0)) {
                $(this).insertBefore($(this).parent().children(0));
            }
        });
    },
    event_updatemodule: function (e) {
        var id = e.data.moduleId;
        var k = this.parentView.getChildById(id);
        if (k) {
            k.__isedit__ = true;
            k.__values__ = e.data.values;
            k.update();
        }
    },
    event_addModulext: function (e) {
        var info = e.data, ths = this;
        this.parentView.addChild({
            type: info.view,
            container: $("#editor_child_spanid"),
            id: info.id,
            option: {
                override: {
                    layout: info.templateString
                }
            }
        }).done(function () {
            this.getLastChild().dom.attr("module", info.type);
            ths.initModule();
        });
    },
    event_addLayout: function (e) {
        var data = e.data;
        var str = "<div class='row'>";
        for (var i = 0; i < data.num; i++) {
            str += "<div class='span" + data.rows[i] + "-" + data.total + "'></div>";
        }
        str += "</div>";
        $(str).appendTo("#editor_child_spanid");
        $("body").scrollingTop($("body").height() - $(window).height() + 200);
        this.initRow();
        this.initSpan();
        this.cleanModule();
    },
    event_addGlobalLayout: function (e) {
        var data = e.data;
        var str = "<div class='row" + (data.fixed ? " mid-fix" : "") + "'>";
        for (var i = 0; i < data.num; i++) {
            str += "<div class='span" + data.rows[i] + "-" + data.total + "'></div>";
        }
        str += "</div>";
        $(str).appendTo("body");
        $("body").scrollingTop($("body").height() - $(window).height() + 200);
        this.initRow();
        this.initSpan();
        this.cleanModule();
    },
    event_getpageinfo: function (e) {
        var t = $("body").clone();
        t.find("#editor_child_spanid").attr("id", "");
        t.find("#editor_child_spanid").removeAttr("id");
        t.find(".editor_child_headtools").remove();
        t.find(".editor_child_tools").remove();
        t.find(".editor_child_spanhover").removeClass("editor_child_spanhover");
        t.find(".editor_module_wrapper").each(function () {
            $("<OOMODULEOO id='" + $(this).children(0).dataset("viewId") + "'></OOMODULEOO>").replaceWith(this);
        });
        t.find("div[data-view='contenter.editor.editorlite']").remove();
        var defaultModules = [];
        $("*[module]").each(function () {
            defaultModules.push($(this).attr("data-view-id"));
        });
        var deleteModules = [];
        for (var i in this.defaultModules) {
            if (defaultModules.indexOf(this.defaultModules[i]) === -1) {
                deleteModules.push(this.defaultModules[i]);
            }
        }
        var template = t.html(), modules = [];
        template = template.replace(/id=\"editor_child_spanid\"/g, "").replace(/\r\n/g, "").replace(/\r/g, "").replace(/\n/g, "").replace(/>[\s]+</g, "><").trim();
        $("body").find(".editor_module_wrapper").each(function () {
            var md = $(this).children(0).getModule();
            modules.push({
                moduleType: md.dom.attr("module"),
                moduleId: md.getId(),
                values: md.__isedit__ ? window.JSON.stringify(md.__values__) : null
            });
        });
        this.dispatchParentEvent("savepageinfo", {
            pagename: window.editor_pagename,
            template: template,
            modules: modules,
            deleteModules: deleteModules.join(",")
        });
    },
    event_deleteRow: function () {
        if($(".editor_child_spanhover").find("*[removeable='false']").length>0){
            $.toast("行内部包含不可删除组件");
        }else{
            $(".editor_child_spanhover").remove();
        }
    },
    event_deleteSpan: function () {
        if ($(".editor_child_spanhover").parent().find("*[class*='span']").length === 1) {
            $(".editor_child_spanhover").parent().remove();
        } else {
            $(".editor_child_spanhover").remove();
        }
    },
    event_cleanFocus: function () {
        $(".clicked").each(function () {
            $(this).removeClass("clicked");
        });
        $(".editor_child_spanhover").each(function () {
            if ($(this).hasClass("editor_child_spanhover")) {
                $(this).removeClass("editor_child_spanhover").removeAttr("id");
            }
        });
    },
    event_moveup: function (e) {
        var row = e.data.btn.parent(3);
        if (row.prev().hasClass("row")) {
            row.insertBefore(row.prev());
        }
    },
    event_movedown: function (e) {
        var row = e.data.btn.parent(3);
        if (row.next().hasClass("row")) {
            row.insertAfter(row.next());
        }
    },
    event_moveleft: function (e) {
        var span = e.data.btn.parent(3);
        if (span.prev().length > 0 && span.prev().attr("class").indexOf("span") !== -1) {
            span.insertBefore(span.prev());
        }
    },
    event_moveright: function (e) {
        var span = e.data.btn.parent(3);
        if (span.next().length > 0 && span.next().attr("class").indexOf("span") !== -1) {
            span.insertAfter(span.next());
        }
    },
    event_chagenchildlayout: function (e) {
        console.log(e.data);
        var row = $("#editor_child_spanid"), span = row.children("*[class*='span']"), numis = 0;
        for (var i in e.data.addClass) {
            row.addClass(e.data.addClass[i]);
        }
        var n = [];
        for (var i in e.data.remove) {
            n.push(span.eq(e.data.remove[i]));
        }
        for (var i in n) {
            n[i].remove();
        }
        span = row.children("*[class*='span']");
        for (var i = 0; i < e.data.cols.length; i++) {
            if (e.data.cols[i]) {
                var num = e.data.cols[i].num;
                if (!num) {
                    if (i === 0) {
                        $("<div class='span" + e.data.cols[i].fs + "-" + e.data.total + "'></div>").prependTo(row);
                    } else {
                        $("<div class='span" + e.data.cols[i].fs + "-" + e.data.total + "'></div>").insertAfter(row.children("*[class*='span']").eq(i - 1));
                    }
                } else {
                    var tp = span.eq(numis), tpp = tp.attr("class").split(" ");
                    for (var t in tpp) {
                        if (tpp[t].indexOf("span") === 0) {
                            tpp.splice(t, 1);
                        }
                    }
                    tpp.push("span" + e.data.cols[i].fs + "-" + e.data.total);
                    tp.attr("class", tpp.join(" "));
                    numis += 1;
                }
            }
        }
        this.initSpan();
        this.topToolbar();
        this.cleanModule();
    },
    event_showPage: function () {
        window.__editable__ = false;
        $("body").addClass("editor_show");
    },
    event_endShowPage: function () {
        window.__editable__ = true;
        $("body").removeClass("editor_show");
    }
});

$.toast = function (text) {
    $("<div class='editor_toast'><div class='toast_text'>" + text + "</div></div>").appendTo("body").transition().set("-all-transform").done(function () {
        this.transition().removeAll().set("opacity", {time: 1000}).delay(2000).then(function () {
            this.css("opacity", 0);
        }).delay(1000).done(function () {
            this.remove();
        }).resolve();
    }).scope().transform().y(-150);
};