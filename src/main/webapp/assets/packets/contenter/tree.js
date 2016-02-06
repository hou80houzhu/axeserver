/*!
 * @packet contenter.tree;
 * @dom contenter.template.formtemplate;
 * @css contenter.style.treelite;
 */
Module({
    name: "treelite",
    extend: "view",
    option: {
        url: "data/getree.json",
        value: "",
        width: 270,
        listname: "list",
        showname: "name",
        iconname: "imgx",
        level: 4,
        selectType: "autosingle", //auto,autosingle,simple
        ischeck: false,
        async: false,
        firstClick: true,
        resetId: "id",
        tools: [
            {name: "添加", title: "添加", type: "add", icon: "fa fa-plus"},
            {name: "删除", title: "删除", type: "remove", icon: "fa fa-times"}
        ],
        hook: function (c) {
            return c;
        }
    },
    className: "xtree",
    template: domstr("@formtemplate", "treelite"),
    init: function () {
        this.cache = [];
        this.current = null;
        this.render();
    },
    bind_xtoggle: function (dom) {
        dom.toggleClass("toggle");
        if (dom.hasClass("toggle")) {
            this.closeAllFolder();
        } else {
            this.openAllFolder();
        }
    },
    setValue: function (data) {
        if ($.is.isString(data)) {
            data = window.JSON.parse(data);
        }
        if (this.dom) {
            this.buildTree(this.dom.children(1), data);
        }
        return this;
    },
    firstClick: function () {
        this.dom.find(".title").eq(0).trigger("click");
    },
    refresh: function () {
        this._old = this.cache[this.current.parent().attr("nodeid")];
        this.cache.length = 0;
        this.dom.children(1).empty();
        this.current = null;
        var ths = this;
        this.getRemoteData(null, function (data) {
            ths.buildTree(ths.dom.children(1), data);
            ths.resetNode(ths._old);
        });
    },
    getRemoteData: function (data, fn) {
        var ths = this;
        this.postData({
            url: this.option.url,
            data: data,
            back: function (data) {
                ths.dom && ths.dom.find(".xcurrent").empty();
                fn && fn(data);
            },
            dataerror: function (e) {
                ths.dom && ths.dom.find(".xcurrent").html(e.msg);
            },
            neterror: function () {
                ths.dom.find(".xcurrent").html("网络错误！");
            }
        });
    },
    buildTree: function (dom, json) {
        var html = "", ths = this;
        var cfn = function (json, c) {
            if (typeof json === "object") {
                if (json instanceof Array === false) {
                    ths.cache.push(json);
                    var i = ths.cache.length - 1;
                    var ct = "";
                    if (ths.option.hook) {
                        ct = ths.option.hook(json[ths.option.showname]);
                    } else {
                        ct = json[ths.option.fieldName];
                    }
                    if ((json[ths.option.listname]) && (json[ths.option.listname]).length > 0) {
                        html += "<div class='xnode' nodeid='" + i + "'>" +
                                "<div class='xnode-head'>" +
                                "<div class='arrow' data-bind='click:arrow'><i class='fa fa-caret-right'></i></div>" +
                                (ths.option.ischeck ? "<input type='checkbox' data-bind='input'/>" : "<input type='checkbox' data-bind='input' style='display:none'/>") +
                                (json[ths.option.iconname] ? "<div class='icon'><i class='" + json[ths.option.iconname] + "'></i></div>" : "") +
                                "<span class='title' data-bind='click:title'>" + ct + "</span></div><div class='xnode-list'>";
                        arguments.callee(json[ths.option.listname] || []);
                    } else {
                        if (ths.option.async) {
                            html += "<div class='xnode close' nodeid='" + i + "'>" +
                                    "<div class='xnode-head'>" +
                                    "<div class='arrow' data-bind='click:arrow'><i class='fa fa-caret-right'></i></div>" +
                                    (ths.option.ischeck ? "<input type='checkbox'  data-bind='click:input'/>" : "<input type='checkbox'  data-bind='click:input' style='display:none'/>") +
                                    (json[ths.option.iconname] ? "<div class='icon'><i class='" + json[ths.option.iconname] + "'></i></div>" : "") +
                                    "<span class='title' data-bind='click:title'>" + ct + "</span></div><div class='xnode-list'>";
                        } else {
                            html += "<div class='xnode' nodeid='" + i + "'>" +
                                    "<div class='xnode-head noarrow'>" +
                                    "<div class='arrow' data-bind='click:arrow'><i class='fa fa-caret-right'></i></div>" +
                                    (ths.option.ischeck ? "<input type='checkbox'  data-bind='click:input'/>" : "<input type='checkbox'  data-bind='click:input' style='display:none'/>") +
                                    (json[ths.option.iconname] ? "<div class='icon'><i class='" + json[ths.option.iconname] + "'></i></div>" : "") +
                                    "<span class='title' data-bind='click:title'>" + ct + "</span></div><div class='xnode-list'>";
                        }
                    }
                    html += "</div></div>";
                } else {
                    for (var m in json) {
                        arguments.callee(json[m]);
                    }
                }
            }
        };
        cfn(json);
        dom.html(html);
        this.delegateEvent();
        return this;
    },
    bind_arrow: function (dom) {
        if (this.option.async && dom.parent().parent().children(1).children().length === 0) {
            dom.find("i").attr("class", "fa fa-refresh fa-spin");
            var thss = dom;
            this.getRemoteData(this.cache[parseInt(dom.parent().parent().attr("nodeid"))].id, function (data) {
                if (data || data.length) {
                    thss.find("i").attr("class", "fa fa-caret-right");
                    this.buildTree(thss.parent().parent().removeClass("close").children(1), data);
                } else {
                    thss.parent().addClass("noarrow");
                }
            });
        } else {
            var a = dom.parent().parent();
            a.toggleClass("close");
        }
    },
    bind_title: function (dom) {
        var ths = this;
        this.current = dom.parent();
        this.dom.find(".xnode-head").each(function () {
            $(this).removeClass("active");
        });
        this.current.addClass("active");
        var a = dom.parent().parent(), k = 0, lev = 0, data = ths.cache[parseInt(dom.parent().parent().attr("nodeid"))];
        if (!a.attr("level")) {
            while (a.get(0) && a.attr("nodeid")) {
                a = a.parent().parent();
                k++;
            }
            lev = k + 1;
            dom.parent().parent().attr("level", lev);
        } else {
            lev = dom.parent().parent().attr("level");
        }
        if (ths.option.tools.length > 0 && dom.parent().find(".tools").length === 0) {
            var str = "<div class='tools'>";
            ths.option.tools.forEach(function (a) {
                str += "<div class='tool' type='" + a.type + "' title='" + a.title + "'><i class='" + a.icon + "'></i></div>";
            });
            str += "</div>";
            dom.parent().append(str);
            dom.parent().find(".tool").each(function () {
                $(this).click(function () {
                    var type = $(this).attr("type");
                    ths.dispatchEvent("treelite_" + type, {
                        node: ths.current,
                        btn: $(this),
                        level: ths.current.parent().attr("level"),
                        data: ths.cache[parseInt(ths.current.parent().attr("nodeid"))],
                        tree: ths
                    });
                });
            });
        }
        ths.dom.find(".xcurrent").html(dom.html());
        ths.dispatchEvent("treelite_click", {
            node: ths.current,
            level: lev,
            data: data,
            tree: ths
        });
    },
    bind_input: function (dom) {
        var ths = this;
        var a = dom.get(0).checked;
        if (ths.option.selectType === "auto") {
            if (a) {
                var c = dom.parent().parent().parent().parent();
                while (c.attr("nodeid")) {
                    c.children(0).find("input[type='checkbox']").get(0).checked = true;
                    c = c.parent().parent().parent().parent();
                }
            } else {
                var c = dom.parent().parent().parent().parent();
                while (c.attr("nodeid")) {
                    ths.toggle(c);
                    c = c.parent().parent().parent().parent();
                }
            }
            dom.parent().parent().children(1).children().each(function () {
                $(this).find("input[type='checkbox']").get(0).checked = a;
            });
        } else if (ths.option.selectType === "autosingle") {
            if (a) {
                ths.dom.find("input[type='checkbox']").each(function () {
                    $(this).get(0).checked = false;
                });
                dom.get(0).checked = true;
                var c = dom.parent().parent().parent().parent();
                while (c.attr("nodeid")) {
                    c.children(0).find("input[type='checkbox']").get(0).checked = true;
                    c = c.parent().parent().parent().parent();
                }
            } else {
                var c = dom.parent().parent().parent().parent();
                while (c.attr("nodeid")) {
                    ths.toggle(c);
                    c = c.parent().parent().parent().parent();
                }
            }
        }
    },
    toggle: function (node) {
        var has = false;
        node.children(1).children().each(function () {
            if ($(this).find("input[type='checkbox']").get(0).checked) {
                has = true;
                return false;
            }
        });
        if (!has) {
            node.children(0).find("input[type='checkbox']").get(0).checked = false;
        }
    },
    moveup: function () {
        if (this.current) {
            var a = this.current.parent().previousSibling();
            if (a.length > 0) {
                this.current.parent().insertBefore(a);
            }
        }
        return this;
    },
    movedown: function () {
        if (this.current) {
            var a = this.current.parent().nextSibling();
            if (a.length > 0) {
                this.current.parent().insertAfter(a);
            }
        }
        return this;
    },
    removeNode: function () {
        if (this.current) {
            if (this.current.parent(2).children().length === 1) {
                this.current.parent(3).addClass("close");
                this.current.parent(3).children(0).addClass("noarrow");
            }
            this.current.parent().remove();
        }
        return this;
    },
    addNode: function (json) {
        if (this.current) {
            this.cache.push(json);
            var i = this.cache.length - 1;
            if (this.current.parent().children(1).children().length === 0) {
                this.current.parent().removeClass("close");
                this.current.removeClass("noarrow");
            }
            var html = "<div class='xnode' nodeid='" + i + "'>" +
                    "<div class='xnode-head noarrow'>" +
                    "<div class='arrow' data-bind='click:arrow'><i class='fa fa-caret-right'></i></div>" +
                    (this.option.ischeck ? "<input type='checkbox' data-bind='click:input'/>" : "<input type='checkbox' data-bind='click:input' style='display:none'/>") +
                    (json[this.option.iconname] ? "<div class='icon'><i class='" + json[this.option.iconname] + "'></i></div>" : "") +
                    "<span class='title' data-bind='click:title'>" + json[this.option.showname] + "</span></div><div class='xnode-list'></div></div>";
            $(html).appendTo(this.current.parent().children(1));
            this.delegateEvent();
        }
        return this;
    },
    editNode: function (json) {
        var a = false, ths = this, index = 0;
        for (var i = 0; i < this.cache.length; i++) {
            var a = this.cache[i];
            if (a.id === json.id) {
                $.extend(a, json);
                index = i;
                a = true;
                break;
            }
        }
        if (a) {
            var cd = ths.dom.find("div[nodeid='" + index + "']");
            if (cd.length > 0) {
                cd.children(0).find(".title").html(json[this.option.showname]);
                json[this.option.iconname] && cd.children(0).find("i").attr("class", json[this.option.iconname]);
            }
        }
        return this;
    },
    getValue: function () {
        var ths = this;
        var c = this.dom.find(".xnode").eq(0);
        var nt = function (dom) {
            var data = ths.cache[dom.attr("nodeid") / 1];
            data.list = [];
            dom.children(1).children().each(function () {
                data.list.push(nt($(this)));
            });
            return data;
        };
        nt(c);
        return ths.cache[this.dom.find(".xnode").eq(0).attr("nodeid") / 1];
    },
    closeAllFolder: function () {
        this.dom.find(".xnode").each(function () {
            $(this).addClass("close");
        });
    },
    openAllFolder: function () {
        this.dom.find(".xnode").each(function () {
            $(this).removeClass("close");
        });
    },
    getSelectData: function () {
        var c = [], ths = this;
        this.dom.find("input[type='checkbox']").each(function () {
            var a = $(this).parent().parent().parent().attr("nodeid");
            c.push(ths.cache[parseInt(a)]);
        });
        return c;
    },
    resetNode: function (node) {
        var nodeid = 0;
        for (var i = 0; i < this.cache.length; i++) {
            if (this.cache[i][this.option.resetId] === node[this.option.resetId]) {
                nodeid = i;
                break;
            }
        }
        var c = this.dom.find("div[nodeid='" + nodeid + "']");
        if (c.length > 0) {
            this.dom.find(".xnode-head").each(function () {
                $(this).removeClass("active");
            });
            c.children(0).addClass("active");
            this.current = c.children(0);
            this.dom.find(".xcurrent").html(node[this.option.showname]);
        }
    },
    reset: function () {
        this.dom.find("input[type='checkbox']").each(function () {
            $(this).get(0).checked = false;
        });
        return this;
    },
    recheck: function (ids) {
        var ths = this;
        if (ids && ids !== "") {
            ids.split(",").forEach(function (a) {
                var n = ths.getData(a);
                if (n.data) {
                    var cd = ths.dom.find("div[nodeid='" + n.index + "']");
                    if (cd.length > 0) {
                        cd.find("input").get(0).checked = true;
                    }
                }
            });
        }
    }
});