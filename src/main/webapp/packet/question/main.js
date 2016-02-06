/*!
 * @packet question.main; 
 * @require question.question;
 * @require question.util.touch;
 * @template question.template.temp;
 * @css question.style.main;
 * @css question.style.style;
 */
Module({
    name: "start",
    extend: "view",
    className: "start",
    option: {
        desc: "this is desc",
        btnName: "Start"
    },
    template: module.getTemplate("@temp", "start"),
    init: function () {
        this.render(this.option);
    },
    find_start: function (dom) {
        dom.button(function () {
            var ths = this;
            this.dom.transition().all().done(function () {
                ths.dispatchEvent("start");
            }).scope().css("opacity", 0);
        }.bind(this));
    }
});
Module({
    name: "end",
    extend: "view",
    className: "end",
    option: {
        desc: "the end"
    },
    template: module.getTemplate("@temp", "end"),
    init: function () {
        this.render(this.option);
    }
});
Module({
    name: "page",
    extend: "viewgroup",
    className: "page",
    layout: module.getTemplate("@temp", "page"),
    option: {
        title: "This is title"
    },
    setTitle: function (title) {
        this.finders("title").html(title);
        return this;
    },
    init: function () {
        this.current = -1;
        this.values=[];
        this.nextPage();
    },
    nextPage: function (fn) {
        this.current++;
        if (this.current >= 0 && this.current < this.parameters.steps.length) {
            if (this.children.length > 0) {
                this.children[0].out(function () {
                    this.finders("container").scrollTop(0);
                    this.addChild({
                        type: "@.steps",
                        container: this.finders("container"),
                        option: this.parameters.steps[this.current]
                    }).done(function (p) {
                        var q = this.parameters.steps[this.current + 1];
                        if (q) {
                            p.setBtnName("确定并继续:" + q.label);
                        } else {
                            p.setBtnName("提交");
                        }
                    });
                }.bind(this));
            } else {
                this.addChild({
                    type: "@.steps",
                    container: this.finders("container"),
                    option: this.parameters.steps[this.current]
                }).done(function (p) {
                    var q = this.parameters.steps[this.current + 1];
                    if (q) {
                        p.setBtnName("确定并继续:" + q.label);
                    } else {
                        p.setBtnName("提交并完成");
                    }
                });
            }
        } else {
            fn && fn();
        }
        return this;
    },
    event_done: function (e) {
        this.values.push(e.data);
        this.nextPage(function () {
            this.dispatchEvent("alldone",this.values);
        }.bind(this));
        e.stopPropagation();
    },
    event_scroll:function(e){
        this.finders("container").scrollingTop(e.data);
        e.stopPropagation();
    }
});

Module({
    name: "steps",
    extend: "viewgroup",
    className: "steps",
    layout: module.getTemplate("@temp", "steps"),
    option: {
        id: "",
        label: "",
        questions: []
    },
    init: function () {
        this.parentView.setTitle(this.option.label);
        for (var i in this.option.questions) {
            this.addChild({
                type: this.option.questions[i].module,
                option: this.option.questions[i].option,
                container: this.finders("questions"),
                parameters:this.option.questions[i].id
            });
        }
    },
    getValue: function () {
        var a = [];
        this.childEach(function (b) {
            a.push(b.getValue());
        });
        return {
            id:this.option.id,
            label: this.option.label,
            values:a
        };
    },
    getCompleteValue: function () {
        var a = [];
        this.childEach(function (b) {
            a.push(b.getCompleteValue());
        });
        return {
            id: this.option.id,
            label: this.option.label,
            value: a
        };
    },
    check: function () {
        var c = true;
        this.childEach(function (a) {
            if (!a.check()) {
                c = false;
                return false;
            }
        });
        return c;
    },
    setBtnName: function (txt) {
        this.finders("next").html(txt);
        return this;
    },
    out: function (fn) {
        this.dom.transition().all().done(function () {
            this.remove();
            fn && fn();
        }.bind(this)).scope().css("opacity", 0);
    },
    find_next: function (dom) {
        dom.button(function () {
            if (this.check()) {
                this.dispatchEvent("done", {
                    value: this.getValue(),
                    complete: this.getCompleteValue()
                });
            }
        }.bind(this));
    }
});

$.loadingbar = function () {
    var a = $("#loadingbar");
    if (a.length === 0) {
        a = $("<div id='loadingbar'>" +
                "<div class='loadingbar-bg'></div>" +
                "<div class='loadingbar-desc'></div></div>").appendTo("body");
    }
    return new loadingbar(a);
};
var loadingbar = function (dom) {
    this.dom = dom;
};
loadingbar.prototype.showLoading = function (text) {
    this.dom.children(1).html("<i class='fa fa-repeat fa-spin'></i> " + (text || 'Loading...'));
    return this;
};
loadingbar.prototype.showError = function (text) {
    var ps = $.promise(), ths = this;
    setTimeout(function () {
        ths.close();
        ps.resolve();
    }, 2000);
    this.dom.children(1).html("<i class='fa fa-circle-cross'></i> " + (text || '操作错误'));
    return ps;
};
loadingbar.prototype.showSuccess = function (text) {
    var ps = $.promise(), ths = this;
    setTimeout(function () {
        ths.close();
        ps.resolve();
    }, 2000);
    this.dom.children(1).html("<i class='fa fa-circle-check'></i> " + (text || '操作成功'));
    return ps;
};
loadingbar.prototype.close = function () {
    this.dom.remove();
};
$.toast = function (text) {
    $("<div class='toast'><div class='toast_text'>" + text + "</div></div>").appendTo("body").transition().set("-all-transform").done(function () {
        this.transition().removeAll().set("opacity", {time: 1000}).delay(2000).then(function () {
            this.css("opacity", 0);
        }).delay(1000).done(function () {
            this.remove();
        }).resolve();
    }).scope().transform().y(-150);
};