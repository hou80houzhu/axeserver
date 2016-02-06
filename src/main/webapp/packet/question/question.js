/*!
 * @packet question.question; 
 * @require question.util.touch;
 * @require question.datepicker;
 * @template question.template.question:que;
 * @css question.style.question;
 */
Module({
    name: "base",
    extend: "view",
    getValue: function () {
        return null;
    },
    getCompleteValue: function () {
        return "";
    },
    check: function () {
        return true;
    }
});
Module({
    name: "select",
    extend: "@.base",
    className: "select",
    template: module.getTemplate("@que", "select"),
    option: {
        id: "",
        label: "",
        items: [],
        required: true
    },
    init: function () {
        this.render(this.option);
    },
    find_item: function (dom) {
        var ths = this;
        dom.button(function () {
            ths.finders().each(function () {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
            $(this).find(".divinput").length > 0 && $(this).find(".divinput").get(0).focus();
        });
    },
    getValue: function () {
        var r = null;
        this.finders().each(function () {
            if ($(this).hasClass("active")) {
                r = $(this).cache();
                if ($(this).find(".divinput").length > 0) {
                    r.name = $(this).find(".divinput").html();
                }
                return false;
            }
        });
        return {
            id: this.parameters,
            label: this.option.label,
            value: r || "",
            type: "select"
        };
    },
    getCompleteValue: function () {
        var t = "<ul>";
        for (var i in this.option.items) {
            t += "<li>" + this.option.items[i].name + "</li>";
        }
        t += "</ul>";
        return "<div>[" + this.parameters + "]" + this.option.label + "(" + this.getValue().value.name + ")</div>" + t;
    },
    check: function () {
        if (this.option.required) {
            var r = false;
            this.finders().each(function () {
                if ($(this).hasClass("active")) {
                    if ($(this).find(".divinput").length > 0) {
                        if ($(this).find(".divinput").html() !== "") {
                            r = true;
                        }
                    } else {
                        r = true;
                    }
                    if (r) {
                        return false;
                    }
                }
            });
            if (!r) {
                this.dispatchEvent("scroll", this.dom.get(0).offsetTop);
                $.toast("还有未填写的问题");
            }
            return r;
        } else {
            return true;
        }
    }
});
Module({
    name: "multiselect",
    extend: "@.base",
    className: "select",
    template: module.getTemplate("@que", "selectc"),
    option: {
        id: "",
        label: "",
        items: [],
        required: true
    },
    init: function () {
        this.render(this.option);
    },
    find_item: function (dom) {
        var ths = this;
        dom.button(function () {
            $(this).toggleClass("active");
            $(this).find(".divinput").length > 0 && $(this).find(".divinput").get(0).focus();
        });
    },
    getValue: function () {
        var r = [];
        this.finders().each(function () {
            if ($(this).hasClass("active")) {
                var p = $(this).cache();
                if ($(this).find(".divinput").length > 0) {
                    p.name = $(this).find(".divinput").html();
                }
                r.push(p);
            }
        });
        return {
            id: this.parameters,
            label: this.option.label,
            value: r || "",
            type: "multiselect"
        };
    },
    getCompleteValue: function () {
        var t = this.getValue().value, q = [];
        for (var i in t) {
            q.push(t[i].name);
        }
        var tt = "<ul>";
        for (var i in this.option.items) {
            tt += "<li>" + this.option.items[i].name + "</li>";
        }
        tt += "</ul>";
        return "<div>[" + this.parameters + "]" + this.option.label + "(" + q.join("|") + ")</div>" + tt;
    },
    check: function () {
        if (this.option.required) {
            var r = false;
            this.finders().each(function () {
                if ($(this).hasClass("active")) {
                    if ($(this).find(".divinput").length > 0) {
                        if ($(this).find(".divinput").html() !== "") {
                            r = true;
                        }
                    } else {
                        r = true;
                    }
                    if (r) {
                        return false;
                    }
                }
            });
            if (!r) {
                this.dispatchEvent("scroll", this.dom.get(0).offsetTop);
                $.toast("还有未填写的问题");
            }
            return r;
        } else {
            return true;
        }
    }
});
Module({
    name: "text",
    extend: "@.base",
    className: "text",
    template: module.getTemplate("@que", "text"),
    option: {
        id: "",
        label: "",
        placeholder: "",
        required: false
    },
    init: function () {
        this.render(this.option);
        this.input = this.dom.find("input");
    },
    getValue: function () {
        return {
            id: this.parameters,
            label: this.option.label,
            value: this.input.val() || "",
            type: "text"
        };
    },
    getCompleteValue: function () {
        return "[" + this.parameters + "]" + this.option.label + "(" + this.getValue().value + ")";
    },
    check: function () {
        if (this.option.required) {
            if (this.input.val() !== "") {
                return true;
            } else {
                this.dispatchEvent("scroll", this.dom.get(0).offsetTop);
                $.toast("还有未填写的问题");
                return false;
            }
        } else {
            return true;
        }
    }
});
Module({
    name: "textarea",
    extend: "@.base",
    className: "textarea",
    template: module.getTemplate("@que", "textarea"),
    option: {
        id: "",
        label: "",
        placeholder: "",
        required: false
    },
    init: function () {
        this.render(this.option);
        this.input = this.dom.find(".input");
    },
    getValue: function () {
        return {
            id: this.parameters,
            label: this.option.label,
            value: this.input.html() || "",
            type: "textarea"
        };
    },
    getCompleteValue: function () {
        return "[" + this.parameters + "]" + this.option.label + "(" + this.getValue().value + ")";
    },
    check: function () {
        if (this.option.required) {
            if (this.input.html() !== "") {
                return true;
            } else {
                this.dispatchEvent("scroll", this.dom.get(0).offsetTop);
                $.toast("还有未填写的问题");
                return false;
            }
        } else {
            return true;
        }
    }
});
