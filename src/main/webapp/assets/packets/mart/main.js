/*!
 * @packet mart.main;
 * @usestrict true;
 * @require mart.util.touch;
 * @require mart.form;
 * @template mart.template.template;
 * @css mart.style.main;
 * @css mart.style.font-awesome-min;
 */
Module({
    name: "pageController",
    extend: "viewgroup",
    className: "main-pagecontroller",
    layout: "",
    option: {
        url: "",
        router: {
            "test/page1": []
        }
    },
    onbeforeinit: function (option) {
        var c = {};
        for (var i in option.router) {
            var url=option.router[i].url;
            if (url[url.length - 1] !== "/") {
                c[url + "/"] = option.router[i].option;
            } else {
                c[url] = option.router[i].option;
            }
        }
        option.router = c;
        this._session = {
            scope: {},
            set: function (key, value) {
                this.scope[key] = value;
                return this;
            },
            get: function (key) {
                return this.scope[key];
            },
            remove: function (key) {
                this.scope[key] = undefined;
            },
            removeAll: function () {
                this.scope = {};
                return this;
            }
        };
    },
    init: function () {
        var ths = this;
        this._router = $.router(this.option.url);
        for (var i in this.option.router) {
            this._router.bind(i, function (e) {
                ths.openPage(e.action, e);
            });
        }
        this._router.run();
    },
    bind: function (url) {
        var ths = this;
        this._router.bind(url, function (e) {
            ths.openPage(e.action, e);
        });
    },
    openPage: function (url, data) {
        $("body").scrollTop(0);
        if (this.children.length > 0) {
            this.children[0].out();
        }
        return this.addChild({
            type: "@.page",
            option: this.option.router[url],
            parameters: data
        });
    },
    open: function (url, data) {
        $("body").scrollTop(0);
        if (this.children.length > 0) {
            if (data.forward) {
                this.children[0].outLeft();
            }
            if (data.back) {
                this.children[0].outRight();
            }
            if (data.forward === false && data.back === false) {
                this.children[0].outLeft();
            }
            this.addChild({
                type: "@.page",
                option: {
                    mapping: this.option.router[url]
                },
                parameters: data
            }).done(function (page) {
                if (data.forward) {
                    page.inRight();
                }
                if (data.back) {
                    page.inLeft();
                }
                if (data.forward === false && data.back === false) {
                    page.inRight();
                }
            });
        } else {
            this.addChild({
                type: "@.page",
                option: {
                    mapping: this.option.router[url]
                },
                parameters: data
            }).done(function (page) {
                page.inWithout();
            });
        }
    },
    event_openPage: function (e) {
        this._router.open(e.data.url, e.data.data, e.data.title);
        e.stopPropagation();
    },
    event_redirecPage: function (e) {
        this._router.edit(e.data.url, e.data.data, e.data.title);
        e.stopPropagation();
    },
    getSession: function () {
        return this._session;
    }
});
Module({
    name: "page",
    extend: "viewgroup",
    className: "main-page",
    layout: "<div class='main-page-progress' data-find='progress'><div class='main-page-progress-bar'></div></div>",
    option: {
        autoLoad: true,
        mapping: [
            {name: "", option: ""}
        ]
    },
    init: function () {
        if (this.option.autoLoad) {
            this.loadPage();
        }
    },
    loadPage: function () {
        if(this.option.mapping.length>0){
            for (var i in this.option.mapping) {
                this.addChild({
                    type: this.option.mapping[i].name,
                    option: this.option.mapping[i].option,
                    container: this.dom
                });
            }
        }else{
            this.progress.remove();
            this.dispatchEvent("pageready");
        }
    },
    onbeforeinit: function () {
        this._total = 0;
    },
    oninitchild: function () {
        this._total++;
        if (this._total === this.option.mapping.length) {
            this.progress.children(0).width((this._total / this.option.mapping.length) * 100 + "%");
            this.progress.remove();
            this.dispatchEvent("urlchange", this.parameters.action, false);
            this.dispatchEvent("pageready");
        }
    },
    find_progress: function (dom) {
        this.progress = dom;
    },
    out: function () {
        this.remove();
    },
    in: function () {
    },
    outLeft: function () {
        this.dom.transition().all().done(function (dom) {
            this.remove();
        }).scope().transform().x("-100%");
    },
    outRight: function () {
        this.dom.transition().all().done(function (dom) {
            this.remove();
        }).scope().transform().x("100%");
    },
    inLeft: function () {
        var ths = this;
        this.dom.addClass("left");
        setTimeout(function () {
            ths.dom.transition().all().scope().transform().x(0);
        }, 0);
    },
    inRight: function () {
        var ths = this;
        this.dom.addClass("right");
        setTimeout(function () {
            ths.dom.transition().all().scope().transform().x(0);
        }, 0);
    },
    inWithout: function () {
        this.dom.transform().x(0);
    },
    getSession: function () {
        return this.parentView.getSession();
    }
});
Module({
    name: "404",
    extend: "view",
    className: "o404o",
    template: module.getTemplate("@template", "404"),
    init: function () {
        this.render();
    }
});
Module({
    name: "linker",
    extend: "view",
    find_link: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: $(this).attr("href")
            });
        });
    }
});
Module({
    name: "test",
    extend: "view",
    template: module.getTemplate("@template", "test"),
    init: function () {
        this.render();
    },
    bind_link: function (dom, e) {
        this.dispatchEvent("openPage", {url: dom.attr("href"), title: "test"});
        e.preventDefault();
    }
});
Module({
    name: "test2",
    extend: "view",
    template: module.getTemplate("@template", "test2"),
    init: function () {
        this.render();
    },
    bind_link: function (dom, e) {
        this.dispatchEvent("openPage", {url: dom.attr("href"), title: "test2"});
        e.preventDefault();
    }
});
Module({
    name: "tab",
    extend: "view",
    onbeforeinit: function () {
        this.titles = [];
        this.current = 0;
    },
    find_title: function (dom) {
        this.titles.push(dom);
    },
    find_container: function (dom) {
        this.container = dom;
        this._xis = 0;
        var ths = this;
        dom.touch(function (e) {
            if (e.action === "down") {
                ths._xis = $(this).transition().removeAll().scope().transform().x();
            } else if (e.action === "move") {
                if (e.direction === "left" || e.direction === "right") {
                    var a = ths._xis + e.offsetX;
                    $(this).transform().x(a);
                    e.preventDefault();
                }
            } else {
                var v = Math.abs(e.offsetX / e.timeLast);
                if (v > 0.8) {
                    if (e.odirection === "left") {
                        ths.nextPage();
                    } else if (e.odirection === "right") {
                        ths.prevPage();
                    }
                } else {
                    if (Math.abs(e.offsetX) > $(window).width() / 2) {
                        if (e.odirection === "left") {
                            ths.nextPage();
                        } else if (e.odirection === "right") {
                            ths.prevPage();
                        }
                    } else {
                        ths.gotoPage(ths.current);
                    }
                }
            }
        });
    },
    gotoPage: function (num) {
        num = num / 1;
        if (num >= 0 && num < this.titles.length) {
        } else {
            num = this.current;
        }
        this.current = num;
        for (var i = 0; i < this.titles.length; i++) {
            if (i === num) {
                this.titles[i].addClass("hover");
            } else {
                this.titles[i].removeClass("hover");
            }
        }
        var c = -(num) * $(window).width();
//        this.container.transition().set("-all-transform").scope().transform().x(-num * 100 / this.titles.length + "%");
        this.container.transition().set("-all-transform").scope().transform().x(c);
    },
    nextPage: function () {
        var a = this.current + 1;
        this.gotoPage(a);
    },
    prevPage: function () {
        var a = this.current - 1;
        this.gotoPage(a);
    }
});
Module({
    name: "pictab",
    className: "pictab",
    extend: "@.tab",
    option: {
        tabs: [
            {pic: "", url: ""}
        ]
    },
    template: module.getTemplate("@template", "pictab"),
    init: function () {
        this.render(this.option.tabs);
        this.titles[0].addClass("hover");
    },
    rerender: function () {
        this.render(this.option.tabs);
        this.titles[0].addClass("hover");
    }
});
Module({
    name: "btntab",
    className: "btntab",
    extend: "@.tab",
    option: {
        tabs: [
            {title: "", cotent: ""}
        ]
    },
    template: module.getTemplate("@template", "btntab"),
    init: function () {
        this.render(this.option.tabs);
        this.titles[0].addClass("hover");
    },
    find_title: function (dom) {
        var ths = this;
        this.titles.push(dom);
        dom.button(function () {
            ths.gotoPage(dom.attr("num") || 0);
        });
    }
});
Module({
    name: "toast",
    extend: "view",
    className: "toast",
    option: {
        text: "test"
    },
    init: function () {
        $("<div class='toast_text'>" + this.option.text + "</div>").appendTo(this.dom).transition().set("-all-transform").done(function () {
            this.transition().removeAll().set("opacity", {time: 1000}).delay(2000).then(function () {
                this.css("opacity", 0);
            }).delay(1000).done(function () {
                this.parent().remove();
            }).resolve();
        }).scope().transform().y(-150);
    }
});
Module({
    name: "messagebox",
    extend: "view",
    className: "messagebox",
    option: {
        title: "messagebox",
        content: "this is a messagebox",
        btns: [
            {name: "close", action: "close"}
        ]
    },
    template: module.getTemplate("template", "messagebox"),
    init: function () {
        this.render(this.option);
    },
    find_btn: function (dom) {
        var ths = this;
        dom.button(function (e) {
            ths.dispatchEvent($(this).attr("action"), {
                btn: $(this)
            });
            e.stopPropagation();
        });
    },
    event_messagebox_close: function (e) {
        this.close();
        e.stopPropagation();
    },
    close: function () {
        this.remove();
    },
    event_close: function (e) {
        this.close();
        e.stopPropagation();
    }
});
Module({
    name: "bottombar",
    extend: "view",
    className: "bottombar",
    option: {
        btns: [
            {name: "首页", icon: "fa fa-home", url: "", title: ""}
        ]
    },
    template: module.getTemplate("@template", "bottombar"),
    init: function () {
        this.btns = [];
        this.render(this.option.btns);
    },
    find_btn: function (dom) {
        var ths = this;
        this.btns.push(dom);
        dom.button(function (e) {
            var info = ths.option.btns[$(this).attr("num")];
            ths.dispatchEvent("openPage", info);
            e.preventDefault();
        });
    },
    find_totop: function (dom) {
        dom.button(function () {
            $("body").scrollTop(0);
        });
    },
    changeState: function (e) {
        for (var i = 0; i < this.btns.length; i++) {
            var a = this.option.btns[i].url;
            if (a[a.length - 1] !== "/") {
                a = a + "/";
            }
            if (a === e) {
                this.btns[i].addClass("hover");
            } else {
                this.btns[i].removeClass("hover");
            }
        }
    },
    event_urlchange: function (e) {
        this.changeState(e.data);
    },
    nofixed: function () {
        this.dom.find(".bottombar-btns").css("position", "static");
        this.dom.find(".bottombar-totop").hide();
    }
});
Module({
    name: "topbar",
    extend: "view",
    className: "topbar",
    option: {
        leftbtns: [
            {action: "back", icon: "fa fa-angle-left"}
        ],
        rightbtns: [],
        title: "title"
    },
    template: module.getTemplate("@template", "topbar"),
    init: function () {
        var ths = this;
        this.render(this.option);
        $("body").touch(function (e) {
            if (ths.dom.parent().height() > $("body").height()) {
                if (e.action === "move") {
                    if (e.odirection === "top") {
                        ths.hide();
                    } else if (e.odirection === "bottom") {
                        ths.show();
                    }
                }
            }
        });
    },
    find_btn: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent($(this).attr("action"));
        });
    },
    onunload: function () {
        $("body").untouch();
    },
    hide: function () {
        this.dom.children(1).addClass("hide");
    },
    show: function () {
        this.dom.children(1).removeClass("hide");
    },
    event_back: function (e) {
        window.history.back();
        e.stopPropagation();
    },
    nofixed: function () {
        this.dom.find(".topbar-fixed").css("position", "static");
    }
});
Module({
    name: "statictopbar",
    extend: "@.topbar",
    init: function () {
        this.render(this.option);
    }
});
Module({
    name: "datalist",
    extend: "view",
    className: "datalist",
    option: {
        url: "data/datalist.json",
        template: module.getTemplate("@template", "datalisttest"),
        pageName: "page",
        pageSizeName: "pageSize",
        pageSize: 10,
        autoLoad: true
    },
    template: module.getTemplate("@template", "datalist"),
    init: function () {
        this.current = -1;
        this.data = {};
        this.render();
        if (this.option.autoLoad) {
            this.getData();
        }
    },
    find_container: function (dom) {
        this.container = dom;
    },
    find_loading: function (dom) {
        this.loading = dom;
    },
    find_toload: function (dom) {
        var ths = this;
        this.toload = dom;
        dom.button(function () {
            ths.getData();
        });
    },
    find_footer: function (dom) {
        this.footer = dom;
    },
    find_nodata: function (dom) {
        this.nodata = dom;
    },
    find_item: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: $(this).attr("href")
            });
        });
    },
    showLoading: function () {
        this.loading.show();
        this.toload.hide();
    },
    hideLoading: function () {
        this.loading.hide();
        this.toload.show();
    },
    getData: function () {
        this.showLoading();
        this.nodata.hide();
        this.current = this.current + 1;
        var data = {};
        data[this.option.pageName] = this.current;
        data[this.option.pageSizeName] = this.option.pageSize;
        this.postData({
            url: this.option.url,
            data: $.extend(this.data, data),
            back: function (data) {
                this.setList(data);
                this.hideLoading();
            }
        });
    },
    setParameter: function (data) {
        this.data = data;
    },
    setList: function (data) {
        if (data.length > 0) {
            this.nodata.hide();
            this.container.append($.template(this.option.template).render(data));
            this.delegateAll();
        } else {
            if (this.container.children().length > 0) {
                this.footer.hide();
            } else {
                this.nodata.show();
                this.footer.hide();
                this.dispatchEvent("nodata");
            }
        }
    },
    refresh: function () {
        this.current = 0;
        this.container.empty();
        this.getData();
    }
});
Module({
    name: "datalist-twocol",
    extend: "@.datalist",
    onbeforeinit: function () {
        this.option.template = module.getTemplate("@template", "datalist-twocol");
    },
    init: function () {
        this.current = -1;
        this.data = {};
        this.render();
        this.getData();
    }
});
Module({
    name: "datalist-comment",
    extend: "@.datalist",
    onbeforeinit: function () {
        this.option.template = module.getTemplate("@template", "datalist-comment");
    },
    init: function () {
        this.current = -1;
        this.data = {};
        this.render();
        this.getData();
    }
});
Module({
    name: "datalist-orderlist",
    extend: "@.datalist",
    onbeforeinit: function () {
        this.option.template = module.getTemplate("@template", "datalist-orderlist");
    },
    init: function () {
        this.current = -1;
        this.data = {};
        this.render();
        this.getData();
    }
});
Module({
    name: "datalist-shoppingcar",
    extend: "@.datalist",
    onbeforeinit: function () {
        this.option.template = module.getTemplate("@template", "datalist-shoppingcar");
    },
    init: function () {
        this.current = -1;
        this.data = {};
        this.checks = [];
        this.render();
        this.getData();
    },
    find_minus: function (dom) {
        dom.button(function () {
            var current = $(this).next().html() / 1;
            var a = current - 1;
            if (a < 1) {
                a = 1;
            }
            $(this).next().html(a);
        });
    },
    find_plus: function (dom) {
        dom.button(function () {
            var current = $(this).prev().html() / 1;
            $(this).prev().html(current + 1);
        });
    },
    find_check: function (dom) {
        this.checks.push(dom);
        dom.button(function () {
            $(this).toggleClass("check");
        });
    },
    checkAll: function () {
        for (var i in this.checks) {
            this.checks[i].addClass("check");
        }
    },
    unCheckAll: function () {
        for (var i in this.checks) {
            this.checks[i].removeClass("check");
        }
    }
});
Module({
    name: "datalist-addresslist",
    extend: "@.datalist",
    onbeforeinit: function () {
        this.option.template = module.getTemplate("@template", "datalist-addresslist");
    },
    init: function () {
        this.current = -1;
        this.data = {};
        this.render();
        this.getData();
    }
});
Module({
    name: "datalist-favourable",
    extend: "@.datalist",
    onbeforeinit: function () {
        this.option.template = module.getTemplate("@template", "datalist-favourable");
    },
    init: function () {
        this.current = -1;
        this.data = {};
        this.render();
        this.getData();
    }
});
Module({
    name: "datalist-integraldetail",
    extend: "@.datalist",
    onbeforeinit: function () {
        this.option.template = module.getTemplate("@template", "datalist-integraldetail");
    },
    init: function () {
        this.current = -1;
        this.data = {};
        this.render();
        this.getData();
    }
});
Module({
    name: "datalist-message",
    extend: "@.datalist",
    onbeforeinit: function () {
        this.option.template = module.getTemplate("@template", "datalist-message");
    },
    init: function () {
        this.current = -1;
        this.data = {};
        this.render();
        this.getData();
    }
});
Module({
    name: "searchbar",
    extend: "viewgroup",
    className: "searchbar",
    layout: module.getTemplate("@template", "searchbar"),
    option: {
        url: "test/page2",
        inputName: "query",
        parameter: {},
        placeholder: "搜索"
    },
    find_search: function (dom) {
        var ths = this;
        dom.button(function () {
            var t = "";
            ths.option.parameter[ths.option.inputName] = ths.dom.find("input").val();
            for (var i in ths.option.parameter) {
                t += i + "=" + ths.option.parameter[i] + "&";
            }
            if (t.length > 0) {
                t = t.substring(0, t.length - 1);
            }
            ths.dispatchEvent("openPage", {
                url: ths.option.url + "?" + t
            });
        });
    },
    setValue: function (val) {
        this.dom.find("input").val(val);
    },
    getValue: function () {
        return this.dom.find("input");
    }
});
Module({
    name: "multisearch",
    extend: "view",
    className: "multisearch",
    template: module.getTemplate("@template", "multisearch"),
    option: {},
    init: function () {
        this.render(this.option);
    },
    find_droplist: function (dom) {
        dom.button(function () {
            $(this).toggleClass("show");
        });
    },
    find_btn: function (dom) {
        dom.button(function () {
            $(this).toggleClass("upper");
        });
    },
    find_filter: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dom.toggleClass("filter");
        });
    },
    find_selectsort: function (dom) {
        dom.button(function () {
            if (!$(this).hasClass("hover")) {
                $(this).parent().children().each(function () {
                    $(this).removeClass("hover");
                });
                $(this).addClass("hover");
            } else {
                $(this).removeClass("hover");
            }
        });
    },
    find_selectend: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dom.removeClass("filter");
            ths.dispatchEvent("selectend");
        });
    },
    getValue: function () {
        var data = {};
        this.dom.find(".multisearch-query").each(function () {
            data[$(this).attr("key")] = $(this).hasClass("upper");
        });
        this.dom.find(".multisearch-filter-item-select").each(function () {
            var has = "";
            $(this).children().each(function () {
                if ($(this).hasClass("hover")) {
                    has = $(this).attr("value");
                }
            });
            data[$(this).attr("key")] = has;
        });
        return data;
    }
});
Module({
    name: "login",
    className: "login",
    extend: "viewgroup",
    layout: module.getTemplate("@template", "login"),
    option: {
        formType: "@form.listform",
        action: "",
        fields: [
            {type: "@form.text", name: "username", label: "username", required: true},
            {type: "@form.text", name: "password", label: "password", required: true}
        ]
    },
    onbeforeinit: function () {
        this.option[this.option.formType] = {
            action: this.option.action,
            fields: this.option.fields
        };
    },
    init: function () {
//        var a = window.localStorage.getItem("login");
//        if (a) {
//            var b = a.split(":");
//            this.getFirstChild().setValues({
//                username: b[0] || "",
//                password: b[1] || ""
//            }).submit();
//        }
        var ths = this;
        var st = function () {
            ths.setLogo();
        };
        $(window).bind("resize", st);
        this.onunload = function () {
            $(window).unbind("resize", st);
        };
        this.setLogo();
    },
    setLogo: function () {
        this.dom.find(".login-head").height(this.dom.find(".login-form-con").offset().top - 50);
    },
    find_login: function (dom) {
        var ths = this;
        dom.button(function (e) {
            var c = ths.getFirstChild();
            var d = c.getValues();
            window.localStorage.setItem("login", d.username + ":" + d.password);
            c.submit();
        });
    },
    find_footer: function (dom) {
        this.footer = dom;
    },
    find_regist: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: "regist"
            });
        });
    },
    event_formsuccess: function (e) {
        $.global.userInfo = e.data.info;
        window.localStorage.setItem("userinfo", window.JSON.stringify(e.data.info));
        this.dispatchEvent("loginend");
    }
});
Module({
    name: "iconmapping",
    extend: "view",
    className: "iconmapping",
    template: module.getTemplate("@template", "iconmapping"),
    option: {
        mapping: [
            {name: "xxx1", icon: module.folder + 'style/images/icons/icon-1.png', url: "", title: ""},
            {name: "xxx2", icon: module.folder + 'style/images/icons/icon-2.png', url: "", title: ""},
            {name: "xxx3", icon: module.folder + 'style/images/icons/icon-3.png', url: "", title: ""},
            {name: "xxx4", icon: module.folder + 'style/images/icons/icon-4.png', url: "", title: ""},
            {name: "xxx5", icon: module.folder + 'style/images/icons/icon-5.png', url: "", title: ""},
            {name: "xxx6", icon: module.folder + 'style/images/icons/icon-6.png', url: "", title: ""},
            {name: "xxx7", icon: module.folder + 'style/images/icons/icon-7.png', url: "", title: ""},
            {name: "xxx8", icon: module.folder + 'style/images/icons/icon-8.png', url: "", title: ""}
        ]
    },
    init: function () {
        this.render(this.option.mapping);
    },
    find_btn: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: $(this).attr("href")
            });
        });
    }
});
Module({
    name: "wrapline",
    extend: "view",
    className: "wrapline",
    option: {
        title: "wrapline"
    },
    template: module.getTemplate("@template", "wrapline"),
    init: function () {
        this.render(this.option.title);
    }
});
Module({
    name: "wraptitle",
    extend: "view",
    className: "wraptitle",
    option: {
        title: "wraptitle"
    },
    template: module.getTemplate("@template", "wraptitle"),
    init: function () {
        this.render(this.option.title);
    }
});
Module({
    name: "header",
    extend: "view",
    className: "header",
    template: module.getTemplate("@template", "header"),
    option: {
        title: "title"
    },
    init: function () {
        this.render(this.option);
    }
});
Module({
    name: "regist",
    extend: "viewgroup",
    className: "regist",
    layout: module.getTemplate("@template", "regist"),
    option: {
        formType: "@form.martform",
        form: {}
    },
    onbeforeinit: function () {
        this.option[this.option.formType] = this.option.form;
    },
    find_submit: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.getFirstChild().submit();
        });
    }
});
Module({
    name: "singlestatebar",
    extend: "view",
    className: "singlestatebar",
    template: module.getTemplate("@template", "singlestatebar"),
    option: {
        state: [
            {name: "全部", value: ""},
            {name: "好评", value: ""},
            {name: "中评", value: ""},
            {name: "差评", value: ""},
            {name: "追加", value: ""}
        ]
    },
    init: function () {
        this.btns = [];
        this.render(this.option.state);
        this.btns[0].button();
    },
    find_btn: function (dom) {
        this.btns.push(dom);
        var ths = this;
        dom.button(function () {
            for (var i in ths.btns) {
                ths.btns[i].removeClass("hover");
            }
            $(this).addClass("hover");
            ths.dispatchEvent("statechange", ths.option.state[$(this).attr("num")]);
        });
    }
});
Module({
    name: "sortmapping",
    extend: "view",
    className: "sortmapping",
    template: module.getTemplate("@template", "sortmapping"),
    option: {
        mapping: [
            {name: "", url: ""}
        ]
    },
    init: function () {
        this.render(this.option.mapping);
    }
});

