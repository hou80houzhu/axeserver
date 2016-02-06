/*!
 * @packet mart.option.root;
 * @require mart.main; 
 * @json mart.pagemapping;
 * @css mart.style.main:pp;
 * @css mart.style.font-awesome-min;
 */
Option({
    name: "root",
    override_event_openPage: function (e) {
        this.getFirstChild().triggerEvent(e);
    },
    override_onendinit: function () {
        this.addChild({
            type: "@main.pageController",
            option: {
                url: window.basePath,
                router: module.getJson("@pagemapping").data
            }
        });
    }
});

