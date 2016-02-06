/*!
 * @packet admin.option.root;
 * @include admin.form;
 * @include admin.main;
 * @css admin.style.base;
 * @css admin.style.font-awesome-min;
 * @css admin.style.default;
 */
Option({
    name: "root",
    session: basePath + "session",
    logout: basePath + "admin/logout",
    userinfo: basePath + "admin/userinfo",
    "@main.mainpage": {
        menu: {
            url: basePath+"admin/menu"
//            url: basePath + "data/menumapping.json"
        }
    },
    "@main.login": {
        form: {
            action: basePath + "login",
            fields: [
                {type: "@form.text", label: "USERNAME", name: "username", required: true, value: ""},
                {type: "@form.text", label: "PASSWORD", name: "password", required: true, inputType: "password", value: ""}
            ]
        }
    },
    override: {
        onendinit: function () {
            this.postData({
                url: this.option.session,
                back: function () {
                    this.dispatchEvent("loginEnd");
                },
                dataerror: function () {
                    this.addChild({
                        type: "@main.login"
                    });
                }
            });
        },
        oninitimportstart: function () {
            console.log("----start");
        },
        oninitimportprogress: function (e) {
            console.log("------progress--%o", e);
        },
        oninitimportend: function () {
            console.log("-------end");
        },
        onimportstart: function (a) {
            console.log("-------->>import:%o", a.module);
        },
        onimportoptionstart: function (a) {
            console.log("-----<" + a.option);
        },
        onimportoptionend: function (a) {
            console.log("-----<" + a.option);
        },
        oninitchild: function (e) {
            console.log("-------->>%o---%o", e.id, e.type);
        },
        event_quitApp: function () {
            this.postData({
                url: this.option.logout,
                back: function () {
                    this.getFirstChild().remove();
                    this.addChild({
                        type: "@main.login"
                    });
                }
            });
        },
        event_loginEnd: function () {
            if (this.children.length > 0) {
                this.getFirstChild().remove();
            }
            this.addChild({
                type: "@main.mainpage"
            });
        },
        event_userInfo: function () {
            this.addChild({
                type: "@main.choutier",
                option: {
                    inner: "@form.listform",
                    "@form.listform": {
                        action: basePath + "user/editpassword",
                        fields: [
                            {type: "@form.text", label: "USERNAME", name: "username", disabled: true},
                            {type: "@form.text", label: "PASSWORD", name: "password", inputType: "password"},
                            {type: "@form.text", label: "REINPUT", name: "reinput", inputType: "password", override: {customCheck: function () {
                                        if (this.parentView.getChildAt(1).getValue() === this.getValue()) {
                                            this.hideTip();
                                            return true;
                                        } else {
                                            this.showTip("两次密码输入不同");
                                            return false;
                                        }
                                    }}}
                        ]
                    },
                    btns: [
                        {name: "submit", icon: "fa fa-check", action: "submit"},
                        {name: "close", icon: "fa fa-times", action: "close"}
                    ],
                    override: {
                        event_submit: function (e) {
                            var btn = e.data.btn;
                            btn.html("<i class='fa fa-refresh fa-spin'></i>");
                            this.getFirstChild().submit().done(function () {
                                btn.html("<i class='fa fa-check'></i>");
                            }).fail(function () {
                                btn.html("<i class='fa fa-check'></i>");
                            });
                        }
                    }
                }
            }).done(function () {
                this.postData({
                    url: this.option.userinfo,
                    back: function (data) {
                        this.getLastChild().getFirstChild().setValues(data);
                    }
                });
            });
        },
        event_systemconfig: function () {
            this.addChild({
                type: "@main.choutier",
                option: {
                    inner: "@form.listform",
                    "@form.listform": {
                        action: basePath + "user/editpassword",
                        fields: [
                            {type: "@form.imageupload", label: "USERNAME", name: "image", url: basePath + "admin/background", filename: "file"}
                        ]
                    },
                    btns: [
                        {name: "submit", icon: "fa fa-check", action: "submit"},
                        {name: "close", icon: "fa fa-times", action: "close"}
                    ],
                    override: {
                        event_submit: function (e) {
                            var ths = this;
                            this.getFirstChild().getValues().done(function (data) {
                                $(".quickmenu").css("background-image", "url(" + basePath + "assets/packets/admin/style/images/m.jpg?random="+(new Date().getTime()) + ")");
                                ths.close();
                            });
                        }
                    }
                }
            });
        }
    }
});