Module({
    name: "temai",
    extend: "view",
    className: "temai",
    template: module.getTemplate("@template", "temai"),
    option: {
        url: basePath + "mart/temai.json"
    },
    init: function () {
        this.postData({
            url: this.option.url,
            back: function (data) {
                this.render(data);
            }
        });
    }
});
Module({
    name: "goodsboard",
    extend: "view",
    className: "goodsboard",
    template: module.getTemplate("@template", "goodsboardone"),
    option: {
        goods: [
            {img: "", url: ""}
        ]
    },
    init: function () {
        this.render(this.option.goods);
    }
});
Module({
    name: "goodsboard2",
    extend: "@.goodsboard",
    template: module.getTemplate("@template", "goodsboardtwo")
});
Module({
    name: "goodsdetail",
    extend: "view",
    className: "goodsdetail",
    template: module.getTemplate("@template", "goodsdetail"),
    option: {},
    init: function () {
        this.render();
    },
    setValue: function (data) {
        this.render(data);
    },
    find_goodsdetail: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: "goodsdetail"
            });
        });
    },
    find_goodscomment: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: "comment"
            });
        });
    }
});
Module({
    name: "commentprogress",
    extend: "view",
    className: "commentprogress",
    template: module.getTemplate("@template", "commentprogress"),
    option: {},
    init: function () {
        this.render();
    },
    setValue: function (data) {
        this.render(data);
    }
});
Module({
    name: "goodsdetailcontent",
    extend: "@.btntab",
    option: {
        tabs: [
            {title: "商品介绍"},
            {title: "规格参数"},
            {title: "包装售后"}
        ]
    },
    template: module.getTemplate("@template", "goodsdetailcontent"),
    init: function () {
        this.render(this.option.tabs);
        this.titles[0].addClass("hover");
    }
});
Module({
    name: "userheader",
    extend: "view",
    className: "userheader",
    template: module.getTemplate("@template", "userheader"),
    init: function () {
        this.render();
    },
    setValue: function (data) {
        this.render(data);
    }
});
Module({
    name: "orderdetail",
    extend: "@.linker",
    className: "orderdetail",
    template: module.getTemplate("@template", "orderdetail"),
    init: function () {
    },
    setValue: function (data) {
        this.render(data);
    }
});
Module({
    name: "worderdetail",
    extend: "@.linker",
    className: "orderdetail",
    template: module.getTemplate("@template", "worderdetail"),
    init: function () {
    },
    setValue: function (data) {
        this.render(data);
    },
    find_contact: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: "addresslist"
            });
        });
    }
});


