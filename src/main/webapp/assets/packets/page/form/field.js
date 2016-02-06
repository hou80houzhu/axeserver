/*!
 * @packet page.form.field;
 * @require page.form.base; 
 * @require page.util.file;
 * @require page.form.tree;
 * @include page.form.form;
 * @css page.style.style;
 * @dom page.form.template;
 */
Module({
    name: "text",
    extend: "@base.field",
    option: {
        label: "text-label",
        isflex: false,
        isblock: true,
        inputType: "text", //text|textarea|password
        reg: "any",
        max: 2000,
        min: 0,
        disabled: false,
        desc: "",
        hook: null
    },
    template: domstr("@template", "text"),
    init: function (option) {
        this.value = option.value;
        this.render(option);
        if (option.isflex) {
            this.dom.addClass("flex").width("100%");
        }
    },
    find_input: function (dom) {
        this.input = dom;
    },
    bind_keyup: function (dom) {
        this.value = dom.val();
        this.check();
    },
    reg: {
        email: [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "请输入正确的email地址"],
        number: [/^[0-9]*$/, "请输入数字"],
        int: [/^\+?[1-9][0-9]*$/, "非零正整数"],
        unint: [/^\-[1-9][0-9]*$/, "非零负整数"],
        intwith: [/^\d+$/, "正整数 + 0"],
        unintwith: [/^((-\d+)|(0+))$/, "负整数 + 0"],
        en: [/^[A-Za-z]+$/, "26个英文字母组成的字符串"],
        enupper: [/^[A-Z]+$/, "26个大写英文字母组成的字符串"],
        enlower: [/^[a-z]+$/, "26个小写英文字母组成的字符串"],
        words: [/^[A-Za-z0-9]+$/, "数字和26个英文字母组成的字符串"],
        simplewords: [/^\w+$/, "数字、26个英文字母或者下划线"],
        username: [/^[\一\?-Za-z0-9-_]*$/, "中英文，数字，下划线，减号"],
        password: [/^[a-zA-Z]\w{5,17}$/, "以字母开头，长度在6-18之间，只能包含字符、数字和下划线"],
        nospecial: [/^([\u4e00-\u9fa5-a-zA-Z0-9]+)$/, "不能输入特殊字符！"],
        any: [/^.*$/, ""]
    },
    showTip: function (mes) {
    },
    hideTip: function () {
    },
    check: function () {
        var result = false;
        if (!this.customCheck) {
            result = this.checkLength();
            if (!result) {
                this.showTip("长度应该大于" + this.option.min + "小于" + this.option.max);
                return false;
            } else {
                this.hideTip();
            }
            result = this.checkRegular();
            if (!result) {
                this.showTip(this.reg[this.option.reg][1] || "格式不正确");
                return false;
            } else {
                this.hideTip();
            }
            result = this.checkRequired();
            if (!result) {
                this.showTip("必填选项");
                return false;
            } else {
                this.hideTip();
            }
            return true;
        } else {
            return this.customCheck.call(this);
        }
    },
    checkDefault: function () {
        result = this.checkLength();
        if (!result) {
            this.showTip("长度应该大于" + this.option.min + "小于" + this.option.max);
            return false;
        }
        result = this.checkRegular();
        if (!result) {
            this.showTip(this.reg[this.option.reg][1] || "格式不正确");
            return false;
        }
        result = this.checkRequired();
        if (!result) {
            this.showTip("必填选项");
            return false;
        }
        return true;
    },
    checkRequired: function () {
        var value = this.value;
        if (this.option.required) {
            if (value.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    },
    checkRemote: function (url, paraName) {
        var data = {}, result = false;
        data[paraName] = this.value;
        $.ajax({
            url: url,
            data: data,
            dataType: "json",
            asysn: false,
            success: function (e) {
                if (e.code === "1") {
                    result = true;
                } else {
                    result = false;
                }
            },
            error: function () {
                result = false;
            }
        });
        return result;
    },
    checkLength: function (a, b) {
        var value = this.value;
        if (arguments.length === 0) {
            return value.length >= this.option.min && value.length <= this.option.max;
        } else if (arguments.length === 2) {
            return value.length >= a && value.length <= b;
        } else {
            return false;
        }
    },
    checkRegular: function (reg) {
        var value = this.value;
        if (arguments.length === 0) {
            reg = this.option.reg;
        }
        if ($.is.isString(reg)) {
            var regx = this.reg[reg][0];
            if (regx) {
                return regx.test(value);
            } else {
                return false;
            }
        } else if (reg instanceof RegExp) {
            return reg.test(value);
        } else {
            return false;
        }
    },
    setValue: function (a) {
        if (this.option.hook) {
            this.value = this.option.hook(a);
            this.input.val(this.value);
        } else {
            this.value = a;
            this.input.val(a);
        }
    },
    getValue: function () {
        return {
            name: this.option.name,
            value: this.value
        };
    },
    disable: function (isdisable) {
        if (isdisable) {
            this.input.get(0).disabled = true;
        } else {
            this.input.get(0).disabled = false;
        }
        return this;
    },
    reset: function () {
        this.wrap.removeClass("error");
        this.setValue(this.value);
    }
});
Module({
    name: "select",
    extend: "@base.field",
    option: {
        name: "",
        url: "",
        label: "",
        paraname: "",
        isload: false,
        next: "",
        defaults: [],
        remoteData: []
    },
    template: domstr("@template", "select"),
    init: function (option) {
        this.value = this.option.value;
        this.render(option);
        if (option.url && option.url !== "") {
            this.loadData();
        }
    },
    bind_select: function (dom) {
        this.value = dom.val();
        this.dispatchEvent("selectchange", {
            value: this.value,
            next: this.option.next
        });
    },
    loadData: function (para) {
        var par = {}, ths = this;
        par[this.option.paraname] = para;
        this.postData({
            url: this.option.url,
            data: par,
            back: function (data) {
                ths.option.remoteData = data;
                ths.render(ths.option);
                ths.dispatchEvent("selectchange", {
                    value: ths.value,
                    next: ths.option.next
                });
            }
        });
    },
    getValue: function () {
        return {
            name: this.option.name,
            value: this.value
        };
    },
    setValue: function (val) {
        this.value = val;
        this.option.value = val;
        this.dom.find("select").children().each(function () {
            if ($(this).attr("value") === val + "") {
                $(this).get(0).selected = "selected";
                return false;
            }
        });
    },
    reset: function () {
        this.render(this.option);
    }
});
Module({
    name: "radiogroup",
    extend: "@base.field",
    option: {
        label: "radio",
        radios: [
            {key: "xxxx", value: "xx"}
        ]
    },
    template: domstr("@template", "radiogroup"),
    init: function (option) {
        this.render(option);
        this.value = this.option.value;
        if (option.value === "") {
            this.dom.find("input[type='radio']").get(0).checked = true;
        }
    },
    getValue: function () {
        var k = null;
        this.dom.find("input").each(function () {
            if ($(this).get(0).checked) {
                k = $(this).attr("value");
                return false;
            }
        });
        return {
            name: this.option.name,
            value: k
        };
    },
    setValue: function (a) {
        this.value = a;
        this.dom.find("input").each(function () {
            if ($(this).attr("value") === a + "") {
                $(this).get(0).checked = true;
            } else {
                $(this).get(0).checked = false;
            }
        });
    },
    reset: function () {
        var a = this.value;
        if (a === null || a + "" === "") {
            this.dom.find("input").get(0).checked = true;
        } else {

            this.dom.find("input").each(function () {
                if ($(this).attr("value") === a + "") {
                    $(this).get(0).checked = true;
                } else {
                    $(this).get(0).checked = false;
                }
            });

        }
    }
});
Module({
    name: "checkboxgroup",
    extend: "@base.field",
    option: {
        label: "checkboxgroup",
        checkboxs: [
            {key: "xxxx", value: "xx"}
        ]
    },
    template: domstr("@template", "checkboxgroup"),
    init: function (option) {
        this.render(option);
        if (this.option.value !== "") {
            var values = this.option.value.split(",");
            for (var i in values) {
                var k = this.dom.find("input[value='" + values[i] + "']");
                if (k.length > 0) {
                    k.get(0).checked = true;
                }
            }
        }
    },
    getValue: function () {
        var val = "";
        this.dom.find("input[type='checkbox']").each(function () {
            if ($(this).get(0).checked) {
                val += $(this).attr("value") + ",";
            }
        });
        if (val.length > 0) {
            val = val.substring(0, val.length - 1);
        }
        return {
            name: this.option.name,
            value: val
        };
    },
    setValue: function (a) {
        this.value = a;
        var values = a.split(",");
        for (var i in values) {
            var k = this.dom.find("input[value='" + values[i] + "']");
            if (k.length > 0) {
                k.get(0).checked = true;
            }
        }
        return this;
    },
    reset: function () {
        var a = this.value;
        var values = a.split(",");
        for (var i in values) {
            var k = this.dom.find("input[value='" + values[i] + "']");
            if (k.length > 0) {
                k.get(0).checked = true;
            }
        }
    }
});
Module({
    name: "timmerfield",
    extend: "@base.asysfield",
    template: "<div>timmer</div>",
    init: function () {
        this.render();
    },
    asys: function (fn) {
        console.log("==========>>>>>000");
        var k = {
            name: this.getFieldName(),
            value: "111"
        };
        setTimeout(function () {
            fn && fn(k);
        }, 3000);
    }
});
Module({
    name: "imageupload",
    className: "imageupload",
    extend: "@base.asysfield",
    option: {
        url: ""
    },
    template: domstr("@template", "imageupload"),
    init: function () {
        this._file = null;
        this.render();
    },
    bind_input: function (dom, e) {
        var ths = this;
        var file = e.target.files || e.dataTransfer.files;
        this._file = require("@file").set(file[0]);
        this._file.getImage(function () {
            ths.dom.children(0).html("").append(this);
        });
    },
    asys: function (fn) {
        var ths = this;
        this.dom.addClass("hover");
        this._file.upload({
            url: "upload.php",
            name: "file",
            asysn: true,
            out: 6000000,
            progress: function (e) {
                ths.dom.find(".loadingbar-color").width(e.percent + "%");
            },
            error: function () {
            },
            success: function (data) {
                ths.dom.removeClass("hover");
                fn && fn({
                    name: ths.getFieldName(),
                    value: data.data
                });
            }
        });
    }
});

Module({
    name: "treeform",
    extend: "@base.fieldgroup",
    className: "treeform",
    layout: "<div class='label-block'><%=data.option.label;%></div>" +
            "<div class='treeform-con'>" +
            "<div class='treeis'><%=module('@tree.treelite');%></div>" +
            "<div class='tableiscon'>" +
            "<div class='tableis'></div>" +
            "<div class='pbtns'><div class='pbtn' data-btn='checkbtn'><i class='fa fa-check'></i></div></div>" +
            "</div>" +
            "</div>",
    option: {
    },
    init: function () {
    },
    setValue: function (data) {
        if (!data || data === "") {
            data = {name: "ROOT", id: "root", list: []};
        }
        this.getFirstChild().setValue(data).firstClick();
    },
    getValue: function () {
        var str = window.JSON.stringify(this.getFirstChild().getValue());
        return {
            name: this.option.name,
            value: str
        };
    },
    btn_checkbtn: function () {
        var ths = this;
        this.getLastChild().getValues().done(function (data) {
            if (data) {
                var p = $.extend({}, ths.getLastChild().parameters, data);
                if (!p.id) {
                    p.id = ths.getUUID();
                }
                if (!p.name) {
                    p.name = ths.getUUID();
                }
                if (ths.getLastChild().parameters) {
                    ths.getFirstChild().editNode(p);
                } else {
                    ths.getFirstChild().addNode(p);
                }
            }
        });
    },
    event_treelite_click: function (e) {
        var t = this.getChildrenByType("@form.listform");
        for (var i in t) {
            t[i].remove();
        }
        this.addChild({
            type: "@form.listform",
            option: {
                fields: this.option.fields
            },
            parameters: e.data.data,
            container: this.dom.find(".tableis")
        });
    },
    event_treelite_add: function () {
        var t = this.getChildrenByType("@form.listform");
        for (var i in t) {
            t[i].remove();
        }
        this.addChild({
            type: "@form.listform",
            option: {
                fields: this.option.fields
            },
            container: this.dom.find(".tableis")
        });
    },
    event_treelite_remove: function (e) {
        if (e.data.level !== "2") {
            this.getFirstChild().removeNode();
        }
    }
});

Module({
    name: "pagelist",
    extend: "@.select",
    init: function (option) {
        this.option.url = basePath + "contenter/getallpagemapping";
        this.value = this.option.value;
        this.render(option);
        if (option.url && option.url !== "") {
            this.loadData();
        }
    }
});

Module({
    name: "imagesuploader",
    extend: "@base.asysfield",
    className: "imagesuploader",
    option: {
        url: basePath+"contenter/upload",
        deleteurl: "data/dataok.json",
        editurl: "data/images.json",
        filename: "file",
        title: "图片上传"
    },
    template: "<div class='imagesupload-title'><%=data.title;%></div>" +
            "<div class='imagesuploader-container'>" +
            "<div class='imagesuploader-filebtnplus'><div class='imagesuploader-addicon'></div><input type='file' multiple='multiple' data-bind='change:file' accept='.png,.gif,.jpg,.jpeg'/></div>" +
            "</div>" +
            "<div class='imagesuploader-tools'>" +
//            "<div class='imagesuploader-btn' data-bind='click:upload'>开始上传</div>" +
            "<div class='imagesuploader-btn'><input type='file' multiple='multiple' data-bind='change:file' accept='.png,.gif,.jpg,.jpeg'/>继续添加</div>" +
            "</div>",
    init: function () {
        this.files = [];
        this.result = [];
        this.uploadresult = [];
        this.render(this.option);
        this.getData();
    },
    bind_file: function (dom, e) {
        var ths = this;
        var file = e.target.files || e.dataTransfer.files;
        for (var m = 0; m < file.length; m++) {
            var _file = require("@file").set(file[m]), has = false;
            for (var i in this.files) {
                if (this.files[i].fileName === _file.fileName()) {
                    has = true;
                    break;
                }
            }
            if (!has) {
                _file.getImage(function (image) {
                    var _w = image.width / image.height * 150;
                    var _x = 0, _y = 0;
                    if (_w <= 150) {
                        _x = (150 - _w) / 2;
                    } else {
                        _h = image.height / image.width * 150;
                        if (_h <= 150) {
                            _y = (150 - _h) / 2;
                        }
                    }
                    var str = "<div class='imagesuploader-image' fid='" + ths.files.length + "'>" +
                            "<div class=''>" +
                            "<img src='" + image.src + "' style='margin-left:" + _x + "px;margin-top:" + _y + "px'>" +
                            "</div>" +
                            "<div class='imageuploader-remove' data-bind='click:remove'></div>" +
                            "<div class='imageuploader-progress'></div>" +
                            "</div>";
                    var p = $(str).insertBefore(ths.dom.find(".imagesuploader-container").children(0));
                    this._dom = p;
                    ths.delegateEvent();
                });
                this.files.push(_file);
            }
        }
    },
    bind_remove: function (dom) {
        var mid = dom.parent().attr("mid");
        if (mid) {
            this.postData({
                url: this.option.deleteurl,
                data: this.result[mid],
                back: function () {
                    dom.parent().remove();
                }
            });
        } else {
            this.files.splice(dom.parent().attr("fid"), 1);
            dom.parent().remove();
        }
    },
    bind_upload: function (fnn) {
        var ths = this;
        for (var i in this.files) {
            this.files[i].upload({
                url: this.option.url,
                name: this.option.filename,
                start: function () {
                    this._dom.find(".imageuploader-remove").hide();
                },
                progress: function (a) {
                    this._dom.find(".imageuploader-progress").width(a.percent + "%");
                },
                success: function (data) {
                    this._dom.find(".imageuploader-progress").width(0);
                    this._dom.find(".imageuploader-remove").show();
                    this._dom.attr("mid", ths.result.length);
                    ths.result.push(data);
                    ths.uploadresult.push(data);
                    for (var i in ths.files) {
                        if (ths.files[i] === this) {
                            ths.files.splice(i, 1);
                        }
                    }
                    console.log(ths.files.length);
                    if (ths.files.length === 0) {
                        fnn && fnn(ths.uploadresult);
                    }
                },
                error: function () {
                }
            });
        }
    },
    getData: function () {
        var ths = this;
        this.postData({
            url: this.option.editurl,
            back: function (data) {
                for (var i in data) {
                    $.loader().image(data[i].url, function () {
                        var image = this;
                        var _w = image.width / image.height * 150;
                        var _x = 0, _y = 0;
                        if (_w <= 150) {
                            _x = (150 - _w) / 2;
                        } else {
                            _h = image.height / image.width * 150;
                            if (_h <= 150) {
                                _y = (150 - _h) / 2;
                            }
                        }
                        var str = "<div class='imagesuploader-image' mid='" + ths.result.length + "'>" +
                                "<div class=''>" +
                                "<img src='" + image.src + "' style='margin-left:" + _x + "px;margin-top:" + _y + "px'>" +
                                "</div>" +
                                "<div class='imageuploader-remove' data-bind='click:remove'></div>" +
                                "<div class='imageuploader-progress'></div>" +
                                "</div>";
                        $(str).insertBefore(ths.dom.find(".imagesuploader-container").children(0));
                        ths.result.push(data[i]);
                        ths.delegateEvent();
                    });
                }
            }
        });
    },
    asys: function (fn) {
        var ths = this;
        this.bind_upload(function (c) {
            console.log("00000000000000000000000000000");
            fn && fn({
                name: ths.getFieldName(),
                value: window.JSON.stringify(c)
            });
        });
    }
});