/*!
 * @packet page.form.base;
 * @include page.form.field; 
 */
Module({
    name: "baseform",
    extend: "viewgroup",
    option: {
        action: "",
        fields: []
    },
    getFieldByName: function (name) {
        var a = null;
        this.childEach(function () {
            if (this.typeOf("@.basefield") && this.getFieldName() === name) {
                a = this;
                return false;
            }
        });
        return a;
    },
    check: function () {
        var a = true, field = null;
        this.childEach(function () {
            if (this.typeOf("@.basefield")) {
                a = this.check();
                field = this;
                return a;
            }
        });
        if (a) {
            if (this.customCheck) {
                a = this.customCheck.call(this);
            }
        }
        if (!a) {
            this.oncheckerror && this.oncheckerror(field);
        }
        return a;
    },
    reset: function () {
        this.childEach(function () {
            if (this.typeOf("@.basefield")) {
                this.reset();
            }
        });
    },
    disable: function () {
        this.childEach(function () {
            if (this.typeOf("@.basefield")) {
                this.disable();
            }
        });
    },
    getValues: function () {
        var vals = [], asys = [], promise = $.promise();
        this.childEach(function () {
            if (this.typeOf("@.Aasys")) {
                asys.push(this);
            } else if (this.typeOf("@.basefield")) {
                var valsx = this.getValue();
                if ($.is.isArray(valsx)) {
                    for (var i in valsx) {
                        vals.push(valsx[i]);
                    }
                } else {
                    vals.push(valsx);
                }
            }
        });
        var queue = $.queue();
        for (var i in asys) {
            queue.add(function (result, obj) {
                obj.asys(function (val) {
                    if ($.is.isArray(val)) {
                        for (var i in val) {
                            vals.push(val[i]);
                        }
                    } else {
                        vals.push(val);
                    }
                    queue.next(val);
                });
            }, null, asys[i]);
        }
        queue.complete(function () {
            var r = {};
            for (var i in vals) {
                r[vals[i].name] = vals[i].value;
            }
            promise.resolve(r);
        });
        queue.run();
        return promise;
    },
    setValues: function (obj) {
        if (obj) {
            this.childEach(function () {
                if (this.typeOf("@.basefield")) {
                    var k = obj[this.getFieldName()];
                    if (k !== undefined) {
                        this.setValue(k);
                    }
                }
            });
        }
    },
    submit: function (fn) {
        var ths = this;
        if (this.check()) {
            var pros = $.promise();
            this.getValues().done(function (data) {
                ths.postData({
                    url: ths.option.action,
                    data: fn ? fn(data) : data,
                    back: function (da) {
                        pros.resolve(da);
                    },
                    dataerror: function (e) {
                        pros.reject(e);
                    },
                    neterror: function (e) {
                        pros.reject(e);
                    }
                });
            });
            return pros;
        }
    },
    onoption: function (option, view, viewid) {
        var name = viewid.substring(1, viewid.length);
        return this.option.fields[name];
    },
    event_selectchange: function (e) {
        var next = e.data.next, value = e.data.value, ths = this;
        this.childEach(function () {
            if (this.typeOf("@field.select") && this.getFieldName() === next) {
                this.loadData(value);
            }
        });
        e.stopPropagation();
    }
});
Module({
    name: "basefield",
    extend: "view",
    option: {
        name: "",
        label: "",
        value: "",
        disabled: false,
        required: false
    },
    value: null,
    customCheck: null,
    check: function () {
        if (this.customCheck) {
            return this.customCheck.call(this);
        } else {
            return true;
        }
    },
    getValue: function () {
        return {
            name: this.option.name,
            value: this.value
        };
    },
    setValue: function (a) {
        this.value = a;
        return this;
    },
    disable: function (isdisable) {
        return this;
    },
    reset: function () {
        this.setValue(this.value);
        return this;
    },
    getFieldName: function () {
        return this.option.name;
    },
    getLabelName: function () {
        return this.option.label;
    }
});
Module({
    name: "field",
    extend: "@.basefield",
    className: "field"
});
Module({
    name: "fieldgroup",
    extend: ["viewgroup", "@.basefield"],
    getValue: function () {
        return [];
    }
});
Module({
    name: "Aasys",
    asys: null,
    getValue: function (fn) {
        this.asys && this.asys(fn);
    }
});
Module({
    name: "asysfield",
    extend: ["@.field", "@.Aasys"],
    asys: function (fn) {
        fn && fn({
            name: this.getFieldName(),
            value: this.value
        });
    }
});
Module({
    name: "asysfieldgroup",
    extend: ["@.fieldgroup", "@.Aasys"],
    asys: function (fn) {
        fn && fn([]);
    }
});