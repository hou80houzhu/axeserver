/*!
 * @packet contenter.plugins;
 */
Plugin({
    name: "tab",
    option: {
        titleClass: "titlecon",
        contentClass: "contentcon",
        titleActiveClass: "hover",
        contentActiveClass: "hover"
    },
    init: function () {
        var ths = this;
        this.dom.find("." + this.option.titleClass).children().each(function (i) {
            $(this).attr("tabIndex", i).click(function () {
                ths.gotoTab($(this).attr("tabIndex"));
            });
        });
        this.gotoTab(0);
    },
    gotoTab: function (num) {
        num = num / 1;
        var ths = this;
        if (num >= 0 && num < this.dom.find("." + this.option.titleClass).children().length) {
            this.dom.find("." + this.option.titleClass).children().each(function (i) {
                if (i === num) {
                    $(this).addClass(ths.option.titleActiveClass);
                } else {
                    $(this).removeClass(ths.option.titleActiveClass);
                }
            });
            this.dom.find("." + this.option.contentClass).children().each(function (i) {
                if (i === num) {
                    $(this).addClass(ths.option.contentActiveClass);
                } else {
                    $(this).removeClass(ths.option.contentActiveClass);
                }
            });
        }
    }
});