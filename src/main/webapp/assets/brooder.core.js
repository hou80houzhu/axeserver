(function () {
    "use strict";
    var brooderInfo = {
        version: "1.0.3",
        line: "5877",
        gzip: "26.6k"
    };
    var brooder = function (start) {
        return new dom(start);
    };
    var browser = (function () {
        var map = {
            kenel: [{n: "webkit", g: /applewebkit\/([\d.]+)/}, {n: "gecko", g: /gecko\/([\d.]+)/}, {n: "trident", g: /trident\/([\d.]+)/}, {n: "edge", g: /edge\/([\d.]+)/}],
            info: [{n: "chrome", g: /chrome\/([\d.]+)/}, {n: "firefox", g: /firefox\/([\d.]+)/}, {n: "msie", g: /msie ([\d.]+)/}, {n: "opera", g: /opera\/([\d.]+)/}, {n: "safari", g: /safari\/([\d.]+)/}, {n: "blackberry", g: /blackberry ([\d.]+)/}, {n: "blackberry", g: /edge ([\d.]+)/}],
            os: [{n: "windows", g: /windows ([a-z\d. ]+)/}, {n: "osx", g: /mac os x ([a-z\d. ]+)/}, {n: "ios", g: /os ([a-z\d. _]+)/}, {n: "linux", g: /linux ([a-z\d. _]+)/}, {n: "linux", g: /linux/}, {n: "blackberry", g: /blackberry ([a-z\d. ]+)/}, {n: "blackberry", g: /bb[0-9]+/}],
            mobile: [{n: "android", g: /android ([\d.]+)/}, {n: "iphone", g: /iphone/}, {n: "ipad", g: /ipad/}, {n: "blackberry", g: /bb[0-9]+/}, {n: "blackberry", g: /blackberry/}]
        }, ua = window.navigator.userAgent.toLowerCase(), c = {};
        for (var i in map) {
            c[i] = undefined;
            for (var t in map[i]) {
                var a = map[i][t];
                var b = ua.match(a.g);
                if (b) {
                    var v = b[0].match(/[0-9._]+/);
                    c[i] = {
                        name: a.n,
                        version: v ? v[0] : undefined
                    };
                    break;
                }
            }
        }
        if (c.kenel && c.kenel.name === "trident" && c.kenel.version === "7.0") {
            c.info = {name: "msie", version: "11"};
        }
        c.name = function () {
            return c.info.name;
        };
        c.version = function () {
            return c.info.verison;
        };
        c.isMobile = function () {
            return this.mobile !== null;
        };
        c.isAndroid = function (version) {
            if (arguments.length === 0) {
                return this.mobile ? (this.mobile.name === "android") : false;
            } else {
                return this.mobile.name === "android" && parseInt(this.mobile.version) === parseInt(version);
            }
        };
        c.isIos = function (version) {
            if (arguments.length === 0) {
                return this.mobile ? (this.mobile.name === "ios") : false;
            } else {
                return this.mobile.name === "ios" && parseInt(this.mobile.version) === parseInt(version);
            }
        };
        c.isWebkit = function (version) {
            if (arguments.length === 0) {
                return this.kenel ? (this.kenel.name === "webkit") : false;
            } else {
                return this.kenel.name === "webkit" && parseInt(this.kenel.version) === parseInt(version);
            }
        };
        c.isGecko = function (version) {
            if (arguments.length === 0) {
                return this.kenel ? (this.kenel.name === "gecko") : false;
            } else {
                return this.kenel.name === "gecko" && parseInt(this.kenel.version) === parseInt(version);
            }
        };
        c.isTrident = function () {
            return this.kenel ? (this.kenel.name === "trident") : false;
        };
        c.isEdge = function () {
            return this.kenel ? (this.kenel.name === "edge") : false;
        };
        c.isIe = function (version) {
            if (arguments.length === 0) {
                return this.info ? (this.info.name === "msie") : false;
            } else {
                return this.info.name === "msie" && parseInt(this.info.version) === parseInt(version);
            }
        };
        c.isSupport = function () {
            return this.kenel && (this.kenel.name === "webkit" || this.kenel.name === "gecko" || (this.kenel.name === "trident" && this.kenel.version / 1 >= 6));
        };
        return c;
    })();
    var is = {
        isFunction: function (obj) {
            return (typeof obj === 'function') && obj.constructor === Function;
        },
        isEmptyObject: function (obj) {
            for (var a in obj) {
                return false;
            }
            return true;
        },
        isUndefined: function (obj) {
            return obj === undefined;
        },
        isWindow: function (obj) {
            return obj !== undefined && obj !== null && obj === obj.window;
        },
        isDocument: function (obj) {
            return obj !== null && obj.nodeType === obj.DOCUMENT_NODE;
        },
        isObject: function (obj) {
            return  typeof (obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
        },
        isString: function (obj) {
            return (typeof obj === 'string') && obj.constructor === String;
        },
        isNumber: function (obj) {
            return typeof obj === "number";
        },
        isNumeric: function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        isAvalid: function (obj) {
            return obj !== null && obj !== undefined;
        },
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },
        isQueryString: function (str) {
            return is.isString(str) && /(^|&).*=([^&]*)(&|$)/.test(str);
        },
        isElement: function (e) {
            return e && e.nodeType === 1 && e.nodeName;
        }
    };
    var serialize = {
        parse: function (str) {
            return window.JSON.parse(str);
        },
        stringify: function (obj) {
            return window.JSON.stringify(obj);
        },
        postData: function (obj) {
            if (obj) {
                if (obj instanceof FormData || obj instanceof Blob || obj instanceof ArrayBuffer) {
                    return obj;
                } else if (is.isObject(obj)) {
                    var has = false;
                    for (var i in obj) {
                        if (obj[i] instanceof Blob || obj[i] instanceof ArrayBuffer || obj[i] instanceof File) {
                            has = true;
                            break;
                        }
                    }
                    if (has) {
                        var fd = new FormData();
                        for (var i in obj) {
                            if (obj[i] instanceof Blob) {
                                fd.append(i, obj[i]);
                            } else if (obj[i] instanceof File) {
                                fd.append(i, obj[i]);
                            } else if (is.isArray(obj[i]) || is.isObject(obj[i])) {
                                fd.append(i, window.encodeURIComponent(serialize.stringify(obj[i])));
                            } else if (obj[i] instanceof FormData) {
                            } else {
                                fd.append(i, window.encodeURIComponent(obj[i].toString()));
                            }
                        }
                        return fd;
                    } else {
                        return serialize.queryString(obj);
                    }
                } else if (is.isArray(obj)) {
                    return window.encodeURIComponent(serialize.stringify({key: obj}));
                } else {
                    return obj;
                }
            } else {
                return null;
            }
        },
        queryString: function (obj) {
            var result = "";
            if (obj) {
                for (var i in obj) {
                    var val = obj[i];
                    if (is.isString(val)) {
                        result += i + "=" + window.encodeURIComponent(val) + "&";
                    } else if (is.isObject(val) || is.isArray(val)) {
                        result += i + "=" + window.encodeURIComponent(serialize.stringify(val)) + "&";
                    } else if (val instanceof FormData || val instanceof Blob || val instanceof File || val instanceof ArrayBuffer) {
                    } else {
                        result += i + "=" + (val !== undefined && val !== null ? window.encodeURIComponent(val.toString()) : "") + "&";
                    }
                }
                return result.length > 0 ? result.substring(0, result.length - 1) : "";
            } else {
                return "";
            }
        },
        queryObject: function (str) {
            var n = str.split("?"), result = {};
            if (n.length > 1) {
                var t = n[1].indexOf("#"), y = n[1];
                if (t !== -1) {
                    y = y.substring(0, t);
                }
                var m = y.split("&");
                for (var i = 0; i < m.length; i++) {
                    var c = m[i].split("=");
                    result[c[0]] = c.length > 1 ? c[1] : "";
                }
                return result;
            } else {
                return null;
            }
        },
        hashObject: function (str) {
            var n = str.split("#"), result = {};
            if (n.length > 1) {
                var m = n[1].split("&");
                for (var i = 0; i < m.length; i++) {
                    var c = m[i].split("=");
                    result[c[0]] = c.length > 1 ? c[1] : "";
                }
                return result;
            } else {
                return null;
            }
        }
    };
    var json = {
        each: function (object, fn) {
            var name, i = 0, length = object.length, isObj = length === undefined || is.isFunction(object);
            if (isObj) {
                for (name in object) {
                    if (fn.call(object[ name ], name, object[ name ]) === false) {
                        break;
                    }
                }
            } else {
                while (i < length) {
                    if (fn.call(object[ i ], i, object[ i++ ]) === false) {
                        break;
                    }
                }
            }
            return object;
        },
        clone: function (obj) {
            var a;
            if (is.isArray(obj)) {
                a = [];
                for (var i = 0; i < obj.length; i++) {
                    a[i] = json.clone(obj[i]);
                }
                return a;
            } else if (is.isObject(obj)) {
                a = {};
                for (var i in obj) {
                    a[i] = json.clone(obj[i]);
                }
                return a;
            } else {
                return obj;
            }
        },
        cover: function () {
            var obj, key, val, vals, arrayis, clone, result = arguments[0] || {}, i = 1, length = arguments.length, isdeep = false;
            if (typeof result === "boolean") {
                isdeep = result;
                result = arguments[1] || {};
                i = 2;
            }
            if (typeof result !== "object" && !is.isFunction(result)) {
                result = {};
            }
            if (length === i) {
                result = this;
                i = i - 1;
            }
            while (i < length) {
                obj = arguments[i];
                if (obj !== null) {
                    for (key in obj) {
                        val = result[key];
                        vals = obj[key];
                        if (result === vals) {
                            continue;
                        }
                        arrayis = is.isArray(vals);
                        if (isdeep && vals && (is.isObject(vals) || arrayis)) {
                            if (arrayis) {
                                arrayis = false;
                                clone = val && is.isArray(val) ? val : [];
                            } else {
                                clone = val && is.isObject(val) ? val : {};
                            }
                            result[key] = json.cover(isdeep, clone, vals);
                        } else if (vals !== undefined) {
                            result[key] = vals;
                        }
                    }
                }
                i++;
            }
            return result;
        }
    };
    var prefix = (function () {
        var c = {};
        if (browser.isWebkit()) {
            c.prefix = "-webkit-";
            c.transitionEnd = "webkitTransitionEnd";
        } else if (browser.isGecko() === "gecko") {
            c.prefix = "-moz-";
            c.transitionEnd = "transitionend";
        } else {
            c.prefix = "";
            c.transitionEnd = "transitionend";
        }
        c.fix = function (cssset) {
            var prefix = /^-all-/;
            if (is.isString(cssset)) {
                return cssset.replace(prefix, this.prefix);
            } else if (is.isArray(cssset)) {
                var a = [];
                for (var i = 0; i < cssset.length; i++) {
                    a.push(cssset[i].replace(prefix, this.prefix));
                }
                return a;
            } else if (is.isObject(cssset)) {
                var result = {};
                for (var i in cssset) {
                    result[i.replace(prefix, this.prefix)] = is.isString(cssset[i]) ? cssset[i].replace(prefix, this.prefix) : cssset[i];
                }
                return result;
            } else {
                return cssset;
            }
        };
        return c;
    })();
    var util = {
        uuid: function () {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), uuid = new Array(36), rnd = 0, r;
            for (var i = 0; i < 36; i++) {
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    uuid[i] = '-';
                } else if (i === 14) {
                    uuid[i] = '4';
                } else {
                    if (rnd <= 0x02)
                        rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return uuid.join('');
        }
    };
    brooder.info = brooderInfo, brooder.json = json, brooder.is = is, brooder.browser = browser, brooder.prefix = prefix, brooder.util = util;
    brooder.serialize = serialize, brooder.extend = brooder.json.cover;
    brooder.nfn = function () {
    };

    var queue = function () {
        this.list = [];
        this.length = null;
        this.current = null;
        this.state = "init";//running,end,stop.
        this._start = null;
        this._progress = null;
        this._complete = null;
        this.result = null;
    };
    queue.prototype.add = function (fn, error, parameter) {
        if (this.state === "init") {
            this.list.push({
                fn: fn,
                parameter: parameter,
                error: error || null
            });
        } else {
            throw Error("[brooder]-this queue can not add task when it is not in state of init.");
        }
        return this;
    };
    queue.prototype.next = function (data) {
        this._progress && this._progress.call(this, {
            total: this.length,
            runed: this.length - this.list.length,
            data: data
        });
        queue._fire.call(this, data);
        return this;
    };
    queue.prototype.left = function () {
        return this.list.length;
    };
    queue.prototype.total = function () {
        return this.length;
    };
    queue.prototype.run = function (data) {
        if (this.length === null) {
            this._start && this._start.call(this);
            this.length = this.list.length;
        }
        this.state = 'running';
        queue._fire.call(this, data);
    };
    queue.prototype.stop = function () {
        if (this.state === "running") {
            this.state = "stop";
        }
        return this;
    };
    queue.prototype.reset = function () {
        this.length === null;
        this.state = "init";
        this.result = null;
        return this;
    };
    queue.prototype.clean = function () {
        this.list.length = 0;
        this.state = "end";
        this.length = 0;
        this.reuslt = null;
        return this;
    };
    queue.prototype.isRunning = function () {
        return this.state === "running";
    };
    queue.prototype.isEnd = function () {
        return this.state === "end";
    };
    queue.prototype.isStop = function () {
        return this.state === "stop";
    };
    queue.prototype.start = function (fn) {
        fn && (this._start = fn);
        return this;
    };
    queue.prototype.progress = function (fn) {
        fn && (this._progress = fn);
        return this;
    };
    queue.prototype.complete = function (fn) {
        fn && (this._complete = fn);
        if (this.state === "end") {
            this._complete.call(this, this.result);
        }
        return this;
    };
    queue._fire = function (result) {
        if (this.list.length > 0) {
            var a = this.list.shift(), ths = this;
            this.current = a;
            try {
                a.fn && a.fn.call(ths, result, a.parameter);
            } catch (e) {
                queue.error.call(this, result, e);
                this.next(result);
            }
        } else {
            this.state = 'end';
            this.result = result;
            this._complete && this._complete.call(this, result);
        }
        return this;
    };
    queue.error = function (result, e) {
        if (this.current) {
            this.current.error && this.current.error.call(this, result, e, this.current.parameter);
        }
    };
    brooder.queue = function () {
        return new queue();
    };

    var dynamicQueue = function () {
        this.state = "waiting";//waiting,running
        this.__list__ = [];
        this.result = null;
        this.current = null;
        this._complete = null;
        this._notify = null;
        this.waits = 1;
        this._completeTimes = 0;
        this._handleTimes = 0;
    };
    dynamicQueue.prototype.add = function (fn, error, parameters) {
        this.__list__.push({
            fn: fn,
            error: error,
            parameters: parameters
        });
        if (this.state === "waiting") {
            if (this.__list__.length === this.waits) {
                dynamicQueue._fire.call(this, this.result);
            }
        }
        return this;
    };
    dynamicQueue.prototype.size = function () {
        return this.__list__.length;
    };
    dynamicQueue.prototype.wait = function (num) {
        if (arguments.length === 0 || num === 0) {
            num = 10000000;
        }
        this.waits = num;
        return this;
    };
    dynamicQueue.prototype.work = function (data) {
        if (this.state === "waiting") {
            this.waits = 1;
            dynamicQueue.next.call(this, data);
        }
        return this;
    };
    dynamicQueue.prototype.delay = function (time) {
        this.add(function (data) {
            var ths = this;
            setTimeout(function () {
                ths.next(data);
            }, time);
        });
        return this;
    };
    dynamicQueue.prototype.notify = function (fn) {
        fn && (this._notify = fn);
        return this;
    };
    dynamicQueue.prototype.complete = function (fn) {
        fn && (this._complete = fn);
        return this;
    };
    dynamicQueue.prototype.isRunning = function () {
        return this.state === "running";
    };
    dynamicQueue.prototype.isWaiting = function () {
        return this.state === "waiting";
    };
    dynamicQueue.prototype.isHandleAtOnce = function () {
        if (this.state === "running" && this.__list__.length > 0) {
            return false;
        } else {
            return true;
        }
    };
    dynamicQueue.prototype.completeTimes = function () {
        return this._completeTimes;
    };
    dynamicQueue.prototype.handleTimes = function () {
        return this._handleTimes;
    };
    dynamicQueue.prototype.clean = function () {
        this.__list__.length = 0;
        this.state = "waiting";
        for (var i in this) {
            this[i] = null;
        }
    };
    dynamicQueue.prototype.next = function (data) {
        dynamicQueue.next.call(this, data);
        return this;
    };
    dynamicQueue.prototype.error = function (e) {
        return dynamicQueue.error.call(this, e);
    };
    dynamicQueue.next = function (data) {
        this._notify && this._notify.call(this, data);
        dynamicQueue._fire.call(this, data);
        return this;
    };
    dynamicQueue.error = function (data) {
        if (this.current) {
            this.current.error && this.current.error(this, data);
        }
        return this;
    };
    dynamicQueue._fire = function (result) {
        if (this.__list__.length > 0) {
            this.state = 'running';
            this._handleTimes = this._handleTimes + 1;
            var a = this.__list__.shift(), ths = this;
            this.current = a;
            try {
                a.fn && a.fn.call(ths, result, a.parameters);
            } catch (e) {
                dynamicQueue.error.call(e);
                dynamicQueue.next.call(ths, result);
            }
        } else {
            if (this.state === 'running') {
                this.result = result;
                this.state = 'waiting';
                this._completeTimes = this._completeTimes + 1;
                this.current = null;
            }
            this._complete && this._complete.call(this, result);
        }
        return this;
    };
    brooder.dynamicQueue = function () {
        return new dynamicQueue();
    };

    var promise = function (task) {
        this.state = 0;//0,1,2
        this.queue = new dynamicQueue();
        this._finally = null;
        this._notify = null;
        this._complete = null;
        this._result = null;
        this._scope = null;
        var ths = this;
        this.queue.complete(function (data) {
            ths._result = data;
            var a = ths._finally && ths._finally.call(ths, data);
            if (a instanceof promise) {
                a.complete(function (b) {
                    ths._result = b;
                    ths._complete && ths._complete.call(ths, b);
                });
            } else {
                ths._complete && ths._complete.call(ths, data);
            }
        }).notify(function (e) {
            ths._notify && ths._notify(e);
        });
        if (is.isFunction(task)) {
            this.queue.wait();
            this.done(function (a) {
                return a;
            });
            task(function (a) {
                ths.resolve(a);
            }, function (a) {
                ths.reject(a);
            });
        } else if (task) {
            this._result = task;
            this.state = 1;
            this.queue.add(function () {
                this.next(task);
            });
        } else {
            this.queue.wait();
            this.done(function (a) {
                return a;
            });
        }
    };
    promise.prototype.scope = function (scope) {
        if (arguments.length === 1) {
            this._scope = scope;
            return this;
        } else {
            return this._scope;
        }
    };
    promise.prototype.then = function (resolver, rejecter) {
        promise.add.call(this, resolver, 1);
        promise.add.call(this, rejecter, 2);
        return this;
    };
    promise.prototype.wait = function (fn) {
        this.queue.add(function (data) {
            var ths = this;
            fn.call(ths, function (a) {
                ths.next(a);
            }, data);
        });
        return this;
    };
    promise.prototype.done = function (fn) {
        promise.add.call(this, fn, 1);
        return this;
    };
    promise.prototype.fail = function (fn) {
        promise.add.call(this, fn, 2);
        return this;
    };
    promise.prototype.always = function (fn) {
        is.isFunction(fn) && (this._finally = fn);
        return this;
    };
    promise.prototype.reject = function (data) {
        this.state = 2;
        this.queue.work(data);
        return this;
    };
    promise.prototype.resolve = function (data) {
        this.state = 1;
        this.queue.work(data);
        return this;
    };
    promise.prototype.notify = function (fn) {
        is.isFunction(fn) && (this._notify = fn);
        return this;
    };
    promise.prototype.complete = function (fn) {
        is.isFunction(fn) && (this._complete = fn);
        return this;
    };
    promise.prototype.delay = function (time) {
        this.queue.delay(time);
        return this;
    };
    promise.prototype.clean = function () {
        this.queue.clean();
        for (var i in this) {
            this[i] = null;
        }
    };
    promise.add = function (fn, state) {
        var ps = this;
        if (fn && is.isFunction(fn)) {
            this.queue.add(function (data) {
                var ths = this;
                setTimeout(function () {
                    if (ps.state === state) {
                        var a;
                        if (ps._scope) {
                            a = fn && fn.call(ps._scope, data);
                        } else {
                            a = fn && fn(data);
                        }
                        if (a instanceof promise) {
                            a.complete(function (b) {
                                ths.next(b);
                            });
                        } else {
                            ths.next(a);
                        }
                    } else {
                        ths.next(data);
                    }
                }, 0);
            });
        }
    };
    brooder.promise = function (fn) {
        return new promise(fn);
    };
    brooder.all = function () {
        var ps = $.promise();
        if (arguments.length > 0) {
            var a = Array.prototype.slice.call(arguments);
            var total = a.length;
            for (var i = 0; i < a.length; i++) {
                a[i].complete(function () {
                    if (this.isResolve) {
                        total = total - 1;
                        if (total === 0) {
                            ps.resolve();
                        }
                    }
                });
            }
        }
        return ps;
    };
    brooder.any = function () {
        var ps = $.promise();
        if (arguments.length > 0) {
            var a = Array.prototype.slice.call(arguments);
            var total = a.length, resolved = false;
            for (var i = 0; i < a.length; i++) {
                a[i].complete(function () {
                    total = total - 1;
                    if (this.isResolve) {
                        resolved = true;
                    }
                    if (total === 0 && resolved) {
                        ps.resolve();
                    }
                });
            }
        }
        return ps;
    };

    var dom = function (start) {
        this.nodes = [];
        this.length = 0;
        if (arguments.length === 1 && is.isAvalid(start)) {
            if (is.isString(start)) {
                if (domx.util.isHTML(start)) {
                    this.nodes = domx.util.parseHTML(start);
                } else {
                    this.nodes = domx.util.query(window.document, start);
                }
                this.length = this.nodes.length;
            } else if (start instanceof query) {
                this.nodes = start.nodes;
                this.length = start.length;
            } else if (is.isWindow(start) || is.isDocument(start)) {
                return new windoc(start);
            } else if (start.nodeType === 1) {
                this.nodes = [start];
                this.length = 1;
            } else {
                this.nodes = [];
                this.length = 0;
            }
        } else if (arguments.length === 0) {
            this.nodes = [];
            this.length = 0;
        }
    };
    var domx = {};
    domx.regs = {
        root: /^(?:body|html)$/i,
        _class: /^\.([\w-]+)$/,
        _id: /^#([\w-]*)$/,
        _tag: /^[\w-]+$/,
        _html: /^\s*<(\w+|!)[^>]*>/,
        _tagName: /<([\w:]+)/,
        _property: /-+(.)?/g
    };
    domx.util = {
        getDom: function (nodes) {
            var a = new dom();
            if (arguments.length === 1) {
                a.nodes = nodes;
                a.length = nodes.length;
            } else {
                a.nodes = [];
                a.length = 0;
            }
            return a;
        },
        isClass: function (selector) {
            return domx.regs._class.test(selector);
        },
        isId: function (selector) {
            return domx.regs._id.test(selector);
        },
        isTag: function (selector) {
            return domx.regs._tag.test(selector);
        },
        isHTML: function (selector) {
            return domx.regs._html.test(selector);
        },
        query: function (node, selector) {
            var ar = null;
            switch (true) {
                case this.isId(selector):
                    var _a = document.getElementById(selector.substring(1, selector.length));
                    ar = _a ? [_a] : [];
                    break;
                case this.isClass(selector):
                    var t = node.getElementsByClassName(selector.substring(1, selector.length));
                    ar = Array.prototype.slice.call(t);
                    break;
                case this.isTag(selector):
                    var t = node.getElementsByTagName(selector);
                    ar = Array.prototype.slice.call(t);
                    break;
                default :
                    ar = Array.prototype.slice.call(node.querySelectorAll(selector));
                    break;
            }
            return ar;
        },
        queryChild: function (node, selector) {
            var id = node.getAttribute("id") || "__brooder__";
            node.setAttribute("id", id);
            var ar = domx.util.query(node, "#" + id + ">" + selector);
            if (id === "__brooder__") {
                node.removeAttribute("id");
            }
            return ar;
        },
        repairTags: {
            area: {l: 1, s: "<map>", e: ""},
            param: {l: 1, s: "<object>", e: ""},
            col: {l: 2, s: "<table><tbody></tbody><colgroup>", e: "</table>"},
            legend: {l: 1, s: "<fieldset>"},
            option: {l: 1, s: "<select multiple='multiple'>", e: ""},
            thead: {l: 1, s: "<table>", e: "</table>"},
            tr: {l: 2, s: "<table><tbody>", e: ""},
            td: {l: 3, s: "<table><tbody><tr>", e: ""},
            _general: {s: "", e: "", l: 0}
        },
        parseHTML: function (html) {
            var a = html.match(domx.regs._tagName), ops = domx.util.repairTags[(a ? a[1] : "_general")] || domx.util.repairTags["_general"];
            var div = document.createElement("DIV");
            div.innerHTML = ops.s + html + ops.e;
            var t = div;
            for (var i = 0; i < ops.l; i++) {
                t = t.firstChild;
            }
            return Array.prototype.slice.call(t.childNodes);
        },
        parseFlagment: function (html) {
            var _c = domx.util.parseHTML(html);
            var a = window.document.createDocumentFragment();
            for (var i in _c) {
                a.appendChild(_c[i]);
            }
            return a;
        },
        propertyName: function (str) {
            return str.replace(domx.regs._property, function (match, chr, index) {
                if (index === 0) {
                    return match.substring(1, 2);
                } else {
                    return chr ? chr.toUpperCase() : "";
                }
            });
        },
        cleanNode: function (node) {
            if (node) {
                if (node.datasets) {
                    for (var t in node.datasets) {
                        var p = node.datasets[t];
                        if (p && p.clean) {
                            p.clean();
                        }
                        node.datasets[t] = null;
                    }
                    node.datasets = null;
                }
                event.util.unbindnode(node);
                var c = node.getElementsByClassName("incache");
                for (var n in c) {
                    if (c[n].nodeType) {
                        for (var m in c[n].datasets) {
                            var q = c[n].datasets[m];
                            if (q && q.clean) {
                                q.clean();
                            }
                            c[n].datasets[m] = null;
                        }
                        c[n].datasets = null;
                        event.util.unbindnode(c[n]);
                    }
                }
            }
        },
        supported: function (paras) {
            if (arguments.length === 1) {
                return is.isString(paras) || paras instanceof dom || is.isWindow(paras) || is.isDocument(paras) || paras.nodeType === 1;
            } else {
                return false;
            }
        }
    };

    var transition = function (dom) {
        this.dom = dom;
        this.mapping = {};
        transition.init.call(this);
        this.dom.get(0).addEventListener(prefix.transitionEnd, transition.fn, false);
        this.dom.data("_transition_", this);
    };
    transition.fn = function (e) {
        var obj = $(e.currentTarget).data("_transition_");
        var name = e.propertyName;
        if (obj.mapping[name]) {
            if (obj.mapping[name].promise) {
                obj.mapping[name].promise.resolve();
            }
        } else if (obj.mapping[prefix.prefix + name]) {
            if (obj.mapping[prefix.prefix + name].promise) {
                obj.mapping[prefix.prefix + name].promise.resolve();
            }
        } else if (obj.mapping["all"]) {
            if (obj.mapping["all"].promise) {
                obj.mapping["all"].promise.resolve();
            }
        }
    };
    transition.setCss = function () {
        var value = "", q = "";
        for (var i in this.mapping) {
            if (this.mapping[i]) {
                value += i + " " + this.mapping[i].time + "ms " + this.mapping[i].type + " " + this.mapping[i].delay + "ms,";
            }
        }
        if (value.length > 0) {
            value = value.substring(0, value.length - 1);
        } else {
            value = "none";
        }
        this.dom.css(prefix.prefix + "transition", value);
    };
    transition.init = function () {
        var type = this.dom.css("-all-transition-timing-function").split(",");
        var delay = this.dom.css("-all-transition-delay").split(",");
        var duration = this.dom.css("-all-transition-duration").split(",");
        var prop = this.dom.css("-all-transition-property").split(",");
        for (var i = 0; i < prop.length; i++) {
            if (prop[i] !== "all") {
                this.mapping[prop[i]] = {
                    property: prop[i],
                    time: parseFloat(duration[i]) * 1000,
                    type: type[i],
                    delay: parseFloat(delay[i]) * 1000,
                    fn: null
                };
            }
        }
    };
    transition.prototype.set = function (properties, option) {
        var ops = {time: 300, type: "ease-out", delay: 0};
        var k = new promise();
        k.scope(this.dom);
        brooder.extend(ops, option);
        var a = prefix.fix(properties.split(","));
        for (var i = 0; i < a.length; i++) {
            var property = a[i];
            if (property !== "all") {
                this.mapping[property] = {property: property, time: ops.time, type: ops.type, delay: ops.delay, promise: k};
            } else {
                this.mapping = {all: {property: property, time: ops.time, type: ops.type, delay: ops.delay, promise: k}};
                break;
            }
        }
        transition.setCss.call(this);
        return k;
    };
    transition.prototype.all = function (option) {
        var ops = {time: 300, type: "ease-out", delay: 0};
        var k = new promise();
        k.scope(this.dom);
        brooder.extend(ops, option);
        this.mapping = {all: {property: "all", time: ops.time, type: ops.type, delay: ops.delay, promise: k}};
        transition.setCss.call(this);
        return k;
    };
    transition.prototype.get = function (property) {
        var a = this.mapping[prefix.fix(property)];
        if (a) {
            return {
                type: a.type,
                time: a.time,
                delay: a.delay,
                property: property
            };
        }
        return a;
    };
    transition.prototype.remove = function (properties) {
        var a = prefix.fix(properties.split(","));
        for (var i = 0; i < a.length; i++) {
            this.mapping[a[i]] && (this.mapping[a[i]] = null);
        }
        transition.setCss.call(this);
        return this;
    };
    transition.prototype.removeAll = function () {
        this.mapping = {};
        transition.setCss.call(this);
        return this;
    };
    transition.prototype.scope = function () {
        return this.dom;
    };
    transition.prototype.clean = function () {
        this.dom.get(0).removeEventListener(prefix.transitionEnd, transition.fn, false);
        for (var i in this) {
            this[i] = null;
        }
    };

    var transform = function (dom, attrs) {
        this.dom = dom;
        this.attrs = attrs.length === 0 ? ["translate"] : attrs;
        transform.init.call(this);
        transform.defaultValue.call(this);
        dom.data("_transform_", this);
    };
    transform.parse = function () {
        var matrix = this.dom.css(prefix.prefix + "transform");
        var a = matrix.match(/(-?[0-9\.]+)/g);
        if (a) {
            if (a.length > 6) {
                a.shift();
            }
            for (var i = 0; i < a.length; i++) {
                a[i] = a[i] / 1;
            }
        }
        return a;
    };
    transform.defaultValue = function () {
        var trans = {translate: [0, 0], translate3d: [0, 0, 0], translateX: 0, translateY: 0, translateZ: 0, rotate: 0, rotateX: 0, rotateY: 0, rotateZ: 0, rotate3d: [0, 0, 0, 1], scale: [1, 1], scaleX: 1, scaleY: 1, scaleZ: 1, scale3d: [1, 1, 1], skew: [0, 0], skewX: 0, skewY: 0};
        var ap = transform.parse.call(this);
        if (ap) {
            if (ap[0] !== 1) {
                var a = this.dom.get(0), transformstr = a.style.webkitTransform || a.style.mozTransform || a.style.msTransform || a.style.transform;
                if (transformstr || transformstr === "") {
                    var sheets = document.styleSheets;
                    a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector;
                    for (var i = 0; i < sheets.length; i++) {
                        var rules = sheets[i].cssRules || sheets[i].rules;
                        for (var r = 0; r < rules.length; r++) {
                            if (a.matches(rules[r].selectorText)) {
                                transformstr = rules[r].style.webkitTransform || rules[r].style.mozTransform || rules[r].style.msTransform || rules[r].style.transform;
                            }
                        }
                    }
                }
                if (transformstr && transformstr !== "") {
                    var names = [], values = [], name = "", value = "", isname = true;
                    for (var i = 0; i < transformstr.length; i++) {
                        var c = transformstr[i];
                        if (c !== "(" && c !== ")") {
                            if (isname) {
                                name += c;
                            } else {
                                value += c;
                            }
                        } else if (c === "(") {
                            names.push(name.trim());
                            name = "";
                            isname = false;
                        } else if (c === ")") {
                            values.push(value.trim());
                            value = "";
                            isname = true;
                        }
                    }
                    for (var i = 0; i < names.length; i++) {
                        var val = "";
                        if (values[i].indexOf(",") !== -1) {
                            var p = values[i].split(",");
                            for (var k = 0; k < p.length; k++) {
                                p[k] = parseFloat(p[k]);
                            }
                            val = p;
                        } else {
                            val = parseFloat(values[i]);
                        }
                        trans[names[i]] = val;
                    }
                }
            }
            if (ap.length === 6) {
                trans.translate3d = [ap[4], ap[5], 0];
                trans.translateX = ap[4];
                trans.translateY = ap[5];
            } else {
                trans.translate3d = [ap[12], ap[13], ap[14]];
                trans.translateX = ap[12];
                trans.translateY = ap[13];
                trans.translateZ = ap[14];
            }
        }
        this.values = trans;
    };
    transform.init = function () {
        this.setter = [];
        this.attrs.indexOf("translate") !== -1 && this.setter.push(function () {
            return "translate3d(" + (is.isNumber(this.values.translate3d[0]) ? this.values.translate3d[0] + "px" : this.values.translate3d[0]) + "," +
                    (is.isNumber(this.values.translate3d[1]) ? this.values.translate3d[1] + "px" : this.values.translate3d[1]) + "," +
                    (is.isNumber(this.values.translate3d[2]) ? this.values.translate3d[2] + "px" : this.values.translate3d[2]) + ")";
        });
        this.attrs.indexOf("rotate3d") !== -1 && this.setter.push(function () {
            var rotate3d = this.values.rotate3d.join("") !== "0000" ? "rotate3d(" + this.values.rotate3d[0] + "," + this.values.rotate3d[1] + "," + this.values.rotate3d[2] + "," + this.values.rotate3d[3] + "deg)" : "";
            rotate3d += (this.values.rotateX !== 0 ? " rotateX(" + this.values.rotateX + "deg)" : "");
            rotate3d += (this.values.rotateY !== 0 ? " rotateY(" + this.values.rotateY + "deg)" : "");
            rotate3d += (this.values.rotateZ !== 0 ? " rotateZ(" + this.values.rotateZ + "deg)" : "");
            return rotate3d;
        });
        this.attrs.indexOf("scale3d") !== -1 && this.setter.push(function () {
            var scale3d = this.values.scale3d.join("") !== "111" ? "scale3d(" + this.values.scale3d[0] + "," + this.values.scale3d[1] + "," + this.values.scale3d[2] + ")" : "";
            scale3d += this.values.scaleX !== 1 ? " scaleX(" + this.values.scaleX + ")" : "";
            scale3d += this.values.scaleY !== 1 ? " scaleY(" + this.values.scaleY + ")" : "";
            scale3d += this.values.scaleZ !== 1 ? " scaleZ(" + this.values.scaleZ + ")" : "";
            return scale3d;
        });
        this.attrs.indexOf("scale") !== -1 && this.setter.push(function () {
            return this.values.scale.join("") !== "11" ? "scale(" + this.values.scale[0] + "," + this.values.scale[1] + ")" : "";
        });
        this.attrs.indexOf("skew") !== -1 && this.setter.push(function () {
            return this.values.skew.join("") !== "00" ? "skew(" + this.values.skew[0] + "deg," + this.values.skew[1] + "deg)" : "";
        });
        this.attrs.indexOf("rotate") !== -1 && this.setter.push(function () {
            return this.values.rotate !== 0 ? "rotate(" + this.values.rotate + "deg)" : "";
        });
    };
    transform.set = function () {
        var str = "";
        for (var i in this.setter) {
            str += this.setter[i].call(this) + " ";
        }
        this.dom.css(prefix.prefix + "transform", str);
    };
    transform.translate = function (index, name, x) {
        if (arguments.length === 2) {
            var n = this.values.translate3d[index];
            if (!/^[0-9\.]*$/.test(n)) {
                var ap = transform.parse.call(this);
                if (ap.length === 6) {
                    this.values.translate3d = [ap[4], ap[5], 0];
                    this.values.translateX = ap[4];
                    this.values.translateY = ap[5];
                } else {
                    this.values.translate3d = [ap[12], ap[13], ap[14]];
                    this.values.translateX = ap[12];
                    this.values.translateY = ap[13];
                    this.values.translateZ = ap[14];
                }
            }
            return this.values.translate3d[index];
        } else {
            this.values.translate3d[index] = x;
            this.values.translate[index] = x;
            this.values[name] = x;
            transform.set.call(this);
            return this;
        }
    };
    transform.sett = function (type, defaultValue, value) {
        if (arguments.length === 2) {
            return this.values[type];
        } else {
            (value === undefined || value === null) && (value = defaultValue);
            this.values[type] = value;
            transform.set.call(this);
            return this;
        }
    };
    transform.prototype.matrix = function () {
        return transform.parse.call(this);
    };
    transform.prototype.sets = function (a) {
        for (var i in a) {
            if (this.values[i] !== undefined) {
                this.values[i] = a[i];
            }
        }
        transform.set.call(this);
        return this;
    };
    transform.prototype.scale = function (x, y) {
        if (arguments.length === 0) {
            return this.values.scale;
        } else {
            (x === undefined || x === null) && (x = 1), (y === undefined || y === null) && (y = 1);
            this.values.scale[0] = x;
            this.values.scale[1] = y;
            transform.set.call(this);
            return this;
        }
    };
    transform.prototype.rotate = function (reg) {
        if (arguments.length === 0) {
            return this.values.rotate;
        } else {
            (reg === undefined || reg === null) && (reg = 0);
            this.values.rotate = reg;
            transform.set.call(this);
            return this;
        }
    };
    transform.prototype.scale3d = function (x, y, z) {
        if (arguments.length === 0) {
            return this.values.scale3d;
        } else {
            (x === undefined || x === null) && (x = 1), (y === undefined || y === null) && (y = 1), (z === undefined || z === null) && (z = 1);
            this.values.scale3d[0] = x;
            this.values.scale3d[1] = y;
            this.values.scale3d[2] = z;
            transform.set.call(this);
            return this;
        }
    };
    transform.prototype.rotate3d = function (x, y, z, reg) {
        if (arguments.length === 0) {
            return this.values.rotate3d;
        } else {
            (x === undefined || x === null) && (x = 0), (y === undefined || y === null) && (y = 0), (z === undefined || z === null) && (z = 0), (reg === undefined || reg === null) && (reg = 0);
            this.values.rotate3d[0] = x;
            this.values.rotate3d[1] = y;
            this.values.rotate3d[2] = z;
            this.values.rotate3d[3] = reg;
            transform.set.call(this);
            return this;
        }
    };
    transform.prototype.skew = function (x, y) {
        if (arguments.length === 0) {
            return this.values.skew;
        } else {
            (x === undefined || x === null) && (x = 1), (y === undefined || y === null) && (y = 1);
            this.values.skew[0] = x;
            this.values.skew[1] = y;
            transform.set.call(this);
            return this;
        }
    };
    transform.prototype.x = function (x) {
        return transform.translate.apply(this, arguments.length === 0 ? [0, "translateX"] : [0, "translateX", x]);
    };
    transform.prototype.y = function (x) {
        return transform.translate.apply(this, arguments.length === 0 ? [1, "translateY"] : [1, "translateY", x]);
    };
    transform.prototype.z = function (x) {
        return transform.translate.apply(this, arguments.length === 0 ? [2, "translateZ"] : [2, "translateZ", x]);
    };
    transform.prototype.scaleX = function (x) {
        return transform.sett.apply(this, arguments.length === 0 ? ["scaleX", 1, x] : ["scaleX", 1, x]);
    };
    transform.prototype.scaleY = function (x) {
        return transform.sett.apply(this, arguments.length === 0 ? ["scaleY", 1, x] : ["scaleY", 1, x]);
    };
    transform.prototype.scaleZ = function (x) {
        return transform.sett.apply(this, arguments.length === 0 ? ["scaleZ", 1, x] : ["scaleZ", 1, x]);
    };
    transform.prototype.rotateX = function (x) {
        return transform.sett.apply(this, arguments.length === 0 ? ["rotateX", 0, x] : ["rotateX", 0, x]);
    };
    transform.prototype.rotateY = function (x) {
        return transform.sett.apply(this, arguments.length === 0 ? ["rotateY", 0, x] : ["rotateY", 0, x]);
    };
    transform.prototype.rotateZ = function (x) {
        return transform.sett.apply(this, arguments.length === 0 ? ["rotateZ", 0, x] : ["rotateZ", 0, x]);
    };
    transform.prototype.skewX = function (x) {
        return transform.sett.apply(this, arguments.length === 0 ? ["skewX", 0, x] : ["skewX", 0, x]);
    };
    transform.prototype.skewY = function (x) {
        return transform.sett.apply(this, arguments.length === 0 ? ["skewY", 0, x] : ["skewY", 0, x]);
    };
    transform.prototype.origin = function (a, b) {
        if (arguments.length === 0) {
            var a = this.dom.css(prefix.prefix + "transform-origin").split(" ");
            return {x: a[0], y: a[1]};
        } else if (arguments.length === 2) {
            return this.dom.css(prefix.prefix + "transform-origin", a + " " + b);
        }
    };
    transform.prototype.style = function (a) {
        if (arguments.length === 0) {
            return this.dom.css(prefix.prefix + "transform-style");
        } else {
            this.dom.css(prefix.prefix + "transform-style", a);
            return this;
        }
    };
    transform.prototype.perspective = function (a) {
        if (arguments.length === 0) {
            return this.dom.css(prefix.prefix + "perspective");
        } else {
            this.dom.css(prefix.prefix + "perspective", a);
            return this;
        }
    };
    transform.prototype.perspectiveOrigin = function () {
        if (arguments.length === 0) {
            var a = this.dom.css(prefix.prefix + "perspective-origin").split(" ");
            return {x: a[0], y: a[1]};
        } else if (arguments.length === 2) {
            return this.dom.css(prefix.prefix + "perspective-origin", a + " " + b);
        }
    };
    transform.prototype.backface = function () {
        if (arguments.length === 0) {
            return this.dom.css(prefix.prefix + "backface-visibility");
        } else {
            this.dom.css(prefix.prefix + "backface-visibility", a);
            return this;
        }
    };
    transform.prototype.clean = function () {
        for (var i in this) {
            this[i] = null;
        }
    };
    transform.prototype.dom = function () {
        return this.dom;
    };

    var query = function () {
    };
    query.prototype.get = function (a) {
        a = a / 1;
        if (is.isAvalid(a) && a >= 0 && a < this.nodes.length) {
            return this.nodes[a];
        } else {
            return null;
        }
    };
    query.prototype.ready = function (fn) {
        var a = /complete|loaded/;
        if (a.test(window.document.readyState)) {
            fn && fn();
        } else {
            window.document.addEventListener('DOMContentLoaded', function () {
                fn && fn();
            }, false);
        }
        return this;
    };
    query.prototype.find = function (selector) {
        var r = [];
        if (!this.isEmpty()) {
            if (is.isString(selector)) {
                r = domx.util.query(this.nodes[0], selector);
            }
        }
        return domx.util.getDom(r);
    };
    query.prototype.children = function (num) {
        var r = [];
        if (!this.isEmpty()) {
            if (is.isString(num)) {
                r = domx.util.queryChild(this.nodes[0], num);
            } else {
                if (arguments.length === 1 && num >= 0) {
                    r = this.nodes[0].children[num] ? [this.nodes[0].children[num]] : [];
                } else {
                    r = Array.prototype.slice.call(this.nodes[0].children);
                }
            }
        }
        return domx.util.getDom(r);
    };
    query.prototype.siblings = function (selector) {
        var r = [];
        if (!this.isEmpty()) {
            var a = [];
            if (is.isString(selector) && this.nodes[0].parentNode) {
                a = domx.util.queryChild(this.nodes[0].parentNode, selector);
            } else {
                a = this.nodes[0].parentNode ? Array.prototype.slice.call(this.nodes[0].parentNode.children) : [];
            }
            for (var i = 0; i < a.length; i++) {
                if (a[i] !== this.nodes[0]) {
                    r.push(a[i]);
                }
            }
        }
        return domx.util.getDom(r);
    };
    query.prototype.has = function (selector) {
        var r = [];
        for (var i = 0; i < this.nodes.length; i++) {
            var a = domx.util.queryChild(this.nodes[i], selector);
            if (a.length > 0) {
                r.push(this.nodes[i]);
            }
        }
        return domx.util.getDom(r);
    };
    query.prototype.index = function () {
        var a = -1;
        if (!this.isEmpty()) {
            var parent = this.nodes[0].parentNode;
            for (var i = 0; i < parent.children.length; i++) {
                if (parent.children[i] === this.nodes[0]) {
                    a = i;
                    break;
                }
            }
        }
        return a;
    };
    query.prototype.filter = function (selector) {
        var r = [];
        if (!this.isEmpty()) {
            var a = domx.util.query(window.document, selector);
            if (a.length > 0) {
                for (var i = 0; i < this.nodes.length; i++) {
                    (a.indexOf(this.nodes[i]) !== -1) && r.push(this.nodes[i]);
                }
            }
        }
        return domx.util.getDom(r);
    };
    query.prototype.first = function () {
        var r = [];
        if (!this.isEmpty()) {
            r.push(this.get(0));
        }
        return domx.util.getDom(r);
    };
    query.prototype.last = function () {
        var r = [];
        if (this.nodes.length > 0) {
            r.push(this.get(this.length - 1));
        }
        return domx.util.getDom(r);
    };
    query.prototype.parent = function () {
        var selector = arguments[0], r = [];
        if (!this.isEmpty()) {
            if (is.isString(selector)) {
                var n = domx.util.query(window.document, selector);
                var b = this.nodes[0].parentNode;
                while (b && !is.isDocument(b)) {
                    if (n.indexOf(b) !== -1) {
                        r.push(b);
                    }
                    b = b.parentNode;
                }
            } else if (is.isNumber(selector) && selector > 0) {
                var b = this.nodes[0].parentNode, c = selector - 1;
                while (b && !is.isDocument(b) && c > 0) {
                    c--;
                    b = b.parentNode;
                }
                r.push(b);
            } else {
                this.nodes[0].parentNode && r.push(this.nodes[0].parentNode);
            }
        }
        return domx.util.getDom(r);
    };
    query.prototype.parents = function () {
        var selector = arguments[0], r = [];
        if (!this.isEmpty()) {
            var b = this.nodes[0].parentNode;
            while (b && !is.isDocument(b)) {
                r.push(b);
                b = b.parentNode;
            }
            if (is.isString(selector)) {
                var n = domx.util.query(window.document, selector);
                r = r.filter(function (c) {
                    if (n.indexOf(c) !== -1) {
                        return true;
                    }
                });
            }
        }
        return domx.util.getDom(r);
    };
    query.prototype.next = function () {
        var r = [];
        if (!this.isEmpty()) {
            var a = this.nodes[0].nextSibling;
            while (a && a.nodeType !== 1) {
                a = a.nextSibling;
            }
            a && r.push(a);
        }
        return domx.util.getDom(r);
    };
    query.prototype.nexts = function (selector) {
        var r = [], ths = this;
        if (!this.isEmpty()) {
            var a = this.nodes[0].nextSibling;
            while (a) {
                if (a.nodeType === 1) {
                    r.push(a);
                }
                a = a.nextSibling;
            }
            if (is.isString(selector) && this.nodes[0].parentNode) {
                var c = domx.util.queryChild(this.nodes[0].parentNode, selector);
                r = r.filter(function (n) {
                    if (c.indexOf(n) !== -1 && n !== ths.nodes[0]) {
                        return true;
                    }
                });
            }
        }
        return domx.util.getDom(r);
    };
    query.prototype.prev = function () {
        var r = [];
        if (!this.isEmpty()) {
            var a = this.nodes[0].previousSibling;
            while (a && a.nodeType !== 1) {
                a = a.previousSibling;
            }
            a && r.push(a);
        }
        return domx.util.getDom(r);
    };
    query.prototype.prevs = function (selector) {
        var r = [], ths = this;
        if (!this.isEmpty()) {
            var a = this.nodes[0].previousSibling;
            while (a) {
                if (a.nodeType === 1) {
                    r.push(a);
                }
                a = a.previousSibling;
            }
            if (is.isString(selector) && this.nodes[0].parentNode) {
                var c = domx.util.queryChild(this.nodes[0].parentNode, selector);
                r = r.filter(function (n) {
                    if (c.indexOf(n) !== -1 && n !== ths.nodes[0]) {
                        return true;
                    }
                });
            }
        }
        return domx.util.getDom(r);
    };
    query.prototype.eq = function (index) {
        var r = [];
        if (index >= 0 && index < this.nodes.length) {
            r.push(this.nodes[index]);
        }
        return domx.util.getDom(r);
    };
    query.prototype.each = function (fn) {
        if (fn) {
            for (var i = 0; i < this.nodes.length; i++) {
                if (fn.call(this.nodes[i], i, this.nodes[i], this.nodes.length) === false) {
                    break;
                }
            }
        }
        return this;
    };
    query.prototype.remove = function () {
        var num = arguments[0];
        if (num && is.isNumber(num) && num < this.nodes.length) {
            var a = this.nodes[num];
            if (a) {
                domx.util.cleanNode(a);
                a.parentNode.removeChild(a);
            }
        } else if (is.isString(num)) {
            var c = domx.util.query(window.document, num);
            for (var i = 0; i < this.nodes.length; i++) {
                if (c.indexOf(this.nodes[i] !== -1)) {
                    this.nodes[i].parentNode && this.nodes[i].parentNode.removeChild(this.nodes[i]);
                }
            }
        } else {
            for (var i = 0; i < this.nodes.length; i++) {
                var a = this.nodes[i];
                if (a) {
                    domx.util.cleanNode(a);
                    a.parentNode.removeChild(a);
                }
            }
        }
        return this;
    };
    query.prototype.empty = function () {
        for (var t = 0; t < this.nodes.length; t++) {
            var c = this.nodes[t].children;
            for (var i = 0; i < c.length; i++) {
                c[i].nodeType && domx.util.cleanNode(c[i]);
            }
            this.nodes[t].innerHTML = "";
        }
    };
    query.prototype.clean = function () {
        for (var i = 0; i <= this.nodes.length; i++) {
            domx.util.cleanNode(this.nodes[i]);
        }
        this.nodes = null;
        this.length = 0;
    };
    query.prototype.clone = function () {
        var r = [];
        if (!this.isEmpty()) {
            r.push(this.nodes[0].cloneNode(true));
        }
        return domx.util.getDom(r);
    };
    query.prototype.wrap = function (htm) {
        for (var i = 0; i < this.nodes.length; i++) {
            var vv = null;
            if (is.isString(htm)) {
                vv = domx.util.parseHTML(htm)[0] || null;
            } else if (htm instanceof query) {
                vv = dom.nodes[0];
            } else if (htm.nodeType) {
                vv = htm;
            } else if (is.isFunction(htm)) {
                var b = htm();
                is.isString(b) && (vv = domx.util.parseHTML(htm)[0] || null);
            }
            if (vv) {
                var c = this.nodes[i];
                if (c.parentNode) {
                    c.parentNode.replaceChild(vv, c);
                    vv.appendChild(c);
                }
            }
        }
        return this;
    };
    query.prototype.append = function () {
        var a = arguments[0];
        if (!this.isEmpty()) {
            if (is.isString(a)) {
                var _c = domx.util.parseFlagment(a);
                for (var i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].appendChild(_c.cloneNode(true));
                }
            } else if (a instanceof query) {
                for (var i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].appendChild(a.nodes[0]);
                }
            } else if (a && a.nodeType) {
                for (var i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].appendChild(a);
                }
            } else if (is.isFunction(a)) {
                for (var i = 0; i < this.nodes.length; i++) {
                    var d = a.call(this.nodes[i], i, this.nodes[i].innerHTML);
                    domx.util.isHTML(d) && this.nodes[i].appendChild(domx.util.parseFlagment(d));
                }
            }
        }
        return this;
    };
    query.prototype.appendTo = function (a) {
        if (!this.isEmpty()) {
            if (is.isString(a)) {
                var b = domx.util.query(window.document, a);
                b.length > 0 && b[0].appendChild(this.nodes[0]);
            } else if (a instanceof query) {
                a.length > 0 && a.nodes[0].appendChild(this.nodes[0]);
            } else {
                a.appendChild(this.nodes[0]);
            }
        }
        return this;
    };
    query.prototype.insertBefore = function (a) {
        if (!this.isEmpty()) {
            if (is.isString(a)) {
                var cd = domx.util.query(window.document, a)[0];
                cd && cd.parentNode && cd.parentNode.insertBefore(this.nodes[0], cd);
            } else if (a instanceof query) {
                !a.isEmpty() && a.parent().get(0).insertBefore(this.nodes[0], a.get(0));
            } else {
                a.parentNode && a.parentNode.insertBefore(this.nodes[0], a);
            }
        }
        return this;
    };
    query.prototype.insertAfter = function (a) {
        if (!this.isEmpty()) {
            var newnode = null;
            if (is.isString(a)) {
                var newnode = domx.util.query(window.document, a)[0] || null;
            } else if (a instanceof query) {
                newnode = a.nodes[0] || null;
            } else if (a.nodeType) {
                newnode = a;
            }
            if (newnode) {
                if (newnode.nextSibling) {
                    newnode.parentNode.insertBefore(this.nodes[0], newnode.nextSibling);
                } else {
                    newnode.parentNode.appendChild(this.nodes[0]);
                }
            }
        }
        return this;
    };
    query.prototype.prepend = function () {
        var a = arguments[0];
        if (!this.isEmpty()) {
            if (is.isString(a)) {
                var _c = domx.util.parseFlagment(a);
                for (var i = 0; i < this.nodes.length; i++) {
                    if (this.nodes[i].childNodes.length !== 0) {
                        this.nodes[i].insertBefore(_c.cloneNode(true), this.nodes[i].firstChild);
                    } else {
                        this.nodes[i].appendChild(_c.cloneNode(true));
                    }
                }
            } else if (is.isFunction(a)) {
                for (var i = 0; i < this.nodes.length; i++) {
                    var d = a.call(this.nodes[i], i, this.nodes[i].innerHTML);
                    if (domx.util.isHTML(d)) {
                        if (this.nodes[i].childNodes.length > 0) {
                            this.nodes[i].insertBefore(domx.util.parseFlagment(d), this.nodes[i].firstChild);
                        } else {
                            this.nodes[i].appendChild(domx.util.parseFlagment(d));
                        }
                    }
                }
            }
        }
        return this;
    };
    query.prototype.prependTo = function (a) {
        if (!this.isEmpty()) {
            if (is.isString(a)) {
                var b = domx.util.query(window.document, a);
                if (b.length > 0) {
                    if (b[0].childNodes.length > 0) {
                        b[0].insertBefore(this.nodes[0], b[0].firstChild);
                    } else {
                        b[0].appendChild(this.nodes[0]);
                    }
                }
            } else if (a instanceof query) {
                if (!a.isEmpty()) {
                    if (a.nodes[0].childNodes.length > 0) {
                        a.nodes[0].insertBefore(this.nodes[0], a.nodes[0].firstChild);
                    } else {
                        a.nodes[0].appendChild(this.nodes[0]);
                    }
                }
            } else if (a.nodeType === 1) {
                if (a.children.length > 0) {
                    a.insertBefore(this.nodes[0], a.firstChild);
                } else {
                    a.appendChild(this.nodes[0]);
                }
            }
        }
        return this;
    };
    query.prototype.before = function (a) {
        if (!this.isEmpty() && this.nodes[0].parentNode) {
            if (is.isString(a)) {
                var _c = domx.util.parseFlagment(a);
                this.nodes[0].parentNode && this.nodes[0].parentNode.insertBefore(_c, this.nodes[0]);
            } else if (a instanceof dom) {
                this.nodes[0].parentNode && this.nodes[0].parentNode.insertBefore(a.nodes[0], this.nodes[0]);
            } else if (a.nodeType) {
                this.nodes[0].parentNode && this.nodes[0].parentNode.insertBefore(a, this.nodes[0]);
            }
        }
        return this;
    };
    query.prototype.after = function (a) {
        if (!this.isEmpty()) {
            var newnode = null;
            if (is.isString(a)) {
                newnode = domx.util.parseFlagment(a);
            } else if (a instanceof query) {
                newnode = a.get(0);
            } else if (a.nodeType) {
                newnode = a;
            }
            if (this.nodes[0].nextSibling) {
                this.nodes[0].parentNode && this.nodes[0].parentNode.insertBefore(newnode, this.nodes[0].nextSibling);
            } else {
                this.nodes[0].parentNode && this.nodes[0].parentNode.appendChild(newnode);
            }
        }
        return this;
    };
    query.prototype.replaceWith = function (a) {
        if (!this.isEmpty()) {
            var newnode = null;
            if (is.isString(a)) {
                newnode = domx.util.query(window.document, a)[0];
            } else if (a instanceof query) {
                newnode = a.nodes[0];
            } else if (a.nodeType) {
                newnode = a;
            }
            if (newnode) {
                newnode.parentNode.replaceChild(this.nodes[0], newnode);
            }
        }
        return this;
    };
    query.prototype.equal = function (a) {
        return this === a;
    };
    query.prototype.same = function (a) {
        var r = true;
        a = brooder(a);
        if (this.length === a.length) {
            for (var i = 0; i < this.nodes.length; i++) {
                if (a.nodes.indexOf(this.nodes[i]) === -1) {
                    r = false;
                    break;
                }
            }
        } else {
            r = false;
        }
        return r;
    };
    query.prototype.css = function (a, b) {
        var t = this;
        if (!this.isEmpty()) {
            if (arguments.length === 1 && is.isObject(a)) {
                a = prefix.fix(a);
                for (var i = 0; i < this.nodes.length; i++) {
                    var str = this.nodes[i].style.cssText + ";";
                    for (var j in a) {
                        str += j + ":" + a[j] + ";";
                    }
                    this.nodes[i].style.cssText = str;
                }
            } else if (arguments.length === 1 && is.isString(a)) {
                a = prefix.fix(a);
                t = window.getComputedStyle(this.nodes[0], '').getPropertyValue(a);
            } else if (arguments.length === 2) {
                for (var i = 0; i < this.nodes.length; i++) {
                    var c = prefix.fix(a);
                    this.nodes[i].style[domx.util.propertyName(c)] = b;
                }
            }
        }
        return t;
    };
    query.prototype.attr = function (a, b) {
        var tp = this;
        if (!this.isEmpty()) {
            if (arguments.length === 2) {
                if (a !== "") {
                    for (var i = 0; i < this.nodes.length; i++) {
                        this.nodes[i].setAttribute(a, b);
                    }
                }
            } else if (arguments.length === 1) {
                if (is.isObject(a)) {
                    for (var t = 0; t < this.nodes.length; t++) {
                        for (var i in a) {
                            if (i !== "") {
                                this.nodes[t].setAttribute(i, a[i]);
                            }
                        }
                    }
                } else if (a) {
                    tp = this.nodes[0].getAttribute(a);
                }
            }
        }
        return tp;
    };
    query.prototype.removeAttr = function (name) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].removeAttribute(name);
        }
        return this;
    };
    query.prototype.data = function (a, b) {
        var c = null;
        if (!this.isEmpty()) {
            if (arguments.length === 1) {
                if (!this.nodes[0].datasets) {
                    this.nodes[0].datasets = {
                    };
                }
                if (is.isString(a)) {
                    if (this.nodes[0].datasets[a] !== undefined && this.nodes[0].datasets[a] !== null) {
                        c = this.nodes[0].datasets[a];
                    }
                } else if (is.isObject(a)) {
                    brooder.extend(this.nodes[0].datasets, a);
                }
            } else if (arguments.length === 2) {
                this.addClass("incache");
                for (var i = 0; i < this.nodes.length; i++) {
                    if (!this.nodes[i].datasets) {
                        this.nodes[i].datasets = {
                        };
                    }
                    this.nodes[i].datasets[a] = b;
                }
                c = this;
            }
        }
        return c;
    };
    query.prototype.removeData = function (a) {
        if (!this.isEmpty()) {
            if (arguments.length === 1) {
                this.data(a, null);
            }
        }
        return this;
    };
    query.prototype.dataset = function (name, value) {
        var _a = this;
        if (this.nodes.length > 0) {
            if (arguments.length === 1) {
                if (is.isString(name)) {
                    _a = this.nodes[0].dataset[name];
                } else if (is.isObject(name)) {
                    for (var i in name) {
                        this.nodes[0].dataset[i] = name[i];
                    }
                }
            } else if (arguments.length === 2) {
                for (var i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].dataset[name] = value;
                }
            } else if (arguments.length === 0) {
                _a = this.nodes[0].dataset;
            }
        }
        return _a;
    };
    query.prototype.create = function (tagName, ns) {
        if (tagName) {
            if (ns) {
                this.nodes = [window.document.createElementNS(ns, tagName)];
            } else {
                this.nodes = [window.document.createElement(tagName)];
            }
        } else {
            this.nodes = [window.document.createDocumentFragment()];
        }
        this.length = this.nodes.length;
        return this;
    };
    query.prototype.element = function (tagName, ns) {
        if (tagName) {
            if (ns) {
                this.nodes = [window.document.createElementNS(ns, tagName)];
            } else {
                this.nodes = [window.document.createElement(tagName)];
            }
        } else {
            this.nodes = [window.document.createDocumentFragment()];
        }
        this.length = this.nodes.length;
        return this;
    };
    query.prototype.width = function (a) {
        if (arguments.length === 1) {
            if (is.isNumber(a)) {
                a = a + "px";
            }
            this.css("width", a);
            return this;
        } else {
            return this.nodes[0].offsetWidth;
        }
    };
    query.prototype.height = function (a) {
        if (arguments.length === 1) {
            if (is.isNumber(a)) {
                a = a + "px";
            }
            this.css("height", a);
            return this;
        } else {
            return this.nodes[0].offsetHeight;
        }
    };
    query.prototype.offset = function () {
        if (!this.isEmpty()) {
            var obj = this.nodes[0].getBoundingClientRect();
            return {
                left: obj.left + window.pageXOffset,
                top: obj.top + window.pageYOffset,
                width: obj.width,
                height: obj.height
            };
        } else {
            return null;
        }
    };
    query.prototype.hide = function () {
        for (var i = 0; i < this.nodes.length; i++) {
            var ds = window.getComputedStyle(this.nodes[i], '').getPropertyValue("display");
            if (ds !== "none") {
                this.nodes[i].setAttribute("ds", ds);
                this.nodes[i].style.display = "none";
            }
        }
        return this;
    };
    query.prototype.show = function () {
        for (var i = 0; i < this.nodes.length; i++) {
            var ds = window.getComputedStyle(this.nodes[i], '').getPropertyValue("display");
            if (ds === "none") {
                var a = this.nodes[i].getAttribute("ds");
                if (a) {
                    this.nodes[i].removeAttribute("ds");
                    this.nodes[i].style.display = a;
                } else {
                    this.nodes[i].style.display = "block";
                }
            }
        }
        return this;
    };
    query.prototype.visible = function (bole) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (bole) {
                this.nodes[i].style["visibility"] = "visible";
            } else {
                this.nodes[i].style["visibility"] = "hidden";
            }
        }
        return this;
    };
    query.prototype.html = function (tags) {
        var t = this;
        if (!this.isEmpty()) {
            if (arguments.length === 1) {
                for (var i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].innerHTML = tags;
                }
            } else {
                t = this.nodes[0].innerHTML;
            }
        }
        return t;
    };
    query.prototype.outer = function () {
        if (!this.isEmpty()) {
            return this.nodes[0].outerHTML;
        }
        return "";
    };
    query.prototype.text = function (text) {
        var t = this;
        if (!this.isEmpty()) {
            if (arguments.length === 1) {
                for (var i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].innerText = text;
                }
            } else {
                t = this.nodes[0].innerText;
            }
        }
        return t;
    };
    query.prototype.val = function (a) {
        var t = this;
        if (!this.isEmpty()) {
            if (arguments.length === 1) {
                for (var i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].value = a;
                }
            } else {
                t = this.nodes[0].value;
            }
        }
        return t;
    };
    query.prototype.addClass = function (a) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].classList) {
                this.nodes[i].classList.add(a);
            } else {
                if (this.nodes[i].className.indexOf(a) === -1) {
                    this.nodes[i].className = this.nodes[i].className + " " + a;
                }
            }
        }
        return this;
    };
    query.prototype.removeClass = function (a) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].classList) {
                this.nodes[i].classList.remove(a);
            } else {
                if (this.nodes[i].className.indexOf(a) !== -1) {
                    var reg = new RegExp('(\\s|^)' + a + '(\\s|$)');
                    this.nodes[i].className = this.nodes[i].className.replace(reg, ' ');
                }
            }
        }
        return this;
    };
    query.prototype.contains = function (a) {
        if (!this.isEmpty()) {
            var b = brooder(a);
            if (!b.isEmpty()) {
                return this.nodes[0].contains(b.nodes[0]);
            }
        }
        return false;
    };
    query.prototype.contain = function (a) {
        return this.same(a) || this.contains(a);
    };
    query.prototype.hasClass = function (a) {
        var _a = false;
        if (!this.isEmpty()) {
            if (this.nodes[0].classList) {
                _a = this.nodes[0].classList.contains(a);
            } else {
                _a = this.nodes[0].className.indexOf(a) === -1;
            }
        }
        return _a;
    };
    query.prototype.toggleClass = function (a) {
        if (!this.isEmpty()) {
            if (this.nodes[0].classList) {
                this.nodes[0].classList.toggle(a);
            } else {
                if (this.nodes[0].className.indexOf(a) !== -1) {
                    var reg = new RegExp('(\\s|^)' + a + '(\\s|$)');
                    for (var i = 0; i < this.nodes.length; i++) {
                        this.nodes[i].className = this.nodes[i].className.replace(reg, ' ');
                    }
                } else {
                    for (var i = 0; i < this.nodes.length; i++) {
                        this.nodes[i].className = this.nodes[i].className + " " + a;
                    }
                }
            }
        }
        return this;
    };
    query.prototype.scrollTop = function (top) {
        var a = this;
        if (arguments.length === 0) {
            if (!this.isEmpty()) {
                a = ('scrollTop' in this.nodes[0]) ? this.nodes[0].scrollTop : this.nodes[0].scrollY;
            } else {
                a = null;
            }
        } else {
            for (var i = 0; i < this.nodes.length; i++) {
                if ('scrollTop' in this.nodes[i]) {
                    this.nodes[i].scrollTop = top;
                } else {
                    this.nodes[i].scrollY = top;
                }
            }
        }
        return a;
    };
    query.prototype.scrollLeft = function (left) {
        var a = this;
        if (arguments.length === 0) {
            if (!this.isEmpty()) {
                a = ('scrollLeft' in this.nodes[0]) ? this.nodes[0].scrollLeft : this.nodes[0].scrollX;
            } else {
                a = null;
            }
        } else {
            for (var i = 0; i < this.nodes.length; i++) {
                if ('scrollLeft' in this.nodes[i]) {
                    this.nodes[i].scrollLeft = left;
                } else {
                    this.nodes[i].scrollX = left;
                }
            }
        }
        return a;
    };
    query.prototype.click = function (fn) {
        if (arguments.length === 1) {
            this.bind("click", fn);
        } else {
            this.trigger("click");
        }
        return this;
    };
    query.prototype.load = function (fn) {
        if (arguments.length === 1) {
            this.bind("load", fn);
        } else {
            this.trigger("load");
        }
        return this;
    };
    query.prototype.trigger = function (type, data) {
        return event.util.trigger(this, type, data);
    };
    query.prototype.bind = function (type, fn) {
        return event.util.bind(this, type, fn);
    };
    query.prototype.unbind = function (type, fn) {
        return event.util.unbind(this, type, fn);
    };
    query.prototype.isEmpty = function (fn) {
        if (arguments.length === 0) {
            return this.nodes.length === 0;
        } else {
            if (is.isFunction(fn)) {
                fn.call(this, this.nodes.length === 0);
                return this;
            }
            return this;
        }
    };
    query.prototype.isWrapper = function () {
        return this instanceof query;
    };
    query.prototype.add = function (a) {
        var k = brooder(a);
        this.nodes = this.nodes.concat(k.nodes);
        this.length = this.nodes.length;
        return this;
    };
    query.prototype.prop = function (name, value) {
        for (var i = 0; i < this.nodes.length; i++) {
            var val = this.nodes[i][name];
            if (val !== undefined) {
                if (is.isFunction(value)) {
                    this.nodes[i][name] = value.call(this.nodes[i], i, val);
                } else {
                    this.nodes[i][name] = value;
                }
            }
        }
        return this;
    };
    query.prototype.position = function (a, b) {
        if (arguments.length === 0) {
            var a = this.offsetParent();
            if (a.length > 0 && !is.isDocument(a.get(0))) {
                return {
                    left: this.css("left"),
                    top: this.css("top")
                };
            } else {
                return this.offset();
            }
        } else {
            a && this.css("left", a);
            b && this.css("top", b);
            return this;
        }
    };
    query.prototype.offsetParent = function () {
        var r = [];
        if (!this.isEmpty()) {
            if (this.nodes[0].offsetParent === undefined) {
                var a = this.nodes[0].parentNode;
                while (a && !domx.regs.root.test(a.nodeName) && window.getComputedStyle(a, '').getPropertyValue("position") === "static") {
                    a = a.parentNode;
                }
                r.push(a);
            } else {
                r.push(this.nodes[0].offsetParent);
            }
        }
        return domx.util.getDom(r);
    };
    query.prototype.scrollingLeft = function (scrollLeft, time, type) {
        var promise = brooder.promise().scope(this), ths = this;
        if (this.scrollLeft() !== scrollLeft) {
            new tween({
                from: this.scrollLeft(),
                to: scrollLeft,
                during: time,
                fn: type,
                onrunning: function (a) {
                    ths.scrollLeft(a);
                },
                onend: function () {
                    promise.resolve();
                }
            }).start();
        } else {
            promise.resolve();
        }
        return promise;
    };
    query.prototype.scrollingTop = function (scrollTop, time, type) {
        var promise = brooder.promise().scope(this), ths = this;
        if (this.scrollTop() !== scrollTop) {
            new tween({
                from: this.scrollTop(),
                to: scrollTop,
                during: time,
                fn: type,
                onrunning: function (a) {
                    ths.scrollTop(a);
                },
                onend: function () {
                    promise.resolve();
                }
            }).start();
        } else {
            promise.resolve();
        }
        return promise;
    };
    query.prototype.transition = function () {
        var trans = this.data("_transition_");
        if (!trans) {
            trans = new transition(this);
        }
        return trans;
    };
    query.prototype.animate = function (cssset, option) {
        var dom = this;
        var ani = this.data("_animate_");
        var ops = {
            duration: 350,
            delay: 0,
            type: "ease-out"
        };
        brooder.extend(ops, option);
        cssset = prefix.fix(cssset);
        var v = "";
        for (var i in cssset) {
            v += i + " " + ops.duration + "ms " + ops.type + " " + ops.delay + "ms,";
        }
        if (v.length > 0) {
            v = v.substring(0, v.length - 1);
        }
        if (!ani) {
            var promise = brooder.promise().scope(dom);
            var _endHandler = function (e) {
                dom.get(0).removeEventListener(prefix.transitionEnd, _endHandler, false);
                promise.resolve(e);
            };
            dom.css(prefix.prefix + "transition", v).get(0).addEventListener(prefix.transitionEnd, _endHandler, false);
            dom.css(cssset);
            dom.data("_animate_", promise);
            ani = promise;
        } else {
            ani.then(function () {
                var promise = brooder.promise().scope(dom);
                var _endHandler = function (e) {
                    dom.get(0).removeEventListener(prefix.transitionEnd, _endHandler, false);
                    promise.resolve(e);
                };
                dom.css(prefix.prefix + "transition", v).get(0).addEventListener(prefix.transitionEnd, _endHandler, false);
                dom.css(cssset);
                return promise;
            });
        }
        return ani;
    };
    query.prototype.transform = function (attrs) {
        var a = this.data("_transform_");
        if (!a) {
            a = new transform(this, Array.prototype.slice.call(arguments));
        }
        return a;
    };
    dom.prototype = new query();
    var windoc = function (obj) {
        this.obj = obj;
    };
    windoc.prototype.width = function () {
        return window.innerWidth;
    };
    windoc.prototype.height = function () {
        return window.innerHeight;
    };
    windoc.prototype.bind = function (type, fn) {
        if (is.isWindow(this.obj)) {
            window.addEventListener(type, fn, false);
        } else {
            this.nodes = [this.obj];
            event.util.bind(this, type, fn);
        }
        return this;
    };
    windoc.prototype.unbind = function (type, fn) {
        if (is.isWindow(this.obj)) {
            window.removeEventListener(type, fn, false);
        } else {
            this.nodes = [this.obj];
            event.util.bind(this, type, fn);
        }
        return this;
    };
    windoc.prototype.scrollTop = function (top) {
        var a = this;
        if (arguments.length === 0) {
            a = document.body.scrollTop || document.documentElement.scrollTop;
        } else {
            document.body.scrollTop = top;
            document.documentElement.scrollTop = top;
        }
        return a;
    };
    windoc.prototype.scrollLeft = function (left) {
        var a = this;
        if (arguments.length === 0) {
            a = document.body.scrollLeft || document.documentElement.scrollLeft;
        } else {
            document.body.scrollLeft = left;
        }
        return a;
    };
    windoc.prototype.scrollingLeft = function (scrollLeft, time, type) {
        var promise = brooder.promise().scope(this), ths = this;
        if (this.scrollLeft() !== scrollLeft) {
            new tween({
                from: this.scrollLeft(),
                to: scrollLeft,
                during: time,
                fn: type,
                onrunning: function (a) {
                    ths.scrollLeft(a);
                },
                onend: function () {
                    promise.resolve();
                }
            }).start();
        } else {
            promise.resolve();
        }
        return promise;
    };
    windoc.prototype.scrollingTop = function (scrollTop, time, type) {
        var promise = brooder.promise().scope(this), ths = this;
        if (this.scrollTop() !== scrollTop) {
            new tween({
                from: this.scrollTop(),
                to: scrollTop,
                during: time,
                fn: type,
                onrunning: function (a) {
                    ths.scrollTop(a);
                },
                onend: function () {
                    promise.resolve();
                }
            }).start();
        } else {
            promise.resolve();
        }
        return promise;
    };
    var event = function (data) {
        this.currentTarget = null;
        this.target = null;
        this.timeStamp = new Date().getTime();
        this.type = "";
        this.cancelable = false;
        this._stop = false;
        this.data = data;
    };
    event.prototype.stopPropagation = function () {
        this._stop = true;
    };
    event.prototype.preventDefault = function () {
        this.cancelable = true;
    };
    event.trigger = function (e) {
        var events = e.currentTarget.events[e.type];
        for (var i in events) {
            events[i].call(e.currentTarget, e);
        }
    };
    event.util = {
        types: {
            HTMLEvents: "load,unload,abort,error,select,change,submit,reset,focus,blur,resize,scroll",
            MouseEvent: "click,mousedown,mouseup,mouseover,mousemove,mouseout",
            UIEvent: "DOMFocusIn,DOMFocusOut,DOMActivate",
            MutationEvent: "DOMSubtreeModified,DOMNodeInserted,DOMNodeRemoved,DOMNodeRemovedFromDocument,DOMNodeInsertedIntoDocument,DOMAttrModified,DOMCharacterDataModified"
        },
        isEvent: function (type) {
            var result = {
                type: type,
                interfaceName: null
            };
            for (var i in event.util.types) {
                if (event.util.types[i].indexOf(type) !== -1) {
                    result.interfaceName = i;
                    break;
                }
            }
            return result;
        },
        bind: function (dom, type, fn) {
            for (var i = 0; i < dom.nodes.length; i++) {
                if (!dom.nodes[i].events) {
                    dom.nodes[i].events = {
                    };
                }
                if (dom.nodes[i].events[type]) {
                    dom.nodes[i].events[type].push(fn);
                } else {
                    dom.nodes[i].events[type] = [];
                    dom.nodes[i].events[type].push(fn);
                }
                dom.nodes[i].addEventListener(type, event.trigger, false);
            }
            return dom;
        },
        unbind: function (dom, type, fn) {
            for (var i = 0; i < dom.nodes.length; i++) {
                var b = dom.nodes[i];
                if (b.events) {
                    if (type && type !== "") {
                        var events = b.events[type];
                        if (events) {
                            b.removeEventListener(type, event.trigger, false);
                            if (is.isFunction(fn)) {
                                for (var i in events) {
                                    if (events[i] === fn) {
                                        events.splice(i, 1);
                                    }
                                }
                            } else {
                                events.length = 0;
                            }
                        }
                    } else {
                        var c = b.events;
                        for (var i in c) {
                            b.removeEventListener(i, event.trigger, false);
                            c[i].length = 0;
                        }
                    }
                }
            }
            return dom;
        },
        unbindAll: function (dom) {
            var a = dom.nodes;
            for (var i = 0; i < a.length; i++) {
                var b = a[i].events;
                for (var j in b) {
                    a[i].removeEventListener(j, event.trigger, false);
                    b[j].length = 0;
                }
            }
            return dom;
        },
        unbindnode: function (node) {
            var b = node.events;
            for (var j in b) {
                node.removeEventListener(j, event.trigger, false);
                b[j].length = 0;
            }
        },
        trigger: function (dom, type, data) {
            var a = this.isEvent(type);
            if (a.interfaceName) {
                var eventx = document.createEvent(a.interfaceName);
                switch (a.interfaceName) {
                    case "MouseEvent":
                        eventx.initMouseEvent(type, true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        break;
                    case "HTMLEvents":
                        eventx.initEvent(type, true, false, window);
                        break;
                    case "UIEvents":
                        eventx.initUIEvents(type, true, false, window, null);
                        break
                    case "MutationEvent ":
                        eventx.initMutationEvent(type, true, false, window, null, null, null, null);
                        break;
                }
                for (var i = 0; i < dom.nodes.length; i++) {
                    dom.nodes[i].dispatchEvent(eventx);
                }
            } else {
                var _c = new event(data);
                _c.type = type;
                _c.target = dom.nodes[0];
                var _parent = dom.nodes[0];
                while (_parent) {
                    _c.currentTarget = _parent;
                    if (_parent.events && _parent.events[type]) {
                        var events = _parent.events[type];
                        for (var i in events) {
                            events[i].call(_parent, _c);
                        }
                    }
                    if (_c._stop) {
                        break;
                    }
                    _parent = _parent.parentNode;
                }
            }
            return dom;
        }
    };

    var tweenmapping = {
        "linner": function (t, b, c, d) {
            return c * t / d + b;
        },
        "ease-in-quad": function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        "ease-out-quad": function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        "ease-in-out-quad": function (t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        "ease-in-cubic": function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        "ease-out-cubic": function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        "ease-in-out-cubic": function (t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        "ease-in-quart": function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        "ease-out-quart": function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        "ease-in-out-quart": function (t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        "ease-in-quint": function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        "ease-out-quint": function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        "ease-in-out-quint": function (t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        "ease-in-sine": function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        "ease-out-sine": function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        "ease-in-out-sine": function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        "ease-in-expo": function (t, b, c, d) {
            return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        "ease-out-expo": function (t, b, c, d) {
            return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        "ease-in-out-expo": function (t, b, c, d) {
            if (t === 0)
                return b;
            if (t === d)
                return b + c;
            if ((t /= d / 2) < 1)
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        "ease-in-circ": function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        "ease-out-circ": function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        "ease-in-out-circ": function (t, b, c, d) {
            if ((t /= d / 2) < 1)
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        "ease-in-elastic": function (t, b, c, d, a, p) {
            var s;
            if (t === 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (typeof p === "undefined")
                p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        "ease-out-elastic": function (t, b, c, d, a, p) {
            var s;
            if (t === 0)
                return b;
            if ((t /= d) === 1)
                return b + c;
            if (typeof p === "undefined")
                p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        "ease-in-out-elastic": function (t, b, c, d, a, p) {
            var s;
            if (t === 0)
                return b;
            if ((t /= d / 2) === 2)
                return b + c;
            if (typeof p === "undefined")
                p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1)
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        "ease-in-back": function (t, b, c, d, s) {
            if (typeof s === "undefined")
                s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        "ease-out-back": function (t, b, c, d, s) {
            if (typeof s === "undefined")
                s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        "ease-in-out-back": function (t, b, c, d, s) {
            if (typeof s === "undefined")
                s = 1.70158;
            if ((t /= d / 2) < 1)
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        "ease-in-bounce": function (t, b, c, d) {
            return c - tweenmapping["ease-out-bounce"](d - t, 0, c, d) + b;
        },
        "ease-out-bounce": function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        "ease-in-out-bounce": function (t, b, c, d) {
            if (t < d / 2) {
                return tweenmapping["ease-in-bounce"](t * 2, 0, c, d) * .5 + b;
            } else {
                return tweenmapping["ease-out-bounce"](t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    };
    var tween = function (option) {
        this.from = is.isAvalid(option.from) ? option.from : 0;
        this.to = is.isAvalid(option.to) ? option.to : 100;
        if (is.isString(option.fn)) {
            this.fn = tweenmapping[option.type] || tweenmapping["ease-out-quart"];
        } else if (is.isFunction(option.fn)) {
            this.fn = option.fn;
        } else {
            this.fn = tweenmapping["ease-out-quart"];
        }
        this.during = Math.round((option.during || 1000) / 16.7);
        this.onrunning = option.onrunning;
        this.onend = option.onend;
        this.delay = is.isAvalid(option.delay) ? option.delay : 0;
        this.isstop = true;
    };
    tween._run = function () {
        var start = 0, during = this.during, offset = this.to - this.from, ths = this;
        var run = function () {
            start++;
            ths.onrunning && ths.onrunning.call(ths, ths.fn(start, ths.from, offset, during));
            if (start < during && !ths.isstop) {
                requestAnimationFrame(run);
            } else {
                ths.onend && ths.onend.call(ths);
                ths.isstop = true;
            }
        };
        run();
    };
    tween._runs = function () {
        var start = 0, during = this.during;
        var offset = [], ths = this;
        for (var i = 0; i < this.from.length; i++) {
            offset.push(this.to[i] || 0 - this.from[i]);
        }
        var run = function () {
            start++;
            var news = [];
            for (var i = 0; i < ths.from.length; i++) {
                news.push(ths.fn(start, ths.from[i], offset[i], during));
            }
            ths.onrunning && ths.onrunning.call(ths, news);
            if (start < during && !ths.isstop) {
                requestAnimationFrame(run);
            } else {
                ths.onend && ths.onend.call(ths);
                ths.isstop = true;
            }
        };
        run();
    };
    tween._runo = function () {
        var start = 0, during = this.during;
        var offset = {}, ths = this;
        for (var i in this.from) {
            offset[i] = this.to[i] || 0 - this.from[i];
        }
        var run = function () {
            start++;
            var news = {};
            for (var i in ths.from) {
                news[i] = ths.fn(start, ths.from[i], offset[i], during);
            }
            ths.onrunning && ths.onrunning.call(ths, news);
            if (start < during && !ths.isstop) {
                requestAnimationFrame(run);
            } else {
                ths.onend && ths.onend.call(ths);
                ths.isstop = true;
            }
        };
        run();
    };
    tween.prototype.start = function () {
        var ths = this;
        this.isstop = false;
        setTimeout(function () {
            if (is.isArray(ths.from)) {
                tween._runs.call(ths);
            } else if (is.isObject(ths.from)) {
                tween._runo.call(ths);
            } else if (is.isNumber(ths.from)) {
                tween._run.call(ths);
            }
        }, this.delay);
        return this;
    };
    tween.prototype.stop = function () {
        this.isstop = true;
        return this;
    };
    tween.prototype.isRunning = function () {
        return this.isstop === true;
    };
    tween.prototype.clean = function () {
        for (var i in this) {
            this[i] = null;
        }
    };
    brooder.tween = function (option) {
        return new tween(option);
    };

    var request = function (option) {
        this.mimeType = null;
        this.data = option.data || "";
        this.url = option.url || "";
        this.realURL = option.url || "";
        this.type = option.type || "post";
        this.realType = option.dataType || "text";
        this.dataType = ["arraybuffer", "blob", "document", "text"].indexOf(option.dataType) !== -1 ? option.dataType : "text";
        this.async = option.async === false ? false : true;
        this.timeout = option.timeout || 3000000;
        this.headers = option.headers || {};
        this.events = brooder.extend({
            readystatechange: null,
            loadstart: null,
            progress: null,
            abort: null,
            error: null,
            load: null,
            timeout: null,
            loadend: null
        }, option.events);
        var ths = this;
        this._eventproxy = function (e) {
            var deal = ths.events[e.type];
            ths.response = this;
            deal && deal.call(ths, e);
            if (e.type === "loadend") {
                ths.clean();
            }
        };
        this._uploadproxy = function (e) {
            var deal = ths.events[e.type];
            ths.response = this;
            deal && deal.call(ths, e);
        };
        this.xhr = new XMLHttpRequest();
    };
    request.prototype.clean = function () {
        for (var i in this.events) {
            if (i === "progress") {
                this.xhr.upload.removeEventListener(i, this._uploadproxy, false);
            } else {
                this.xhr.removeEventListener(i, this._eventproxy, false);
            }
        }
        for (var i in this) {
            this[i] = null;
        }
    };
    request.prototype.abort = function () {
        this.xhr.abort();
        return this;
    };
    request.prototype.header = function (params, val) {
        if (arguments.length === 1) {
            for (var i in params) {
                this.headers[i] = params[i];
            }
        } else {
            this.headers[params] = val;
        }
        return this;
    };
    request.prototype.bind = function (type, fn) {
        if (arguments.length === 1) {
            for (var i in type) {
                this.events[i] = type[i];
            }
        } else {
            this.events[type] = fn;
        }
        return this;
    };
    request.prototype.unbind = function (type, fn) {
        var m = this.events[type];
        for (var i in m) {
            if (m[i] === fn) {
                m[i] = null;
            }
        }
        return this;
    };
    request.prototype.fire = function () {
        if (this.mimeType) {
            this.xhr.overrideMimeType(this.mimeType);
        }
        if (this.type === "get") {
            var querystr = serialize.queryString(this.data);
            this.url += (this.url.indexOf("?") !== -1 ? (querystr === "" ? "" : "&" + querystr) : (querystr === "" ? "" : "?" + querystr));
        } else {
            this.data = serialize.postData(this.data);
        }
        this.xhr.open(this.type, this.url, this.async);
        if (this.async) {
            this.xhr.responseType = this.dataType;
            this.xhr.timeout = this.timeout;
        }
        for (var i in this.events) {
            if (i === "progress") {
                this.xhr.upload.addEventListener(i, this._uploadproxy, false);
            } else {
                this.xhr.addEventListener(i, this._eventproxy, false);
            }
        }
        for (var i in this.headers) {
            this.xhr.setRequestHeader(i, this.headers[i]);
        }
        if (is.isQueryString(this.data)) {
            this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        this.xhr.send(this.data);
        return this;
    };
    brooder.ajax = function (option) {
        var pros = new promise();
        if (option) {
            option.events = brooder.extend({
                error: function (e) {
                    option.error && option.error.call(this, e);
                    pros.reject(e);
                },
                load: function (e) {
                    var status = this.response.status;
                    if ((status >= 200 && status < 300) || status === 304) {
                        var result = this.response.response;
                        if (this.realType === "json") {
                            var txt = this.response.responseText;
                            try {
                                result = serialize.parse(txt);
                            } catch (e) {
                                throw Error("[brooder] ajax unvaliable json string,url is '" + option.url + "'");
                            }
                        }
                        option.success && option.success.call(this, result);
                        pros.resolve(result);
                    } else {
                        option.error && option.error.call(this, e);
                        pros.reject(this.response);
                    }
                }
            }, option.events);
            new request(option).fire();
            return pros;
        } else {
            return pros.resolve();
        }
    };
    brooder.request = function (option) {
        return new request(option);
    };

    var loader = {
        importsmapping: {
            js: [],
            css: [],
            hasJs: function (path) {
                return this.js.indexOf(path) !== -1 ? true : false;
            },
            hasCss: function (path) {
                return this.css.indexOf(path) !== -1 ? true : false;
            },
            addJs: function (path) {
                this.js.push(path);
                return this;
            },
            addCss: function (path) {
                this.css.push(path);
                return this;
            }
        },
        css: function (csspath, callback, error, async) {
            if (async === undefined || async === null) {
                async = false;
            }
            if (!loader.importsmapping.hasCss(csspath)) {
                if (!async) {
                    var _a = document.createElement("link"), interval = null;
                    _a.href = csspath;
                    _a.type = "text/css";
                    _a.rel = "stylesheet";
                    var _oe = function (e) {
                        _a.removeEventListener("error", _oe);
                        _a.removeEventListener("load", _ol);
                        error && error.call(e.target, e);
                    };
                    var _ol = function (e) {
                        _a.removeEventListener("error", _oe);
                        _a.removeEventListener("load", _ol);
                        if (callback) {
                            clearTimeout(interval);
                            callback.call(e.target, e);
                        }
                    };
                    _a.addEventListener("error", _oe, false);
                    _a.addEventListener("load", _ol, false);
                    document.getElementsByTagName("head")[0].appendChild(_a);
                    loader.importsmapping.addCss(csspath);
                    var tpt = function () {
                        try {
                            if (_a.sheet.cssRules) {
                                if (_a.sheet.cssRules.length > 0) {
                                    _a.removeEventListener("error", _oe);
                                    _a.removeEventListener("load", _ol);
                                    callback && callback.call(_a);
                                }
                            }
                        } catch (e) {
                            interval = setTimeout(tpt, 100);
                        }
                    };
                    tpt();
                } else {
                    brooder.ajax({
                        url: csspath,
                        dataType: "text",
                        type: "get",
                        async: true,
                        success: function (e) {
                            var _a = document.createElement("style");
                            _a.type = "text/css";
                            _a.styleSheet.cssText = e;
                            _a.setAttribute("media", "screen");
                            document.getElementsByTagName("head")[0].appendChild(_a);
                            if (callback) {
                                callback();
                            }
                        },
                        error: function (e) {
                            if (error) {
                                error();
                            }
                        }
                    });
                    loader.importsmapping.addJs(csspath);
                }
            } else {
                callback && callback();
            }
            return this;
        },
        js: function (jspath, callback, error, charset, async) {
            if (async === undefined || async === null) {
                async = true;
            }
            if (!loader.importsmapping.hasJs(jspath)) {
                if (async) {
                    var _ol = function (e) {
                        e.target.removeEventListener("load", _ol);
                        e.target.removeEventListener("error", _oe);
                        if (callback)
                            callback.call(e.target, e);
                    };
                    var _oe = function (e) {
                        e.target.removeEventListener("load", _ol);
                        e.target.removeEventListener("error", _oe);
                        if (error)
                            error.call(e.target, e);
                    };
                    var _a = document.createElement("script");
                    _a.src = jspath;
                    _a.type = "text/javascript";
                    if (charset && charset !== "")
                        _a.charset = charset;
                    _a.addEventListener("load", _ol, false);
                    _a.addEventListener("error", _oe, false);
                    document.getElementsByTagName("head")[0].appendChild(_a);
                    loader.importsmapping.addJs(jspath);
                } else {
                    brooder.ajax({
                        url: jspath,
                        dataType: "text",
                        type: "get",
                        async: false,
                        success: function (e) {
                            (new Function("try{" + e + "}catch(e){console.error('[brooder]imports: %s ,path " + jspath + "',e.message);}"))();
                            if (callback) {
                                callback();
                            }
                        },
                        error: function (e) {
                            if (error) {
                                error();
                            }
                        }
                    });
                    loader.importsmapping.addJs(jspath);
                }
            } else {
                if (callback)
                    callback();
            }
            return this;
        },
        image: function (url, callback, error) {
            var _a = document.createElement("img");
            var _ol = function (e) {
                e.target.removeEventListener("load", _ol);
                e.target.removeEventListener("error", _oe);
                if (callback)
                    callback.call(e.target, e);
            };
            var _oe = function (e) {
                e.target.removeEventListener("load", _ol);
                e.target.removeEventListener("error", _oe);
                if (error)
                    error.call(e.target, e);
            };
            _a.src = url;
            _a.addEventListener("load", _ol, false);
            _a.addEventListener("error", _oe, false);
            return this;
        },
        text: function (url, success, error, data) {
            brooder.ajax({
                url: url,
                data: data,
                dataType: "text",
                success: success,
                error: error
            });
            return this;
        },
        json: function (url, success, error, data) {
            brooder.ajax({
                url: url,
                data: data,
                dataType: "json",
                success: success,
                error: error
            });
            return this;
        },
        load: function (mapping, onload, onprogress, onerror) {//{js:[],css:[],dom:[],json:[]}
            if (mapping) {
                var que = new queue();
                for (var i in mapping) {
                    for (var j in mapping[i]) {
                        que.add(function (a, b) {
                            var q = this;
                            loader[b.type](b.path, function (e) {
                                q.next();
                            }, function (e) {
                                if (onerror)
                                    onerror.call(q, b.type, b.path);
                            });
                        }, null, {type: i, path: mapping[i][j]});
                    }
                }
                que.complete(function () {
                    if (onload)
                        onload();
                }).progress(function (k) {
                    if (onprogress)
                        onprogress({
                            total: k.total,
                            runed: k.runed,
                            progress: Math.floor((k.runed / k.total) * 100)
                        });
                }).run();
            } else {
                if (onload) {
                    onload();
                }
            }
        }
    };
    brooder.loader = function () {
        return loader;
    };

    var plugin = function (dom, option) {
    };
    plugin.prototype.delegateEvent = function () {
        var ths = this;
        this.dom.find("[data-bind]").each(function () {
            if (!$(this).data("_eventback_")) {
                var type = $(this).dataset("bind").split(":");
                var etype = type[0], back = type[1];
                $(this).data("_eventback_", back).bind(etype, function (e) {
                    var back = $(this).data("_eventback_");
                    ths["bind_" + back] && ths["bind_" + back].call(ths, $(this), e);
                });
            }
        });
    };
    plugin.prototype.delegateFind = function () {
        var ths = this;
        this.dom.find("[data-find]").each(function () {
            var name = $(this).dataset("find");
            try {
                ths["find_" + name] && ths["find_" + name]($(this));
            } catch (e) {
                console.error("[brooder] plugin finder called error");
            }
        });
    };
    plugin.prototype.clean = function () {
        for (var i in this) {
            this[i] = null;
        }
    };
    brooder.plugin = function (obj) {
        if (obj && obj.name && obj.name !== "") {
            var a = new Function("dom", "option", "this.dom=dom;this.option=$.extend({},this.option,option);dom.data('" + obj.name + "',this);this.init&&this.init(dom,option);");
            a.prototype = new plugin();
            for (var i in obj) {
                a.prototype[i] = obj[i];
            }
            $.fn[obj.name] = function (option) {
                if (this.data(obj.name) && this.data(obj.name).singleton === true) {
                    return this.data(obj.name);
                }
                return new a(this, option);
            };
        }
    };

    var packetmapping = [];
    var packetDone = [];
    var dommapping = {};
    var requiremapping = {};
    var packet = function (option) {
        var ops = {
            basepath: "",
            packetName: "",
            back: null,
            target: "",
            progress:module.basemapping.progress
        }, ths = this;
        brooder.extend(ops, option);
        if (ops.packetName !== "") {
            var path = ops.basepath + ops.packetName.replace(/\./g, "/") + ".js";
            this.option = ops;
            this.info = [];
            if (packetmapping.indexOf(path) === -1) {
                this.load(path, function () {
                    var re = packet.dependsSort.call(ths, ths.info);
                    if (re.length === ths.info.length) {
                        ths.info = re;
                        for (var i = 0; i < ths.info.length; i++) {
                            var d = ths.info[i].info;
                            var xp = packet.deleteR(ths.info[i].code) + "$.is.isEmptyObject(module.exports)?(module.exports=exports):'';", xcode = "";
                            if (d.usestrict === "true") {
                                d.usestrict = true;
                                xcode = "\"use strict\";" + xp + "//# sourceURL=" + d.path;
                            } else {
                                d.usestrict = false;
                                xcode = xp + "//# sourceURL=" + d.path;
                            }
                            try {
                                brooder.___info = d;
                                if (!requiremapping[d.packet]) {
                                    requiremapping[d.packet] = {exports: {}};
                                    for (var it in d) {
                                        if (it !== "_packets_" && it !== "domp" && it !== "json"&& it !== "_json") {
                                            requiremapping[d.packet][it] = d[it];
                                        }
                                    }
                                    requiremapping[d.packet]["json"] = d._json;
                                    requiremapping[d.packet]["basePath"] = ops.basepath;
                                    requiremapping[d.packet]["folder"] = d.path.substring(0, d.path.lastIndexOf("/")) + "/";
                                }
                                new Function("$", "Module", "Option", "module", "exports", "require", "domstr", "T", "Plugin", xcode).call(
                                        requiremapping[d.packet],
                                        brooder,
                                        brooder.Module,
                                        brooder.Option,
                                        requiremapping[d.packet],
                                        {},
                                        function (packetName) {
                                            if (requiremapping[packetName]) {
                                                return requiremapping[packetName].exports;
                                            } else {
                                                throw Error("[brooder] method require() called error,packet of " + packetName + " is not required in packet of " + d.packet);
                                            }
                                        }, function (packet, name) {
                                    return dommapping[packet] ? dommapping[packet][name] : null;
                                }, function () {
                                    return Array.prototype.slice.call(arguments).join("");
                                }, function (obj) {
                                    brooder.plugin(obj);
                                });
                                brooder.___info = null;
                            } catch (e) {
                                brooder.___info = null;
                                console.error("[brooder] packet import error name of " + d.packet + " path of " + d.path + " Message:" + e.stack);
                            }
                        }
                        packetmapping.push(path);
                        ths.option.back && ths.option.back();
                    } else {
                        throw Error("[brooder] packet depends error,maybe has circle depends,or some file has no packet info.");
                    }
                    ths.clean();
                }, ops.target);
            } else {
                ths.option.back && ths.option.back();
                ths.clean();
            }
        }
    };
    packet.basePath = "";
    packet.isNote = /\/\*[\w\W]*?\*\//;
    packet.isInfo = /@([\s\S]*?);/g;
    packet.isPacketTag = /["\']@[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*["\']/g;
    packet.isCurrentTag = /["\']@\.[A-Za-z0-9_-]+["\']/g;
    packet.isPacket = /["\']@[A-Za-z0-9_-]+["\']/g;
    packet.isOther = /["\']\\@[A-Za-z0-9_-]+["\']/g;
    packet.deleteR = function (str) {
        if (module.basemapping.debug) {
            for (var i=0; i < 2; i++) {
                str=str.replace(/\n/,"");
            }
            return str;
        } else {
            return str;
        }
    };
    packet.dependsSort = function (mapping) {
        var k = [], kk = [];
        for (var i = 0; i < mapping.length; i++) {
            var a = mapping[i];
            a.dependTimes = a.info.depends.length;
            for (var j = 0; j < a.info.depends.length; j++) {
                var n = a.info.depends[j];
                if (packetDone.indexOf(n) !== -1) {
                    a.dependTimes = a.dependTimes - 1;
                }
            }
        }
        for (var i = 0; i < mapping.length; i++) {
            var a = mapping[i];
            if (a.dependTimes === 0 || a.info.depends.length === 0) {
                packetDone.push(a.info.packet);
                k.push(a);
            } else {
                a.dependTimes = a.info.depends.length;
                kk.push(a);
            }
        }
        for (var i = 0; i < k.length; i++) {
            var a = k[i];
            for (var j = 0; j < kk.length; j++) {
                var b = kk[j];
                if (b.info.depends.indexOf(a.info.packet) !== -1) {
                    b.dependTimes = b.dependTimes - 1;
                    if (b.dependTimes <= 0) {
                        packetDone.push(b.info.packet);
                        k.push(b);
                        kk.splice(j, 1);
                        break;
                    }
                }
            }
        }
        for (var i = 0; i < kk.length; i++) {
            var a = kk[i];
            for (var j = 0; j < a.info.depends.length; j++) {
                var b = a.info.depends[j];
                if (packetDone.indexOf(b) !== -1) {
                    a.dependTimes = a.dependTimes - 1;
                    if (a.dependTimes <= 0) {
                        packetDone.push(a.packet);
                        k.push(a);
                        kk.splice(i, 1);
                        break;
                    }
                }
            }
        }
        return k;
    };
    packet.getPacketInfo = function (str) {
        var a = str.match(packet.isNote), basepath = this.option.basepath, n = {
            _packets_: {},
            packet: "",
            js: [],
            require: [],
            include: [],
            children: [],
            css: [],
            dom: [],
            json: [],
            _json: {},
            depends: [],
            domp: []
        };
        if (a && a.length > 0) {
            var b = a[0];
            var tp = b.match(packet.isInfo);
            for (var o = 0; o < tp.length; o++) {
                var a = tp[o];
                var d = a.split(" ");
                if (d.length >= 2) {
                    var key = d[0].substring(1, d[0].length), value = d[1].substring(0, d[1].length - 1);
                    if (key === "require" || key === "include" || key === "dom" || key === "json") {
                        var t = value.split(":");
                        if (t.length > 1) {
                            if (n._packets_[t[1]]) {
                                console.info("[brooder] maybe the packet with name of " + n.packet + " contains duplicate packet shortname,it is " + t[1]);
                            }
                            n._packets_[t[1]] = t[0];
                        } else {
                            var m = t[0].split("\.");
                            if (n._packets_[m[m.length - 1]]) {
                                console.info("[brooder] maybe the packet with name of " + n.packet + " contains duplicate packet shortname,it is " + m[m.length - 1]);
                            }
                            n._packets_[m[m.length - 1]] = t[0];
                        }
                        if (key === "dom") {
                            n.domp.push(t[0]);
                            value = basepath + value.replace(/\./g, "/") + ".html";
                        } else if (key === "json") {
                            value = {
                                packet: value,
                                path: basepath + value.replace(/\./g, "/") + ".json"
                            };
                        } else {
                            if (key === "require") {
                                n.depends.push(t[0]);
                                n.children.push(t[0]);
                            }
                            if (key === "include") {
                                n.children.push(t[0]);
                            }
                            value = basepath + t[0].replace(/\./g, "/") + ".js";
                        }
                    } else if (key === "css") {
                        if (value.indexOf("http") === -1) {
                            if (value.indexOf("/") === -1) {
                                value = basepath + value.replace(/\./g, "/") + ".css";
                            } else {
                                value = basePath + value;
                            }
                        }
                    } else if (key === "js") {
                        if (value.indexOf("http") === -1) {
                            if (value.indexOf("/") === -1) {
                                value = basepath + value.replace(/\./g, "/") + ".js";
                            } else {
                                value = basePath + value;
                            }
                        }
                    } else if (key === "packet") {
                        n.packet = value;
                    } else {
                        n[key] = value;
                    }
                    n["path"] = basepath + n.packet.replace(/\./g, "/") + ".js";
                    if (n[key]) {
                        if (n[key].indexOf(value) === -1) {
                            n[key].push(value);
                        }
                    }
                }
            }
        } else {
            n.packet = "nopacket";
        }
        return n;
    };
    packet.replacePacketNames = function (info, code) {
        return code.replace(packet.isPacketTag, function (str) {
            var a = str.split("\."), index = 0, key = a[1].substring(0, a[1].length - 1), index = a[0].substring(2);
            if (info._packets_[index]) {
                return str[0] + info._packets_[index] + "." + key + str[str.length - 1];
            } else {
                throw Error("[brooder] packet can not find with tag of " + str + ",packet is " + info.packet);
            }
        }).replace(packet.isCurrentTag, function (str) {
            return str[0] + info.packet + "." + str.split("\.")[1];
        }).replace(packet.isPacket, function (str) {
            var index = str.substring(2, str.length - 1);
            if (info._packets_[index]) {
                return str[0] + info._packets_[index] + str[str.length - 1];
            } else {
                throw Error("[brooder] packet can not find with tag of " + str + ",packet is " + info.packet);
            }
        }).replace(packet.isOther, function (str) {
            return str.substring(1);
        });
    };
    packet.prototype.load = function (path, fn, parent) {
        var ths = this, pathname = path;
        brooder.ajax({
            url: path,
            dataType: "text",
            type: "get",
            success: function (e) {
                var aa = packet.getPacketInfo.call(ths, e), kp = 0;
                aa["parent"] = parent;
                if (aa.packet === "nopacket") {
                    console.error("[brooder] file has no packet info,path of " + pathname);
                }
                try {
                    e = packet.replacePacketNames.call(ths, aa, e);
                } catch (e) {
                    console.error(e.stack);
                }
                ths.info.push({
                    info: aa,
                    code: e
                });
                if (aa.require && aa.require.length > 0) {
                    kp += aa.require.length;
                }
                if (aa.css && aa.css.length > 0) {
                    kp += aa.css.length;
                }
                if (aa.js && aa.js.length > 0) {
                    kp += aa.js.length;
                }
                if (aa.dom && aa.dom.length > 0) {
                    kp += aa.dom.length;
                }
                if (aa.json && aa.json.length > 0) {
                    kp += aa.json.length;
                }
                if (kp > 0) {
                    var queue = brooder.queue();
                    queue.progress(function(e){
                        e["pakcet"]=aa.packet;
                        ths.option.progress&&ths.option.progress(e);
                    });
                    queue.complete(function () {
                        if (fn) {
                            fn();
                        }
                    });
                    for (var i = 0; i < aa.css.length; i++) {
                        var path = aa.css[i];
                        if (packetmapping.indexOf(path) === -1) {
                            packetmapping.push(path);
                            queue.add(function (a, b) {
                                loader.css(b, function () {
                                    queue.next();
                                });
                            }, null, path);
                        }
                    }
                    for (var i = 0; i < aa.dom.length; i++) {
                        var path = aa.dom[i], pkt = aa.domp[i];
                        if (packetmapping.indexOf(path) === -1) {
                            packetmapping.push(path);
                            queue.add(function (a, b) {
                                var pktt = b.packet;
                                brooder.ajax({
                                    url: b.path,
                                    type: "get",
                                    dataType: "text"
                                }).done(function (txt) {
                                    var b = txt.split("\r\n"), c = {};
                                    var current = [], before = "", _dommapping = {};
                                    for (var i = 0; i < b.length; i++) {
                                        var w = b[i];
                                        if (w.indexOf("<!--") === 0) {
                                            if (current.length !== 0) {
                                                _dommapping[before] = current.join("");
                                                current = [];
                                                before = w.substring(4, w.length - 3);
                                            } else {
                                                before = w.substring(4, w.length - 3);
                                            }
                                        } else {
                                            current.push(w.trim());
                                        }
                                        if (i === b.length - 1) {
                                            _dommapping[before] = current.join("");
                                        }
                                    }
                                    dommapping[pktt] = _dommapping;
                                    queue.next();
                                });
                            }, null, {path: path, packet: pkt});
                        }
                    }
                    for (var i = 0; i < aa.js.length; i++) {
                        var path = aa.js[i];
                        if (packetmapping.indexOf(path) === -1) {
                            packetmapping.push(path);
                            queue.add(function (a, b) {
                                loader.js(b, function () {
                                    queue.next();
                                });
                            }, null, path);
                        }
                    }
                    for (var i = 0; i < aa.json.length; i++) {
                        queue.add(function (a, b) {
                            loader.json(b.path, function (data) {
                                aa._json[b.packet] = data;
                                queue.next();
                            });
                        }, null, aa.json[i]);
                    }
                    for (var i = 0; i < aa.require.length; i++) {
                        var path = aa.require[i];
                        if (packetmapping.indexOf(path) === -1) {
                            packetmapping.push(path);
                            queue.add(function (a, b) {
                                ths.load(b.path, function () {
                                    queue.next();
                                }, b.parent);
                            }, null, {
                                path: path,
                                parent: aa.packet
                            });
                        }
                    }
                    queue.run();
                } else {
                    fn && fn();
                }
            },
            error: function (e) {
                fn && fn();
            }
        });
    };
    packet.prototype.clean = function () {
        for (var i in this) {
            this[i] = null;
        }
    };
    packet.require = function (packetName) {
        if (requiremapping[packetName]) {
            return requiremapping[packetName].exports ? requiremapping[packetName].exports : requiremapping[packetName];
        } else {
            throw Error("[brooder] method require() called error,packet of " + packetName);
        }
    };
    brooder.packet = function (option) {
        new packet(option);
    };
    brooder.packetBasePath = function (path) {
        if (arguments.length === 1) {
            packet.basePath = path;
        } else {
            return packet.basePath;
        }
    };
    brooder.require = function (packetName, fn) {
        new packet({
            basepath: packet.basePath,
            packetName: packetName,
            back: function () {
                fn && fn(packet.require(packetName), packet.require);
            }
        });
    };

    var template = function (temp, macro) {
        var a = template.precompile(temp);
        this._scope = a.info;
        this._code = template.code(a.template);
        this._fn = template.compile(this._code);
        this._macrofn = macro || {};
        this._session = null;
    };
    template.a = /&lt;%/g;
    template.b = /%&gt;/g;
    template.c = /&quot;/g;
    template.d = /<%|%>/g;
    template.e = /^=.*;$/;
    template.f = />[\s]+</g;
    template.g = /\{\{.*\}\}/;
    template.h = /\<\!\-\-[\s\S]*?\-\-\>/g;
    template.j = /\{\{|\}\}/;
    template.code = function (temp) {
        var fn = "var out='';";
        var tp = temp.replace(template.a, "<%").replace(template.b, "%>").split(template.d);
        for (var index = 0; index < tp.length; index++) {
            var e = tp[index];
            index % 2 !== 0 ? (template.e.test(e) ? (fn += "out+" + e) : (fn += e)) : (fn += "out+=\"" + e.replace(/"/g, '\\"') + "\";");
        }
        fn += "return out;";
        return fn;
    };
    template.compile = function (code) {
        try {
            return  new Function("data", "fn", code);
        } catch (e) {
            console.error("[template error] " + e.message);
            console.info("[template result] " + code);
            return function () {
                return "";
            };
        }
    };
    template.precompile = function (str) {
        str = str.replace(template.h, "").replace(template.f, "><").replace(/\r\n/g, "").replace(/\r/g, "").replace(/\n/g, "");
        if (str.indexOf("<@") !== -1) {
            var i = -1, current = "", state = "start", tagname = "", propname = "", propnamestart, propvalue = "";
            var isbody = true, endtagname = "", props = {}, tagindex = 0, tagendindex = 0, endtagindex = 0, endtagendindex = 0, obj = [];
            while (i < str.length) {
                i++;
                current = str[i];
                if (state === "start" && current === "<" && str[i + 1] === "@") {
                    state = "tagstart";
                    tagindex = i;
                    continue;
                }
                if (state === "tagstart" && current === "@") {
                    state = "tagname";
                    tagname = "";
                    props = {};
                    continue;
                }
                if (state === "start" && current === "<" && str[i + 1] === "/" && str[i + 2] === "@") {
                    endtagindex = i;
                    state = "endtag";
                    endtagname = "";
                    i += 2;
                    continue;
                }
                if (state === "endtag" && current === ">") {
                    state = "start";
                    endtagendindex = i + 1;
                    obj.push({
                        type: "endtag",
                        tagname: endtagname,
                        start: endtagindex,
                        end: endtagendindex
                    });
                    continue;
                }
                if (state === "tagname" && current === " ") {
                    state = "propname";
                    propname = "";
                    continue;
                }
                if (state === "tagname" && (current === "/" || current === ">")) {
                    if (current === ">") {
                        tagendindex = i + 1;
                        state = "start";
                        isbody = true;
                    } else if (current === "/") {
                        tagendindex = i + 2;
                        state = "start";
                        isbody = false;
                    }
                    if (tagname !== "") {
                        obj.push({
                            type: "tag",
                            tagname: tagname,
                            props: props,
                            body: isbody,
                            start: tagindex,
                            end: tagendindex
                        });
                    }
                    continue;
                }
                if (state === "propname" && current === "=") {
                    state = "propvalue";
                    continue;
                }
                if (state === "propvalue" && (current === "'" || current === "\"")) {
                    state = "propvalueing";
                    propnamestart = current;
                    propvalue = "";
                    continue;
                }
                if (state === "propvalueing" && current === propnamestart) {
                    state = "tagname";
                    props[propname] = propvalue;
                    continue;
                }
                if (state === "endtag") {
                    endtagname += current;
                }
                if (state === "tagname") {
                    tagname += current;
                }
                if (state === "propname") {
                    propname += current;
                }
                if (state === "propvalueing") {
                    propvalue += current;
                }
            }
            var index = 0, start = 0, end = 0, inner = false, current = null, result = [], t = "", startin = 0, info = [];
            for (var i in obj) {
                if (obj[i].type === "tag" && obj[i].body === false && inner === false) {
                    obj[i].bodystr = "";
                    obj[i].from = obj[i].start;
                    obj[i].to = obj[i].end;
                    result.push(obj[i]);
                }
                if (obj[i].type === "tag" && obj[i].body === true) {
                    inner = true;
                    if (current === null) {
                        current = obj[i];
                        current.from = obj[i].start;
                    }
                    if (index === 0) {
                        start = obj[i].start;
                        end = obj[i].end;
                    }
                    index++;
                }
                if (obj[i].type === "endtag") {
                    index--;
                    if (index === 0) {
                        current.to = obj[i].end;
                        current.bodystr = str.substring(end, obj[i].start);
                        result.push(current);
                        current = null;
                        inner = false;
                    }
                }
            }
            for (var i in result) {
                var st = result[i].props, parameter = "";
                for (var tpp in st) {
                    var np = st[tpp];
                    if (template.g.test(np)) {
                        var qpp = np.split(template.j), cpp = "";
                        for (var ip = 1; ip <= qpp.length; ip++) {
                            if (i % 2 === 0) {
                                if (qpp[ip - 1] !== "") {
                                    cpp += "(" + qpp[ip - 1] + ")+";
                                }
                            } else {
                                cpp += "'" + qpp[ip - 1] + "'+";
                            }
                        }
                        var npp = "(" + (cpp.length > 0 ? cpp.substring(0, cpp.length - 1) : "''") + ")";
                        parameter += tpp + ":" + npp + ",";
                    } else {
                        parameter += tpp + ":'" + st[tpp] + "',";
                    }
                }
                result[i].parameter = "{" + (parameter.length > 0 ? parameter.substring(0, parameter.length - 1) : parameter) + "}";
                info.push({
                    name: result[i].tagname,
                    body: result[i].bodystr,
                    parameter: result[i].parameter
                });
                var a = str.substring(startin, result[i].from);
                t += a;
                t += "<%=this._macro(" + i + (result[i].parameter === "" ? "" : "," + result[i].parameter) + ");%>";
                startin = result[i].to;
            }
            t += str.substring(startin, str.length);
            return {
                template: t,
                info: info
            };
        } else {
            return {template: str, info: []};
        }
    };
    template.prototype._macro = function (num, attr) {
        var n = this._scope[num], ths = this;
        if (this._macrofn[n.name]) {
            return this._macrofn[n.name].call(this, attr, function () {
                if (n.body !== "") {
                    var inner = new template(n.body).macro(ths._macrofn);
                    return inner.render.apply(inner, ths._session);
                } else {
                    return "";
                }
            });
        } else {
            return "[nodata]";
        }
    };
    template.prototype.session = function () {
        if (arguments.length === 0) {
            return this._session;
        } else {
            this._session = arguments[0];
            return this;
        }
    };
    template.prototype.render = function () {
        this._session = Array.prototype.slice.call(arguments);
        return this._fn.apply(this, this._session);
    };
    template.prototype.code = function () {
        return this._code;
    };
    template.prototype.fn = function () {
        if (arguments.length === 1) {
            this._fn = arguments[0];
            return this;
        }
        return this._fn;
    };
    template.prototype.macro = function (name, fn) {
        if (arguments.length === 1) {
            this._macrofn = name || {};
        } else if (arguments.length === 2) {
            this._macrofn[name] = fn;
        }
        return this;
    };
    brooder.template = function () {
        var temp = Array.prototype.slice.call(arguments).join("");
        return new template(temp);
    };
    query.prototype.template = function () {
        var temp = new template(ths.html()), ths = this;
        return {
            render: function (data, fn) {
                ths.html(temp.render(data, fn));
                return ths;
            },
            compile: function (data, fn) {
                return temp.render(data, fn);
            }
        };
    };

    var agent = {
        add: function (data, title, url) {
            window.history.pushState(data, title, url);
            return this;
        },
        replace: function (data, title, url) {
            window.history.replaceState(data, title, url);
            return this;
        },
        onChange: function (fn) {
            window.onpopstate = function (e) {
                fn && fn(e);
            };
        }
    };
    var router = {
        map: {},
        list: [],
        hasDot: /\{\w*\}/g,
        url: window.location.href,
        add: function (path, fn) {
            if (path[path.length - 1] !== "/") {
                path = path + "/";
            }
            var has = false, count = 0, start = 0, pars = [];
            var pathx = path.replace(this.hasDot, function (a, b) {
                has = true;
                if (count === 0) {
                    start = b;
                }
                pars.push(a.substring(1, a.length - 1));
                count++;
                return "((?!/).)*";
            });
            if (has) {
                var info = {};
                info.originalpath = path;
                info.pattern = new RegExp("^" + pathx + "$");
                info.count = count;
                info.patternString = "^" + pathx + "/$";
                info.firstposition = start;
                info.keys = pars;
                info.callback = fn;
                var aStrings = path.split("\\.");
                if (aStrings.length > 1) {
                    info.suffix = aStrings[1];
                }
                this.list.push(info);
            } else {
                this.map[path] = fn;
            }
        },
        check: function (path) {
            var result = {
                found: false,
                hasParas: false,
                path: "",
                matchpath: "",
                map: {},
                paras: $.serialize.queryObject(path),
                hash: $.serialize.hashObject(path),
                callback: null
            };
            var t = path.split("?");
            if (t.length > 1) {
                path = t[0];
            }
            var suffix = "", bString = path.split("\\.");
            if (bString.length > 1) {
                suffix = bString[1];
                path = path + "/";
            } else {
                if (bString[0][bString[0] - 1] !== "/") {
                    path = bString[0] + "/";
                }
            }
            if (this.map[path]) {
                result.path = path;
                result.matchpath = path;
                result.callback = this.map[path];
                result.found = true;
                return result;
            } else {
                var a = null;
                for (var i in this.list) {
                    var info = this.list[i];
                    if (info.pattern.test(path)) {
                        if (null === a) {
                            a = info;
                        } else if (info.suffix === suffix) {
                            if (info.count <= a.count) {
                                if (info.firstposition > a.firstposition) {
                                    a = info;
                                }
                            }
                        }
                    }
                }
                if (null !== a) {
                    var p = path.split("/"), pp = a.originalpath.split("/");
                    var cd = 0;
                    for (var i = 0; i < pp.length; i++) {
                        if (pp[i][0] === "{") {
                            result.map[a.keys[cd]] = p[i];
                            cd++;
                        }
                    }
                    result.hasParas = true;
                    result.path = a.originalpath;
                    result.matchpath = path;
                    result.callback = info.callback;
                    result.found = true;
                }
                return result;
            }
        }
    };
    var __history = null;
    var _history = function (url) {
        if (url) {
            if (url[url - 1] === "/") {
                url = url.substring(0, url.length - 1);
            }
            this.url = url;
        }
        this._stack = [1];
        this._currentIndex = 0;
        var ths = this;
        router.add("404",function(){console.log("[brooder] router no page.")});
        agent.onChange(function (e) {
            _history._run.call(ths, e.state, e);
        });
    };
    _history._run = function (data, e) {
        if (!data) {
            data = {
                __page__: window.location.href.substring(this.url.length),
                __index__: 0
            };
        }
        if (data.__page__ === "") {
            data.__page__ = "index";
        }
        var r = router.check(data.__page__), isback = false, isforward = false;
        if (!r.found) {
            r = router.check("404");
            this.edit("404");
            return;
        }
        if (r.found) {
            var info = {};
            if (e) {
                brooder.extend(data, e.state);
            }
            if (data.__index__ !== undefined && data.__index__ !== null) {
                if (data.__index__ < this._currentIndex) {
                    isback = true;
                }
                if (data.__index__ > this._currentIndex) {
                    isforward = true;
                }
                this._currentIndex = data.__index__;
            }
            for (var i in data) {
                if (i !== "__page__" && i !== "__title__" && i !== "__index__") {
                    info[i] = data[i];
                }
            }
            r.callback && r.callback.call(this, {
                action: r.path,
                back: isback,
                forward: isforward,
                keys: r.hasParas ? r.map : null,
                parameters: r.paras,
                hash: r.hash,
                info: info,
                e: e === undefined ? null : e
            });
        }
    };
    _history.prototype.run = function () {
        var page = window.location.href.substring(this.url.length);
        _history._run.call(this, {__page__: page});
        return this;
    };
    _history.prototype.open = function (url, data, title) {
        if (!data) {
            data = {};
        }
        data["__page__"] = url;
        data["__title__"] = title;
        data["__index__"] = this._stack.length;
        agent.add(data, title, this.url + url);
        this._stack.push(1);
        this._currentIndex = data.__index__;
        _history._run.call(this, data);
        return this;
    };
    _history.prototype.edit = function (url, data, title) {
        if (!data) {
            data = {};
        }
        data["__page__"] = url;
        agent.replace(data, title, this.url + url);
        _history._run.call(this, data);
        return this;
    };
    _history.prototype.bind = function (obj, fn) {
        if (arguments.length === 1) {
            for (var i in obj) {
                router.add(i, obj[i]);
            }
        } else if (arguments.length === 2) {
            router.add(obj, fn);
        }
        return this;
    };
    brooder.router = function (option) {
        if (!__history) {
            __history = new _history(option);
        }
        return __history;
    };

    var adapt = function () {
    };
    adapt._invoke = function (parent, propName, pars) {
        if (parent && parent.prototype[propName]) {
            var b = parent.prototype[propName];
            if (is.isFunction(b)) {
                var _a = new parent(), keys = Object.keys(this);
                for (var i = 0; i < keys.length; i++) {
                    _a[keys[i]] = this[keys[i]];
                }
                try {
                    var r = b.apply(_a, pars), l = Object.keys(_a);
                    for (var i = 0; i < l.length; i++) {
                        this[l[i]] = _a[l[i]];
                    }
                    return r;
                } catch (e) {
                    console.error(e.message);
                    return null;
                }
            } else {
                return b;
            }
        } else {
            return undefined;
        }
    };
    adapt.prototype.privator = function (name) {
        var a = this.__adapt__._private["_" + name];
        if (a) {
            var paras = Array.prototype.slice.call(arguments);
            paras.splice(0, 1);
            return a.apply(this, paras);
        } else {
            return null;
        }
    };
    adapt.prototype.staticor = function (name, scope) {
        var a = this.__adapt__._static["__" + name];
        if (is.isFunction(a)) {
            var paras = Array.prototype.slice.call(arguments);
            paras.splice(0, 2);
            return a.apply(scope, paras);
        } else {
            return a;
        }
    };
    adapt.prototype.type = function () {
        return this.__adapt__._type;
    };
    adapt.prototype.shortName = function () {
        return this.__adapt__._shortName;
    };
    adapt.prototype.packet = function () {
        return this.__adapt__._packet;
    };
    adapt.prototype.typeOf = function (type) {
        return this.__adapt__._mapping[type] !== undefined;
    };
    adapt.prototype.extendsOf = function (type) {
        for (var i in this.__adapt__._extendslink) {
            if (this.__adapt__._extendslink[i] === type) {
                return true;
            }
        }
        return false;
    };
    adapt.prototype.factory = function () {
        return this.__adapt__._factory;
    };
    adapt.prototype.clean = function () {
        this.__adapt__._factory = null;
        var keys = Object.keys(this);
        for (var i in keys) {
            this[keys[i]] = null;
        }
    };
    adapt.prototype.isSingleton = function () {
        return this.__adapt__._singleton;
    };
    adapt.prototype.superClass = function (propName) {
        var parent = this.__adapt__._factory.mapping[this.__adapt__._parent];
        var pars = Array.prototype.slice.call(arguments);
        pars.splice(0, 1);
        adapt._invoke.call(this, parent, propName, pars);
    };
    adapt.prototype.invokeClass = function (className, propName) {
        var parent = this.__adapt__._factory.mapping[className];
        var pars = Array.prototype.slice.call(arguments);
        pars.splice(0, 2);
        adapt._invoke.call(this, parent, propName, pars);
    };
    Object.defineProperty(adapt.prototype, "__adapt__", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: {
            _type: "adapt",
            _shortName: "adapt",
            _packet: "",
            _parent: null,
            _factory: null,
            _private: null,
            _static: null,
            _option: null,
            _mapping: {},
            _original_option: [],
            _instance_props: ["privator", "staticor", "type", "shortName", "packet", "typeOf", "factory", "clean", "superClass"],
            _extendslink: []
        }
    });
    var factory = function () {
        this.mapping = {
            adapt: adapt
        };
    };
    var fsingleton = {};
    factory.prototype.def = function (obj) {
        var ab = new Function();
        var a = {
            _type: (obj.packet && obj.packet !== "" ? obj.packet + "." : "") + obj.name,
            _shortName: obj.name || "",
            _packet: obj.packet || "",
            _mapping: {adapt: 1},
            _extendslink: [],
            _instance_props: [],
            _private: {},
            _static: {},
            _factory: this,
            _singleton: obj.singleton === null ? obj.singleton : false,
            _option: obj.option || {},
            _original_option: []
        };
        a._mapping[a._type] = 1;
        for (var i in obj.option) {
            a._original_option.push(i);
        }
        var prpt = new adapt();
        !obj.extend && (obj.extend = ["adapt"]);
        var array = obj.extend;
        is.isString(obj.extend) && (array = [obj.extend]);
        a._parent = array[0];
        var c = brooder.extend({}, this.mapping[array[0]].prototype.__adapt__._option);
        a._option = brooder.extend(c, a._option);
        for (var i = array.length - 1; i >= 0; i--) {
            if (array[i] !== "adapt") {
                var d = this.mapping[array[i]].prototype;
                var __mapping = {}, __private = {}, __static = {};
                brooder.extend(__mapping, d.__adapt__._mapping);
                brooder.extend(__private, d.__adapt__._private);
                brooder.extend(__static, d.__adapt__._static);
                brooder.extend(a._mapping, __mapping);
                brooder.extend(a._private, __private);
                brooder.extend(a._static, __static);
                var q = Object.keys(d);
                for (var t = 0; t < q.length; t++) {
                    if (brooder.is.isFunction(d[t])) {
                        if (!/^(init)$|^_\w*/.test(t)) {
                            prpt[q[t]] = d[q[t]];
                        }
                    } else {
                        prpt[q[t]] = d[q[t]];
                    }
                }
            }
        }
        Object.defineProperty(prpt, "__adapt__", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: a
        });
        for (var i in obj) {
            if (/^__/.test(i)) {
                a._static[i] = obj[i];
            } else {
                if (is.isFunction(obj[i])) {
                    if (/^_/.test(i)) {
                        a._private[i] = obj[i];
                    } else {
                        prpt[i] = obj[i];
                        if (i !== "init")
                            a._instance_props.push(i);
                    }
                } else {
                    if (!/^(name)|(extend)|(option)/.test(i)) {
                        prpt[i] = obj[i];
                        if (!/^(packet)|(layout)/.test(i))
                            a._instance_props.push(i);
                    }
                }
            }
        }
        ab.prototype = prpt;
        var k = ab;
        while (k) {
            a._extendslink.push(k.prototype.__adapt__._type);
            k = this.mapping[k.prototype.__adapt__._parent];
        }
        this.mapping[a._type] = ab;
        return this;
    };
    factory.prototype.get = function (name) {
        return this.mapping[name];
    };
    factory.prototype.create = function (type, option) {
        var objx = null, name = type;
        var clazz = this.mapping[name];
        if (clazz) {
            objx = new clazz();
            objx.option = brooder.extend({}, clazz.prototype.__adapt__._option, option);
            for (var i = clazz.prototype.__adapt__._extendslink.length - 1; i >= 0; i--) {
                var p = this.mapping[clazz.prototype.__adapt__._extendslink[i]];
                if (p && p.prototype["init"]) {
                    p.prototype["init"].call(objx, objx.option);
                }
            }
        }
        return objx;
    };
    factory.prototype.instance = function (type, option) {
        var objx = null, name = type;
        var clazz = this.mapping[name];
        if (clazz) {
            var sg = clazz.prototype.__adapt__._singleton;
            if (sg) {
                if (!fsingleton[type]) {
                    var objxx = new clazz();
                    objxx.option = brooder.extend({}, clazz.prototype.__adapt__._option, option);
                    fsingleton[type] = objxx;
                }
                objx = fsingleton[type];
            } else {
                objx = new clazz();
                objx.option = brooder.extend({}, clazz.prototype.__adapt__._option, option);
            }
        }
        return objx;
    };
    factory.prototype.invoke = function (clazzName, methodName, scope) {
        var a = null;
        if (is.isString(clazzName)) {
            var j = this.mapping[clazzName];
            j && (a = new j());
        } else if (is.isObject(clazzName)) {
            a = clazzName;
        }
        if (a && a[methodName]) {
            if (is.isFunction(a[methodName]) && is.isObject(scope)) {
                var paras = Array.prototype.slice.call(arguments), keys = Object.keys(scope), obj = a;
                paras.splice(0, 3);
                for (var i = 0; i < keys.length; i++) {
                    obj[keys[i]] = scope[keys[i]];
                }
                try {
                    var r = obj[methodName].apply(obj, paras), n = Object.keys(obj);
                    for (var i = 0; i < n.length; i++) {
                        scope[n[i]] = obj[n[i]];
                    }
                    return r;
                } catch (e) {
                    console.error(e.message);
                    return null;
                }
            }
        }
        return null;
    };
    factory.prototype.proxy = function (object, part, fn) {//fn(method)
        if (arguments.length > 1) {
            var some = null, proxy = null;
            if (is.isString(object)) {
                var _a = this.mapping[object];
                _a && (object = new _a());
            } else if (object instanceof adapt) {
                var _b = new this.mapping[object.__adapt__._type](), _c = Object.keys(object);
                for (var i = 0; i < _c.length; i++) {
                    _b[_c[i]] = object[_c[i]];
                }
                object = _b;
            } else {
                object = null;
            }
            if (is.isObject(object)) {
                if (is.isArray(part)) {
                    some = part;
                    proxy = fn;
                } else if (is.isFunction(part)) {
                    proxy = part;
                }
                var a = new this.mapping[object.__adapt__._type]();
                for (var i in object) {
                    if (is.isFunction(object[i])) {
                        if (!some || some && some.indexOf(i) !== -1) {
                            (function (methodName) {
                                a[i] = function () {
                                    var pars = arguments;
                                    proxy && proxy.call(object, {
                                        methodName: methodName,
                                        invoke: function () {
                                            return object[methodName].apply(object, pars);
                                        }
                                    });
                                };
                            })(i);
                        }
                    } else {
                        a[i] = object[i];
                    }
                }
                return a;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };
    factory.prototype.has = function (clazzType) {
        return this.mapping[clazzType] !== undefined;
    };
    brooder.adapt = function () {
        return new factory();
    };

    var isboot = false;
    var module = {
        moduleList: [],
        factory: brooder.adapt(),
        basemapping: {
            basePath: "",
            debug: false,
            progress:null,
            basicPackets: []
        },
        getPacketName: function (name) {
            if (name) {
                name = name.trim();
                if (name !== "") {
                    var a = name.split("\.");
                    if (a.length > 1) {
                        a.splice(a.length - 1, 1);
                        return a.join(".");
                    } else {
                        return name;
                    }
                } else {
                    return "";
                }
            } else {
                return "";
            }
        },
        getArrayUnDuplicate: function (a) {
            var r = {}, c = [];
            for (var i = 0; i < a.length; i++) {
                r[a[i]] = 1;
            }
            for (var i in r) {
                c.push(i);
            }
            return c;
        },
        getViewInstance: function (dom, option, fn, importstart, importend) {
            var moduleName = dom.dataset("view");
            if (moduleName) {
                module.get("root", moduleName, option, function (c) {
                    if (!dom.data("-view-")) {
                        c.dom = dom;
                        fn && fn(c);
                    } else {
                        fn && fn(dom.data("-view-"));
                    }
                }, importstart, importend);
            } else {
                throw Error("[brooder] view can not init.the element has no attribute like view-*");
            }
        },
        add: function (obj) {
            if (!obj.tagName) {
                obj.tagName = "div";
            }
            module.factory.def(obj);
            var ne = (obj.packet && obj.packet !== "" ? obj.packet + "." : "") + obj.name;
            var sobj = module.factory.get(ne).prototype;
            var cln = [obj.className || ""];
            for (var i = sobj.__adapt__._extendslink.length - 1; i >= 0; i--) {
                var b = module.factory.get(sobj.__adapt__._extendslink[i]);
                if (b) {
                    var cn = b.prototype.className;
                    if (cn && cn !== "") {
                        if (cln.indexOf(cn) === -1) {
                            cln.push(cn);
                        }
                    }
                }
            }
            sobj.fullClassName = cln.join(" ");
        },
        has: function (moduleName) {
            return  module.factory.has(moduleName);
        },
        get: function (target, moduleName, option, fn, importstart, importend) {
            if (!module.has(moduleName)) {
                var basepath = module.basemapping.basePath, packetName = module.getPacketName(moduleName);
                importstart && importstart({
                    packetName: packetName,
                    module: moduleName
                });
                brooder.packet({
                    basepath: basepath,
                    packetName: packetName,
                    target: target,
                    back: function () {
                        importend && importend({
                            packetName: packetName,
                            module: moduleName
                        });
                        if (fn) {
                            if (module.has(moduleName)) {
                                var t = module.factory.instance(moduleName, option);
                                module.moduleList.push(t);
                                fn(t);
                            } else {
                                throw Error("[brooder] can not find module with name of " + moduleName + ",it is not in the packet of " + module.getPacketName(moduleName) + " or the packet file inited failed.");
                            }
                        }
                    }
                });
            } else {
                if (fn) {
                    var t = module.factory.instance(moduleName, option);
                    module.moduleList.push(t);
                    fn(t);
                }
            }
        },
        task: new dynamicQueue(),
        getModuleInstanceById: function (id) {
            var r = null;
            for (var i = 0; i < module.moduleList.length; i++) {
                if (module.moduleList[i].getId() === id) {
                    r = module.moduleList[i];
                    break;
                }
            }
            return r;
        }
    };
    window.task = module.task;
    var option = {
        options: {},
        add: function (obj) {
            if (obj.name && obj.name !== "") {
                option.options[obj.name] = obj;
            } else {
                throw Error("[brooder] option name can not null or ''");
            }
        },
        has: function (optionName) {
            var a = option.options[optionName];
            if (a) {
                return a;
            } else {
                return false;
            }
        },
        get: function (target, optionName, fn, importstart, importend) {
            if (optionName && optionName !== "" && optionName !== "null") {
                if (optionName[0] !== "{" && optionName[0] !== "[") {
                    var a = option.has(optionName);
                    if (a === false) {
                        var packetName = module.getPacketName(optionName);
                        importstart && importstart({
                            packet: packetName,
                            option: optionName
                        });
                        brooder.packet({
                            basepath: module.basemapping.basePath,
                            packetName: packetName,
                            target: target,
                            back: function () {
                                importend && importend({
                                    packet: packetName,
                                    option: optionName
                                });
                                if (fn) {
                                    var ops = option.has(optionName);
                                    if (ops) {
                                        fn(ops);
                                    } else {
                                        throw Error("[brooder] can not find option with name of " + optionName + ",is not in the packet of " + module.getPacketName(optionName));
                                    }
                                }
                            }
                        });
                    } else {
                        fn && fn(a);
                    }
                } else {
                    var ot = {};
                    try {
                        ot = window.JSON.parse(optionName);
                    } catch (e) {
                    }
                    fn && fn(ot);
                }
            } else {
                fn && fn(null);
            }
        }
    };
    var viewevent = function (target, type, data) {
        this.target = target;
        this.data = data;
        this.type = type;
        this._goon = true;
        this.currentTarget = null;
    };
    viewevent.prototype.clone = function () {
        return brooder.extend(new viewevnet(), this);
    };
    viewevent.prototype.stopPropagation = function () {
        this._goon = false;
    };
    var pipe = function (ids) {
        this.ids = ids;
    };
    pipe.prototype.invoke = function (methodName) {
        var t = null;
        for (var i = 0; i < this.ids.length; i++) {
            var r = module.getModuleInstanceById(this.ids[i]);
            if (r && r[methodName] && brooder.is.isFunction(r[methodName])) {
                t = r;
                break;
            }
        }
        if (t) {
            var n = Array.prototype.slice.call(arguments);
            n.splice(0, 1);
            return t[methodName].apply(t, n);
        } else {
            return null;
        }
    };
    pipe.prototype.parameter = function (propName) {
        var t = null;
        for (var i = 0; i < this.ids.length; i++) {
            var r = module.getModuleInstanceById(this.ids[i]);
            if (r && r.parameters[propName]) {
                t = r;
                break;
            }
        }
        return t;
    };
    var pipeChild = function (module, ids) {
        this.ids = ids;
        this.module = module;
    };
    pipeChild.prototype.invoke = function (methodName) {
        var t = this.module, r = null;
        for (var i = 0; i < this.ids.length; i++) {
            var a = t.getChildById(this.ids[i]);
            if (a) {
                if (a[methodName] && brooder.is.isFunction(a[methodName])) {
                    var b = Array.prototype.slice.call(arguments);
                    b.slice(0, 1);
                    r = a[methodName].apply(a, b);
                    break;
                }
            } else {
                t = a;
            }
        }
        return r;
    };
    pipeChild.prototype.parameter = function (propName) {
        var t = this.module, r = null;
        for (var i = 0; i < this.ids.length; i++) {
            var a = t.getChildById(this.ids[i]);
            if (a) {
                if (a.parameters[propName]) {
                    r = a.parameters[propName];
                    break;
                }
            } else {
                t = a;
            }
        }
        return r;
    };

    module.add({
        name: "view",
        packet: "",
        option: {
        },
        parentView: null,
        init: null,
        template: "",
        onbeforeinit: null,
        onendinit: null,
        onunload: brooder.nfn,
        onimportoptionstart: brooder.nfn,
        onimportoptionend: brooder.nfn,
        rerender: brooder.nfn,
        _render: function (fn) {
            if (!this.dom.data("-view-")) {
                if (this.dom.children().length > 0) {
                    this.template = this.dom.html();
                }
                var optionName = this.dom.dataset("option"), ths = this;
                if (this.dom.hasClass("_futuretochange_")) {
                    this.dom.removeClass("_futuretochange_");
                    var prps = this.__adapt__._factory.mapping[this.__adapt__._type].prototype;
                    var cln = prps.fullClassName;
                    if (this.dom.get(0).tagName.toLowerCase() !== this.tagName) {
                        var a = $("<" + prps.tagName + " class='" + cln + "' data-view='" + this.dom.dataset("view") + "' data-parent-view='" + this.dom.dataset("parentView") + "' data-view-id='" + this.dom.dataset("viewId") + "' daa-option='" + this.dom.dataset("option") + "'></" + prps.tagName + ">");
                        this.dom.get(0).parentNode.replaceChild(a.get(0), this.dom.get(0));
                        this.dom = a;
                    }
                }
                this._handlers = [];
                option.get(this.type(), optionName, function (ops) {
                    ths.dom.data("-view-", ths);
                    if (ops) {
                        ths.option.override = ops.override || {};
                        for (var i in ops) {
                            if (i !== "override") {
                                if (i.indexOf("override_") === 0) {
                                    ths.option.override[i.substring(9)] = ops[i];
                                } else {
                                    ths.option[i] = ops[i];
                                }
                            }
                        }
                    }
                    for (var i in ths.option.override) {
                        if (!/^(dom)|^(option)|^(name)|^(extend)|^(init)/.test(i)) {
                            ths[i] = ths.option.override[i];
                        }
                    }
                    ths["name"] = ths.type();
                    ths["shortname"] = ths.shortName();
                    if (typeof ths.onbeforeinit === 'function') {
                        try {
                            ths.onbeforeinit(ths.option);
                        } catch (e) {
                            console.error("[brooder] onbeforeinit called error with module of " + ths.type() + " Message:" + e.message);
                        }
                    }
                    if (typeof ths.init === 'function') {
                        try {
                            if (ths.className && ths.className !== "") {
                                ths.dom.addClass(ths.className);
                            }
                            ths.init(ths.option);
                        } catch (e) {
                            console.error("[brooder] init called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                    if (typeof ths.onendinit === 'function') {
                        try {
                            ths.onendinit(ths.option);
                        } catch (e) {
                            console.error("[brooder] onendinit called error with module of " + ths.type() + " Message:" + e.message);
                        }
                    }
                    fn && fn();
                }, function (a) {
                    if (typeof ths.onimportoptionstart === 'function') {
                        try {
                            ths.onimportoptionstart.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportoptionstart called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                }, function (a) {
                    if (typeof ths.onimportoptionend === 'function') {
                        try {
                            ths.onimportoptionend.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportoptionend called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                });
            }
            return this;
        },
        getId: function () {
            return this.dom.dataset("viewId");
        },
        getDom: function () {
            return this.dom;
        },
        postData: function (ops) {
            ops["dataType"] = "json";
            var ths = this;
            brooder.ajax(ops).done(function (a) {
                if (a.code && a.code === "1") {
                    ops.back && ops.back.call(ths, a.data);
                } else {
                    ops.dataerror && ops.dataerror.call(ths, a);
                }
            }).fail(function (a) {
                ops.neterror && ops.neterror.call(ths);
            });
        },
        triggerEvent: function (e) {
            e.currentTarget = this;
            if (this._handlers[e.type]) {
                return this._handlers[e.type].call(this, e);
            } else {
                if (this["event_" + e.type]) {
                    return this["event_" + e.type].call(this, e);
                } else {
                    return true;
                }
            }
        },
        initEvent: function (type, data) {
            var e = new viewevent(this, type, data);
            return e;
        },
        dispatchEvent: function (type, data, isdefault) {
            isdefault = isdefault === undefined ? true : isdefault;
            var event = new viewevent(this, type, data);
            if (isdefault === true) {
                var i = this;
                while (i) {
                    i.triggerEvent(event);
                    if (event._goon) {
                        i = i["parentView"];
                    } else {
                        break;
                    }
                }
            } else {
                this.triggerEvent(event);
                if (event._goon && this.typeOf("viewgroup")) {
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].dispatchEvent(type, data, false);
                    }
                }
            }
        },
        dispatchSuroundEvent: function (type, data) {
            var event = new viewevent(this, type, data);
            if (this.parentView) {
                for (var i in this.parentView.children) {
                    var a = this.parentView.children[i];
                    a.triggerEvent(event);
                    if (!event._goon) {
                        break;
                    }
                }
            }
        },
        addEventListener: function (type, fn) {
            this._handlers[type] = fn;
            return this;
        },
        removeEventListener: function (type, fn) {
            this._handlers[type] = null;
            return this;
        },
        remove: function () {
            this.dom.remove();
        },
        render: function (url, paras) {
            var ths = this;
            ths.onbeforerender && ths.onbeforerender();
            if (brooder.is.isString(url) && arguments.length === 2) {
                this.postData({
                    url: url,
                    data: paras,
                    back: function (data) {
                        try {
                            ths.dom.html(brooder.template(ths.template).render(data));
                            ths.delegateEvent();
                            ths.delegateFind();
                            ths.onendrender && ths.onendrender(data);
                        } catch (e) {
                            console.error("[brooder] render called error with module of " + ths.type() + " Message:" + e.message);
                        }
                    },
                    dataerror: function (e) {
                        try {
                            ths.onrenderror && ths.onrenderror();
                        } catch (e) {
                            console.error("[brooder] onrenderror called error with module of " + ths.type() + " Message:" + e.message);
                        }
                    },
                    neterror: function (e) {
                        try {
                            ths.onrenderror && ths.onrenderror();
                        } catch (e) {
                            console.error("[brooder] onrenderror called error with module of " + ths.type() + " Message:" + e.message);
                        }
                    }
                });
            } else {
                try {
                    ths.dom.html(brooder.template(ths.template).render(url));
                    ths.delegateAll();
                    ths.onendrender && ths.onendrender();
                } catch (e) {
                    console.error("[brooder] render called error with module of " + ths.type() + " Message:" + e.message);
                }
            }
        },
        delegateEvent: function () {
            var ths = this;
            this.dom.find("[data-bind]").each(function () {
                if (!$(this).data("_eventback_")) {
                    var q = {}, types = $(this).dataset("bind").split(" ");
                    for (var m in types) {
                        var type = types[m].split(":"), etype = type[0], back = type[1];
                        q[etype] = back;
                        $(this).removeAttr("data-bind").bind(etype, function (e) {
                            var back = $(this).data("_eventback_")[e.type];
                            ths["bind_" + back] && ths["bind_" + back].call(ths, $(this), e);
                        });
                    }
                    $(this).data("_eventback_", q);
                }
            });
        },
        delegateFind: function () {
            var ths = this;
            this.dom.find("[data-find]").each(function () {
                if (!$(this).data("_finder_")) {
                    var name = $(this).dataset("find");
                    $(this).data("_finder_", name).removeAttr("data-find");
                    try {
                        ths["find_" + name] && ths["find_" + name]($(this));
                    } catch (e) {
                        console.error("[brooder] view finder called error with module of " + ths.type() + " Message:" + e.message);
                    }
                }
            });
        },
        delegateBtn: function () {
            var ths = this;
            this.dom.find("[data-btn]").each(function (i) {
                if (!$(this).data("_btnback_")) {
                    var type = $(this).dataset("btn");
                    $(this).data("_btnback_", type + "_" + i).removeAttr("data-btn").bind("click", function (e) {
                        var back = $(this).data("_btnback_").split("_");
                        ths["btn_" + back[0]] && ths["btn_" + back[0]].call(ths, $(this), ths.option.btns ? ths.option.btns[back[1]] : null, e);
                    });
                }
            });
        },
        delegateAll: function () {
            this.delegateEvent();
            this.delegateFind();
            this.delegateBtn();
            return this;
        },
        original: function (methods) {
            var a = Object.getPrototypeOf(this)[methods];
            if (brooder.is.isFunction(a)) {
                var b = Array.prototype.slice.call(arguments);
                b.splice(0, 1);
                return a.apply(this, b);
            } else {
                return a;
            }
        },
        getPipe: function () {
            return new pipe(Array.prototype.slice.call(arguments));
        },
        parentsInvoke: function (methodName) {
            var t = this.parentView, r = null;
            while (t) {
                var a = t[methodName];
                if (a && brooder.is.isFunction(a)) {
                    var b = Array.prototype.slice.call(arguments);
                    b.splice(0, 1);
                    r = a.apply(t, b);
                    break;
                } else {
                    t = t.parentView;
                }
            }
            return r;
        },
        parentsParameter: function (propName) {
            var t = this.parentView, b = null;
            while (t) {
                b = t.parameters[propName];
                if (b !== undefined) {
                    break;
                } else {
                    t = t.parentView;
                }
            }
            return b;
        },
        setStorage: function (key, obj) {
            var a = "", b = window.localStorage.getItem(this.name);
            if (!b) {
                b = {};
                b[key] = obj;
                a = window.JSON.stringify(b);
            } else {
                b = window.JSON.parse(b);
                b[key] = obj;
                a = window.JSON.stringify(b);
            }
            window.localStorage.setItem(this.name, a);
            return this;
        },
        getStorage: function (key) {
            var b = window.localStorage.getItem(this.name);
            if (b) {
                b = window.JSON.parse(b);
            } else {
                b = {};
            }
            return b[key];
        },
        removeStorage: function (key) {
            return this.setStorage(key, null);
        },
        cleanStorage: function () {
            window.localStorage.removeItem(this.name);
            return this;
        },
        getUUID: function () {
            return brooder.util.uuid();
        },
        clean: function () {
            try {
                this.onunload();
            } catch (e) {
                console.error("[brooder] onunload called error with module of " + this.type() + " Message:" + e.stack);
            }
            var parentview = this.parentView;
            if (parentview && parentview.children) {
                var c = parentview.children.indexOf(this);
                if (c !== -1) {
                    parentview.children.splice(c, 1);
                }
            }
            var keys = Object.keys(this);
            for (var i in keys) {
                this[keys[i]] = null;
            }
            module.moduleList.splice(module.moduleList.indexOf(this), 1);
        }
    });
    module.add({
        name: "viewgroup",
        packet: "",
        extend: ["view"],
        option: {},
        layout: null,
        layoutmarco: {},
        ondomready: null,
        onoption: null,
        onimportstart: null,
        onimportend: null,
        oninitchild: null,
        _render: function (fn) {
            if (!this.dom.data("-view-")) {
                this._handlers = {};
                this.children = [];
                var ths = this, optionName = this.dom.dataset("option"), queue = brooder.queue();
                if (this.dom.hasClass("_futuretochange_")) {
                    this.dom.removeClass("_futuretochange_");
                    var prps = this.__adapt__._factory.mapping[this.__adapt__._type].prototype;
                    var cln = prps.fullClassName;
                    if (this.dom.get(0).tagName.toLowerCase() !== this.tagName) {
                        var a = $("<" + prps.tagName + " class='" + cln + "' data-view='" + this.dom.dataset("view") + "' data-parent-view='" + this.dom.dataset("parentView") + "' data-view-id='" + this.dom.dataset("viewId") + "' daa-option='" + this.dom.dataset("option") + "'></" + prps.tagName + ">");
                        this.dom.get(0).parentNode.replaceChild(a.get(0), this.dom.get(0));
                        this.dom = a;
                    }
                }
                option.get(this.type(), optionName, function (ops) {
                    if (!ths.option) {
                        ths.option = {};
                    }
                    if (!ths.option.override) {
                        ths.option.override = {};
                    }
                    if (ops) {
                        for (var i in ops) {
                            if (i.indexOf("override_") === 0 && i !== "override") {
                                ths.option.override[i.substring(9)] = ops[i];
                            } else {
                                ths.option[i] = ops[i];
                            }
                        }
                        for (var i in ops.override) {
                            ths.option.override[i] = ops.override[i];
                        }
                    }
                    for (var i in ths.option.override) {
                        if (!/^(dom)|^(option)|^(name)|^(extend)|^(init)/.test(i)) {
                            ths[i] = ths.option.override[i];
                        }
                    }
                    if (typeof ths.onbeforeinit === 'function') {
                        try {
                            ths.onbeforeinit(ths.option);
                        } catch (e) {
                            console.error("[brooder] onbeforeinit called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                    var str = ths.layout;
                    if (ths.dom.children().length > 0) {
                        str = ths.dom.html();
                    }
                    if (brooder.is.isString(str)) {
                        try {
                            var temp = brooder.template(str).macro(brooder.extend({
                                module: function (attrs, render) {
                                    var type = attrs["type"], option = attrs["option"], id = attrs["id"];
                                    var prps = {tagName: "div", fullClassName: "_futuretochange_"};
                                    if (ths.__adapt__._factory.mapping[type]) {
                                        var prps = ths.__adapt__._factory.mapping[type].prototype;
                                    }
                                    return "<" + prps.tagName + " class='" + prps.fullClassName + "' data-parent-view='" + ths.getId() + "' data-view='" + type + "' data-view-id='" + (id || ths.getId() + "-" + ths.children.length) + "' data-option='" + (option || "") + "'></" + prps.tagName + ">";
                                }
                            }, ths.layoutmarco));
                            str = temp.fn(new Function("data", "pid", "option", "module", temp.code())).render({
                                id: ths.getId(), option: ths.option
                            }, ths.getId(), ths.option, function (type, option, id) {
                                var prps = {tagName: "div", fullClassName: "_futuretochange_"};
                                if (ths.__adapt__._factory.mapping[type]) {
                                    var prps = ths.__adapt__._factory.mapping[type].prototype;
                                }
                                return "<" + prps.tagName + " class='" + prps.fullClassName + "' data-parent-view='" + ths.getId() + "' data-view='" + type + "' data-view-id='" + (id || ths.getId() + "-" + ths.children.length) + "' data-option='" + (option || "") + "'></" + prps.tagName + ">";
                            });
                        } catch (e) {
                            console.error("[brooder] parse layout called error with module of " + ths.type() + " Message:" + e.stack);
                            str = "";
                        }
                    }
                    ths.layout = str || "";
                    ths.dom.html(str);
                    if (typeof ths.ondomready === 'function') {
                        try {
                            ths.ondomready(ths.option);
                        } catch (e) {
                            console.error("[brooder] ondomready called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                    queue.complete(function (a) {
                        a.dom.data("-view-", a);
                        a["name"] = a.type();
                        a["shortname"] = a.shortName();
                        a.delegateAll();
                        if (typeof a.init === 'function') {
                            try {
                                if (a.className && a.className !== "") {
                                    a.dom.addClass(a.className);
                                }
                                a.init(a.option);
                            } catch (e) {
                                console.error("[brooder] init called error with module of " + ths.type() + " Message:" + e.stack);
                            }
                        }
                        if (typeof a.onendinit === 'function') {
                            try {
                                a.onendinit(a.option);
                            } catch (e) {
                                console.error("[brooder] onendinit called error with module of " + ths.type() + " Message:" + e.stack);
                            }
                        }
                        fn && fn();
                    });
                    ths.dom.find("*[data-parent-view='" + ths.getId() + "']").each(function () {
                        queue.add(function (aa, dom) {
                            var que = this;
                            var ops = {}, subview = dom.dataset("view"), subid = dom.dataset("viewId");
                            if (aa.oninitchild) {
                                try {
                                    aa.oninitchild({id: subid, type: subview});
                                } catch (e) {
                                    console.error("[brooder] oninitchild called error with module of " + ths.type() + " Message:" + e.stack);
                                }
                            }
                            module.get(aa.type(), subview, null, function (k) {
                                for (var i = k.__adapt__._extendslink.length - 1; i >= 0; i--) {
                                    brooder.extend(ops, aa.option[k.__adapt__._extendslink[i]]);
                                }
                                brooder.extend(ops, aa.option[subid]);
                                var tops = null;
                                if (typeof aa.onoption === 'function') {
                                    try {
                                        tops = aa.onoption.call(aa, ops, subview, subid);
                                        brooder.extend(ops, tops);
                                    } catch (e) {
                                        console.error("[brooder] onoption called error with module of " + ths.type() + " Message:" + e.stack);
                                    }
                                }
                                brooder.extend(k.option, ops);
                                if (!dom.data("-view-")) {
                                    var obj = k;
                                    obj.dom = dom;
                                    obj.parentView = aa;
                                    aa.children.push(obj);
                                    obj.privator("render", function () {
                                        que.next(aa);
                                    });
                                } else {
                                    que.next(aa);
                                }
                            }, function (a) {
                                if (typeof aa.onimportstart === 'function') {
                                    try {
                                        aa.onimportstart.call(aa, a);
                                    } catch (e) {
                                        console.error("[brooder] onimportstart called error with module of " + ths.type() + " Message:" + e.stack);
                                    }
                                }
                            }, function (a) {
                                if (typeof aa.onimportend === 'function') {
                                    try {
                                        aa.onimportend.call(aa, a);
                                    } catch (e) {
                                        console.error("[brooder] onimportend called error with module of " + ths.type() + " Message:" + e.stack);
                                    }
                                }
                            });
                        }, function () {
                            this.next(ths);
                        }, brooder(this));
                    });
                    queue.run(ths);
                }, function (a) {
                    if (typeof ths.onimportoptionstart === 'function') {
                        try {
                            ths.onimportoptionstart.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportoptionstart called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                }, function (a) {
                    if (typeof ths.onimportoptionend === 'function') {
                        try {
                            ths.onimportoptionend.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportoptionend called error with module of " + ths.type() + " Message:" + e.stack);
                        }
                    }
                });
            }
            return this;
        },
        _addChild: function (xindex, option, callback) {
            var ths = this, ops = brooder.extend({type: null,
                option: "",
                parameters: null,
                id: this.getId() + "-" + this.children.length,
                container: "body",
                target: null
            }, option);
            if (ops.container.isWrapper && !ops.container.isWrapper()) {
                ops.container = "body";
            }
            if (ops.type && brooder.is.isString(ops.type) && ops.type !== "") {
                module.get(ths.type(), ops.type, null, function (sobj) {
                    if (xindex === undefined || xindex === null || xindex >= ths.children.length) {
                        ths.children.push(sobj);
                    } else {
                        ths.children.splice(xindex, 0, sobj);
                    }
                    var cln = sobj.__adapt__._factory.mapping[sobj.__adapt__._type].prototype.fullClassName;
                    var coner = brooder(ops.container);
                    sobj.dom = brooder("<" + sobj.tagName + " class='" + cln + "' data-parent-view='" + ths.getId() + "' data-view='" + ops.type + "' data-view-id='" + ops.id + "' data-option='" + (is.isObject(ops.option) ? "" : ops.option) + "'></" + sobj.tagName + ">").appendTo(coner);
                    var opss = {};
                    for (var i = sobj.__adapt__._extendslink.length - 1; i >= 0; i--) {
                        brooder.extend(opss, ths.option[sobj.__adapt__._extendslink[i]]);
                    }
                    brooder.extend(opss, sobj.__adapt__._option, ths.option[ops.id], ths.option[ops.type]);
                    if (is.isObject(ops.option)) {
                        var tp = {};
                        tp.override = ops.option.override || {};
                        for (var i in ops.option) {
                            if (i !== "override") {
                                if (i.indexOf("override_") === 0) {
                                    tp.override[i.substring(9)] = ops.option[i];
                                } else {
                                    tp[i] = ops.option[i];
                                }
                            }
                        }
                        sobj.option = brooder.extend(opss, tp);
                        for (var i in sobj.option.override) {
                            if (!/^(dom)|^(option)|^(name)|^(extend)|^(init)/.test(i)) {
                                sobj[i] = sobj.option.override[i];
                            }
                        }
                    }
                    if (!ths.dom.contain(sobj.dom)) {
                        sobj.___outer___ = true;
                    }
                    sobj.option = opss;
                    sobj.parameters = ops.parameters;
                    sobj.target = ops.target;
                    sobj.parentView = ths;
                    sobj.privator("render", function () {
                        if (typeof ths.oninitchild === 'function') {
                            try {
                                ths.oninitchild({id: sobj.getId(), type: sobj.type()});
                            } catch (e) {
                                console.error("[brooder] oninitchild called error with module of " + ths.type() + " [" + e.message + "]");
                            }
                        }
                        callback && callback.call(sobj);
                    });
                }, function (a) {
                    if (typeof ths.onimportstart === 'function') {
                        try {
                            ths.onimportstart.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportstart called error with module of " + ths.type() + " [" + e.message + "]");
                        }
                    }
                }, function (a) {
                    if (typeof ths.onimportend === 'function') {
                        try {
                            ths.onimportend.call(ths, a);
                        } catch (e) {
                            console.error("[brooder] onimportend called error with module of " + ths.type() + " [" + e.message + "]");
                        }
                    }
                });
            }
        },
        render: brooder.nfn,
        rerender: function () {
            this.dom.data("-view-", null);
            this.privator("render");
        },
        parentViews: function (level) {
            level = brooder.is.isAvalid(level) ? (brooder.is.isNumber(level) ? level : parseInt(level)) : 0;
            var b = this.parentView, c = level - 1;
            while (b && c > 0) {
                c--;
                b = b.parentView;
            }
            return b;
        },
        previousSibling: function () {
            if (this.parentView) {
                var a = this.parentView.children.indexOf(this);
                if (a !== 0) {
                    return this.parentView.children[a - 1];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },
        nextSibling: function () {
            if (this.parentView) {
                var a = this.parentView.children.indexOf(this);
                if (a + 1 < this.parentView.children.length) {
                    return this.parentView.children[a + 1];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },
        getChildrenByType: function (type) {
            var r = [];
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].typeOf(type)) {
                    r.push(this.children[i]);
                }
            }
            return r;
        },
        getChildByType: function (type, index) {
            index = (index === undefined || index === index) ? 0 : index;
            return this.getChildrenByType(type)[index];
        },
        getChildById: function (id) {
            var r = null;
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].getId() === id) {
                    r = this.children[i];
                    break;
                }
            }
            return r;
        },
        getChildAt: function (index) {
            if (brooder.is.isNumber(index) && index >= 0 && index < this.children.length) {
                return this.children[index];
            } else {
                return null;
            }
        },
        childEach: function (fn) {
            for (var i = 0; i < this.children.length; i++) {
                if (fn) {
                    if (fn.call(this.children[i], i, this.children[i], this.children) === false) {
                        break;
                    }
                } else {
                    break;
                }
            }
        },
        contains: function (view) {
            return this.children.indexOf(view) !== -1;
        },
        getFirstChild: function (type) {
            if (brooder.is.isAvalid(type)) {
                return this.getChildrenByType(type)[0];
            } else {
                return this.children[0];
            }
        },
        getLastChild: function (type) {
            var r = null;
            if (brooder.is.isAvalid(type)) {
                var a = this.getChildrenByType(type);
                if (a.length > 0) {
                    r = a[a.length - 1];
                }
            } else {
                this.children.length > 0 && (r = this.children[this.children.length - 1]);
            }
            return r;
        },
        getChildIndex: function (view) {
            return this.children.indexOf(view);
        },
        addChild: function (option) {
            var ths = this, prs = new promise();
            prs.scope(this);
            module.task.add(function (a, b) {
                var tts = this;
                ths.privator("addChild", null, b, function () {
                    tts.next();
                    prs.resolve(this);
                });
            }, null, option);
            return prs;
        },
        addChildAt: function (index, option) {
            var ths = this, prs = new promise();
            prs.scope(this);
            module.task.add(function (a, b) {
                var tts = this;
                ths.privator("addChild", index, b, function () {
                    prs.resolve(this);
                    tts.next();
                });
            }, null, option);
            return prs;
        },
        setChildIndex: function (obj, index) {
            if (index !== undefined && index !== null && index < this.children.length - 1) {
                var a = this.children.indexOf(obj);
                this.children.splice(a, 1);
                this.children.splice(index, 0, obj);
            }
            return this;
        },
        duplicateChild: function (child, id) {
            if (child) {
                this.privator("addChild", null, {
                    type: this.name,
                    option: brooder.extend({}, this.option),
                    parameters: this.parameters,
                    id: id || (this.getId() + "-" + this.children.length),
                    container: this.dom.parent()
                });
            }
            return this;
        },
        removeChild: function (id) {
            var a = this.getChildById(id);
            a && a.remove();
            return this;
        },
        removeChildAt: function (index) {
            if (brooder.is.isNumber(index) && index > 0 && index < this.children.length) {
                this.children[index].remove();
            }
            return this;
        },
        removeAllChild: function () {
            while (this.children.length > 0) {
                this.children.pop().remove();
            }
            return this;
        },
        getChildPipe: function () {
            var b = Array.prototype.slice.call(arguments);
            return new pipeChild(this, b);
        },
        clean: function () {
            var outers = [];
            for (var i in this.children) {
                if (this.children[i].___outer___) {
                    outers.push(this.children[i]);
                }
            }
            while (outers.length > 0) {
                outers.pop().remove();
            }
            try {
                this.onunload();
            } catch (e) {
                console.error("[brooder] onunload called error with module of " + this.type() + " Message:" + e.stack);
            }
            var parentview = this.parentView;
            if (parentview && parentview.children) {
                var c = parentview.children.indexOf(this);
                if (c !== -1) {
                    parentview.children.splice(c, 1);
                }
            }
            for (var i in this) {
                this[i] = null;
            }
        }
    });
    module.add({
        name: "root",
        packet: "",
        extend: ["viewgroup"],
        className: "root",
        option: {
            packets: []
        },
        init: function () {
            console.log("[brooder] root view init.");
        },
        oninitimportstart: brooder.nfn,
        oninitimportprogress: brooder.nfn,
        oninitimportend: brooder.nfn,
        importPackets: function () {
            if (!this.option.override) {
                this.option.override = {};
            }
            for (var i in this.option) {
                if (i.indexOf("override_") === 0) {
                    this.option.override[i.substring(9)] = this.option[i];
                }
            }
            for (var i in this.option.override) {
                if (!/^(dom)|^(option)|^(name)|^(extend)|^(init)/.test(i)) {
                    this[i] = this.option.override[i];
                }
            }
            var a = [];
            for (var i = 0; i < module.basemapping.basicPackets.length; i++) {
                a.push(module.basemapping.basicPackets[i]);
            }
            if (brooder.is.isArray(this.option.packets)) {
                for (var i = 0; i < this.option.packets.length; i++) {
                    a.push(this.option.packets[i]);
                }
            }
            if (a.length > 0) {
                var queue = brooder.queue(), ths = this;
                queue.complete(function () {
                    ths.oninitimportend.call(ths);
                    ths.privator("render");
                }).progress(function (a) {
                    ths.oninitimportprogress.call(ths, a);
                });
                for (var i = 0; i < a.length; i++) {
                    queue.add(function (a, b) {
                        var ths = this;
                        brooder.packet({
                            basepath: module.basemapping.basePath,
                            packetName: b,
                            back: function () {
                                ths.next();
                            }
                        });
                    }, null, a[i]);
                }
                ths.oninitimportstart.call(ths);
                queue.run();
            } else {
                this.privator("render");
            }
        }
    });

    brooder.overrideView = function (obj) {
        var view = module.factory.get("view");
        var group = module.factory.get("viewgroup");
        var root = module.factory.get("root");
        for (var i in obj) {
            if (i !== "init" && i !== "option" && i !== "extend") {
                view.prototype[i] = obj[i];
                group.prototype[i] = obj[i];
                root.prototype[i] = obj[i];
            }
        }
    };
    brooder.overrideViewGroup = function (obj) {
        var group = module.factory.get("viewgroup");
        for (var i in obj) {
            if (i !== "init" && i !== "option" && i !== "extend") {
                group.prototype[i] = obj[i];
            }
        }
    };
    brooder.overrideRoot = function (obj) {
        var group = module.factory.get("root");
        for (var i in obj) {
            if (i !== "init" && i !== "option" && i !== "extend") {
                group.prototype[i] = obj[i];
            }
        }
    };
    brooder.Option = function (optionx, filter, newset) {
        if (brooder.is.isString(optionx)) {
            var a = option.has(optionx) || null;
            if (a) {
                var b = brooder.extend(json.clone(a), {}), c = {};
                if (filter && is.isArray(filter) && filter.length > 0) {
                    for (var i = 0; i < filter.length; i++) {
                        c[filter[i]] = b[filter[i]];
                    }
                } else {
                    c = b;
                }
                brooder.extend(c, newset);
                return c;
            } else {
                return null;
            }
        } else {
            if (brooder.___info) {
                optionx.name = (brooder.___info.packet ? brooder.___info.packet + "." : "") + optionx.name;
            }
            option.add(optionx);
        }
    };
    brooder.Module = function (obj) {
        if (brooder.___info) {
            obj.packet = brooder.___info.packet;
        }
        module.add(obj);
    };
    brooder.Boot = function (optionx, option) {
        if (!isboot) {
            var ops = {
                basePath: "",
                debug: false
            };
            brooder.extend(module.basemapping, ops, optionx);
            packet.basePath = module.basemapping.basePath;
            console.log("[brooder] version:" + brooderInfo.version + " line:" + brooderInfo.line + " gzip:" + brooderInfo.gzip + " debug:" + module.basemapping.debug + " basePath:" + module.basemapping.basePath);
            var root = brooder("*[data-view='root']");
            if (root.length > 0) {
                module.getViewInstance(root, option, function (a) {
                    a.importPackets();
                });
            } else {
                throw Error("[brooder boot] can not find the root element.");
            }
        }
    };
    query.prototype.Boot = function (option, optionName) {
        if (is.isString(optionName)) {
            this.dataset("view", "root").dataset("viewId", "root").dataset("option", optionName);
            brooder.Boot(option);
        } else {
            this.dataset("view", "root").dataset("viewId", "root").dataset("option", "");
            brooder.Boot(option, optionName);
        }
        return this;
    };
    query.prototype.getModule = function () {
        return this.data("-view-");
    };
    query.prototype.predefined = function (name, args) {
        var a = query.prototype[name];
        if (a) {
            var b = Array.prototype.slice.call(arguments);
            b.splice(0, 1);
            return a.call(this, b);
        } else {
            return this;
        }
    };
    var _override = {};
    brooder.override = function (name, obj) {
        if (is.isString(name)) {
            if (is.isObject(obj)) {
                if (!_override[name]) {
                    _override[name] = brooder.extend(new query(), obj);
                } else {
                    brooder.extend(_override[name], obj);
                }
            }
        }
    };
    brooder.toggle = function (name) {
        if (is.isString(name)) {
            _override[name] && (dom.prototype = _override[name]);
        } else {
            dom.prototype = new query();
        }
    };
    brooder.global = {};
    brooder.fn = query.prototype;
    window.brooder = brooder;
    window.$ = brooder;
    brooder.debug = {
        modules: module.factory, options: option.options,
        packets: packetmapping,
        require: requiremapping,
        doms: dommapping
    };
})();