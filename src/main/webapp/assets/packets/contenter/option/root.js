/*!
 * @packet contenter.option.root; 
 * @require contenter.editor;
 * @require contenter.advance;
 * @include contenter.form;
 * @css contenter.style.baseui;
 * @css contenter.style.form;
 */
Option({
    name: "root",
    override_dispatchChildEvent: function (e) {
        if (this.dom.find("iframe").length > 0)
            this.dom.find("iframe").get(0).contentWindow.brooder("body").getModule().getChildrenByType("@editor.editorlite")[0].dispatchEvent(e.type, e.data);
    },
    override_onendinit: function () {
//        $(window).bind("beforeunload",function(e){
//            e.returnValue="确定要退出？所做的修改都将无效";
//        });
        this.addChild({
            type: "@editor.pager"
        });
        this.addChild({
            type: "@editor.header"
        });
        this.addChild({
            type: "@advance.leftbar"
        });
        this.addChild({
            type: "@editor.boxcontainer"
        });
    },
    override_event_refresheditpage:function(){
        this.getFirstChild().refreshPage();
    },
    override_event_hidemask:function(e){
        this.getChildByType("@editor.boxcontainer",0).hideMask();
    },
    override_event_callpage: function (e) {
        this.dispatchChildEvent(e.data);
    },
    override_event_showModuleInfo: function (e) {
        this.getChildrenByType("@editor.boxcontainer")[0].triggerEvent(e);
    },
    override_event_hideModuleInfo: function (e) {
        this.getChildrenByType("@editor.boxcontainer")[0].triggerEvent(e);
    },
    override_event_showModuleList: function (e) {
        this.getChildrenByType("@editor.boxcontainer")[0].triggerEvent(e);
    },
    override_event_showLayout: function (e) {
        this.getChildrenByType("@editor.boxcontainer")[0].triggerEvent(e);
    },
    override_event_hideLayout: function (e) {
        this.getChildrenByType("@editor.boxcontainer")[0].triggerEvent(e);
    },
    override_event_layoutsetting: function (e) {
        this.getChildrenByType("@editor.boxcontainer")[0].triggerEvent(e);
    },
    override_event_addgloballayout: function (e) {
        this.getChildrenByType("@editor.boxcontainer")[0].triggerEvent(e);
    },
    override_event_addModulext: function (e) {
        this.dispatchChildEvent(e);
    },
    override_event_addLayout: function (e) {
        this.dispatchChildEvent(e);
    },
    override_event_addGlobalLayout: function (e) {
        this.dispatchChildEvent(e);
    },
    override_event_getpageinfo: function (e) {
        this.dispatchChildEvent(e);
    },
    override_event_cleanFocus: function (e) {
        this.dispatchChildEvent(e);
    },
    override_event_savepageinfo: function (e) {
        this.postData({
            url: basePath + "contenter/savepage",
            data: {pageinfo: window.JSON.stringify(e.data)},
            back: function (e) {
                this.getChildByType("@editor.header",0).resetSave();
                this.getChildByType("@advance.leftbar",0).resetSave();
            }
        });
    },
    override_event_gotopage: function (e) {
        this.getChildrenByType("@editor.header")[0].setTitle(e.data.title);
        this.getChildrenByType("@editor.header")[0].show();
        this.getChildrenByType("@advance.leftbar")[0].show();
        this.getChildrenByType("@editor.pager")[0].show();
        this.getChildrenByType("@editor.pager")[0].showBottom();
        this.getChildrenByType("@editor.pager")[0].openPage(e.data);
        this.getChildrenByType("@editor.header")[0].asedit();
    },
    override_event_review: function (e) {
        this.getChildrenByType("@editor.pager")[0].review(e.data);
    },
    override_event_chagenchildlayout: function (e) {
        this.dispatchChildEvent(e);
    },
    override_event_moduleimg:function(e){
        this.addChild({
            type: "@editor.messagebox",
            option: {
                inner: "@editor.img",
                width:600,
                title: "组件预览",
                "@editor.img": {
                    img:e.data
                },
                btns: [
                    {name: "close", action: "close", icon: "fa fa-times"}
                ]
            }
        });
    },
    override_event_refreshCurrentPage:function(e){
        this.getChildrenByType("@editor.header")[0].setTitle(e.data.pagename);
        this.getChildByType("@editor.pager",0).refreshPage();
    },
    override_event_editpageinfo: function () {
        this.addChild({
            type: "@editor.messagebox",
            option: {
                inner: "@form.listform",
                title: "修改页面",
                "@form.listform": {
                    fields: [
                        {"type": "@form.text", "label": "页面标题", "name": "pagename", "value": "xxxx"},
                        {"type": "@form.text", "label": "页面描述", "name": "pagedesc", "value": "xxxx"},
                        {"type": "@form.text", "label": "关键字", "name": "pagekeywords", "value": "xxxx"},
                        {"type": "@form.text", "label": "内容概要", "name": "pagecontent", "value": "xxxx"},
                        {"type": "@form.text", "label": "URL", "name": "pageurl", "value": "xxxx"}
                    ]
                },
                btns: [
                    {name: "check", action: "check", icon: "fa fa-check"},
                    {name: "close", action: "close", icon: "fa fa-times"}
                ],
                override: {
                    onendinit:function(){
                        this.getChildByType("@form.listform",0).disable();
                        this.postData({
                            url:basePath+"contenter/pageinfo",
                            data:{pagename:window.editor_pagename},
                            back:function(data){
                                this.getChildrenByType("@form.listform")[0].setValues({
                                    pagename:data.title,
                                    pagedesc:data.desc,
                                    pagekeywords:data.keywords,
                                    pagecontent:data.content,
                                    pageurl:data.pageurl
                                });
                            }
                        });
                    },
                    event_check: function (e) {
                        var ths=this;
                        this.getChildrenByType("@form.listform")[0].getValues().done(function(da){
                            da["pageId"]=window.editor_pagename;
                            ths.postData({
                                url:basePath+"contenter/editpageinfo",
                                data:da,
                                back:function(){
                                    ths.hide();
                                    ths.dispatchEvent("refreshCurrentPage",da);
                                }
                            });
                        });
                    }
                }
            }
        });
    }
});

