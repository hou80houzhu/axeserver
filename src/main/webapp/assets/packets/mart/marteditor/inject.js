/*!
 * @packet mart.marteditor.inject; 
 * @css mart.marteditor.style.inject;
 */
var serialize = function (_obj) {
    if (_obj&&typeof _obj.toSource !== 'undefined' && typeof _obj.callee === 'undefined') {
        return _obj.toSource();
    }
    switch (typeof _obj) {
        case 'number':
        case 'boolean':
        case 'function':
            return _obj;
            break;
        case 'string':
            return '\'' + _obj.replace(/\'/g, "\"") + '\'';
            break;
        case 'object':
            var str;
            if ($.is.isArray(_obj)) {
                str = '[';
                var i, len = _obj.length;
                for (i = 0; i < len - 1; i++) {
                    str += serialize(_obj[i]) + ',';
                }
                str += serialize(_obj[i]) + ']';
            } else {
                str = '{';
                var key;
                for (key in _obj) {
                    str += key + ':' + serialize(_obj[key]) + ',';
                }
                str = str.replace(/\,$/, '') + '}';
            }
            return str;
            break;

        default:
            return 'UNKNOWN';
            break;
    }
};
Module({
    name: "injector",
    extend: "viewgroup",
    init: function () {
        this.outer = window.parent.brooder("body").getModule().getChildAt(0);
        this.parentView.getChildAt(0).dispatchEvent("openPage",{
            url:"index"
        });
    },
    ready: function (target) {
        this.current = null;
        this.target = target;
        this.setMask(target.dom);
        window.parent.brooder("body").getModule().getChildAt(0).dispatchEvent("pageCoding", this.target.option.override);
        console.log("---------ready----------");
    },
    setMask: function (dom) {
        var ths = this;
        dom.children().each(function () {
            if (!$(this).hasClass("inject-module")) {
                if ($(this).getModule().nofixed) {
                    $(this).getModule().nofixed();
                }
                var q = $(this).wrap("<div class='inject-module' inner='" + $(this)
                        .dataset("view") + "'></div>").parent()
                        .append("<div class='inject-module-mask'>" +
                                "<div class='inject-module-mask-btns'>" +
                                "<div class='inject-module-mask-btn'><i class='fa fa-caret-up'></i></div>" +
                                "<div class='inject-module-mask-btn'><i class='fa fa-caret-down'></i></div>" +
                                "<div class='inject-module-mask-btn'><i class='fa fa-remove'></i></div>" +
                                "</div>" +
                                "</div>");
                q.click(function () {
                    $(this).parent().children().each(function () {
                        $(this).removeClass("show");
                    });
                    $(this).addClass("show");
                    ths.current = $(this).children(0).getModule();
                    ths.outer.dispatchEvent("moduleclick", {
                        type: $(this).attr("inner"),
                        values: $(this).children(0).getModule().option
                    });
                });
                var n = q.find(".inject-module-mask-btn");
                n.eq(0).click(function (e) {
                    var p = $(this).parent(3);
                    if (p.prev().length > 0) {
                        p.insertBefore(p.prev());
                    }
                    e.stopPropagation();
                });
                n.eq(1).click(function (e) {
                    var p = $(this).parent(3);
                    if (p.next().length > 0) {
                        p.insertAfter(p.next());
                    }
                    e.stopPropagation();
                });
                n.eq(2).click(function (e) {
                    $(this).parent(3).remove();
                    e.stopPropagation();
                });
            }
        });
    },
    getContent: function () {
        var k = this.target.children, t = "", m = "/*!\n", q = "Option({name: \"page\",mapping: [";
        var _a = this.target.option.name.split(".");
        _a.splice(_a.length - 1, 1);
        var _c = _a.join(".");
        var types = {},isn=false;
        for (var i = 0; i < k.length; i++) {
            k[i].option.name="ops"+i;
            t += "Option(" + serialize(k[i].option).replace(/\r\n/g, "").replace(/\n/g, "") + ");\n";
            if (k[i].option.name) {
                isn=true;
                q += "{name:" + "\"" + k[i].type() + "\",option:\"" + ("\@.ops"+i) + "\"},";
            }
            var a = k[i].type();
            var b = a.split(".");
            b.splice(b.length - 1, 1);
            types[b.join(".")] = "";
        }
        if(isn){
            q=q.substring(0,q.length-1);
        }
        q += "],override:" +
                serialize(this.target.option.override);
        q += "});";
        m += " * @packet " + _c + ";\n";
        for (var i in types) {
            m += " * @require " + i + ";\n";
        }
        m += " */\n";
        console.log(m + t + q);
        window.parent.brooder("body").getModule().getChildAt(0).dispatchEvent("contentok", {
            code:m + t + q,
            packetName:_c
        });
    },
    event_addmodule: function (e) {
        this.target.addChild({
            type: e.data,
            container: this.target.dom
        });
        this.setMask(this.target.dom);
    },
    event_editmodule: function (e) {
        this.current.option = e.data;
        for (var i in e.data.override) {
            this.current[i] = e.data.override[i];
        }
        this.current.rerender();
        this.getContent();
    },
    event_editpagecode: function (e) {
        this.target.option.override = e.data;
        for (var i in e.data) {
            this.target[i] = e.data[i];
        }
        this.getContent();
    },
    event_createpage:function(e){
        this.target.parentView.option.router[e.data.type+"/"]={
            name:e.data.packetName,
            mapping:[]
        };
        this.target.parentView.bind(e.data.type+"/");
        this.target.dispatchEvent("openPage",{
            url:e.data.type
        });
    },
    event_editpageoption:function(e){
        this.target.parentView.option.router[e.data.type+"/"]=e.data.option;
//        window.location.reload();
    },
    event_refresh: function () {
        window.location.reload();
    }
});