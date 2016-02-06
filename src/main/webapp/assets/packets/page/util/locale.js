(function($) {
    var lang = "cn", url = window.location.href;
    var c = url.split("?");
    if (c.length > 1) {
        var d = c[1];
        var n = d.split("&");
        var r = {};
        for (var i = 0; i < n.length; i++) {
            var p = n[i].split("=");
            r[p[0]] = p[1] || "";
        }
        lang = r["locale"] || "cn";
    }
    var defaults = {
        en: "no words",
        cn: "没找到字符"
    };
    var mapping = {
    };
    var locale = {};
    locale.map = function(key, vals) {//key:{cn:{},en:{}}
        if (!mapping[key]) {
            mapping[key] = vals;
        } else {
            throw Error("[brooder] locale has mapped with key of " + key);
        }
    };
    locale.get = function(key) {
        return mapping[key][lang];
    };
    $.langmap = function(obj) {
        if (obj["namespace"]) {
            locale.map(obj.namespace, obj);
        } else {
            throw Error("[brooder] lang mapping,namespace can not empty");
        }
    };
    $.setDefaultLang = function(a) {
        defaults = a;
    };
    window.Lang = function(keys) {
        var c = keys.split("\."), key = c[c.length - 1];
        c.splice(c.length - 1, 1);
        var namespace = c.join(".");
        var d = locale.get(namespace);
        if (d) {
            return d[key] || defaults[lang];
        } else {
            return defaults[lang];
        }
    };
})(brooder);