Module({
    name: "shoppingcarbtn",
    extend: "view",
    className: "shoppingcarbtn",
    template: module.getTemplate("@template", "shoppingcarbtn"),
    init: function () {
        this.render();
    },
    find_pay: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: "worderdetail"
            });
        });
    }
});
Module({
    name: "addaddressbtn",
    extend: "view",
    className: "addaddressbtn",
    template: module.getTemplate("@template", "addaddressbtn"),
    init: function () {
        this.render();
    }
});
Module({
    name: "favourablebtn",
    extend: "view",
    className: "favourablebtn",
    template: module.getTemplate("@template", "favourablebtn"),
    init: function () {
        this.render();
    }
});
Module({
    name: "integral",
    extend: "view",
    className: "integral",
    template: module.getTemplate("@template", "integral"),
    init: function () {
        this.render();
    },
    setValue: function (data) {
        this.render(data);
    },
    find_detail: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: "integraldetail"
            });
        });
    }
});
Module({
    name: "userinfo",
    extend: "view",
    className: "userinfo",
    template: module.getTemplate("@template", "userinfo"),
    init: function () {
        this.render();
    },
    setValue: function (data) {
        this.render(data);
    },
    find_editpassword: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: "password"
            });
        });
    },
    find_address: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.dispatchEvent("openPage", {
                url: "addresslist"
            });
        });
    }
});
Module({
    name: "password",
    extend: "viewgroup",
    className: "password",
    layout: module.getTemplate("@template", "password"),
    option: {
        formType: "@form.martform",
        "@form.martform": {
            fields: [
                {type: "@form.text", label: "原密码"},
                {type: "@form.text", label: "新密码"},
                {type: "@form.text", label: "新密码"}
            ]
        }
    },
    init: function () {
    }
});
Module({
    name: "editaddress",
    extend: "viewgroup",
    className: "editaddress",
    layout: module.getTemplate("@template", "editaddress"),
    option: {
        formType: "@form.martform",
        "@form.martform": {
            fields: [
                {type: "@form.text", label: "用户名"},
                {type: "@form.text", label: "电话"},
                {type: "@form.select", label: "省"},
                {type: "@form.select", label: "市"},
                {type: "@form.select", label: "区"},
                {type: "@form.text", label: "详细地址"}
            ]
        }
    }
});
Module({
    name: "bill",
    extend: "view",
    className: "bill",
    template: module.getTemplate("@template", "bill"),
    init: function () {
        this.render();
    },
    setValue: function (data) {
        this.render(data);
    }
});
Module({
    name: "express",
    extend: "view",
    className: "express",
    template: module.getTemplate("@template", "express"),
    setValue: function (data) {
        this.render(data);
    }
});