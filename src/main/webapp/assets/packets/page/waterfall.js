/*!
 * @packet page.waterfall; 
 */
Module({
    name: "lite",
    extend: "view",
    className: "waterfall",
    option: {
        url: "data/waterfall/data.json",
        col: 3,
        padding: 10,
        pageSize: 10,
        formName: "form",
        toName: "to",
        rowTemplate: "<div><img style='width:100%' src='<%=data.url;%>'></div><div>xxxxxxxx</div>",
        offsetHeight: 50
    },
    template: "<div class='waterfall-container'></div>" +
            "<div class='waterfall-bottombar'>" +
            "<div class='waterfall-loading-icon'></div>" +
            "<div class='waterfall-loading-text'>Loading...</div>" +
            "</div>",
    init: function () {
        this.render();
        this.current = 0;
        this.isLoading = false;
        this._template = $.template(this.option.rowTemplate);
        this.dom.css({
            "position": "relative"
        });
        this._container = this.dom.find(".waterfall-container");
        this._width = this.dom.width();
        this._onewidth = (this._width - (this.option.col - 1) * this.option.padding) / this.option.col;
        this._mwidth = this._onewidth + this.option.padding;
        this._cols = [];
        for (var i = 0; i < this.option.col; i++) {
            this._cols[i] = 0;
        }
        this.getData();
        var ths = this;
        var tt = function () {
            var a = $(this).scrollTop();
            if (a >= ths.dom.find(".waterfall-bottombar").offset().top - $(window).height()) {
                ths.getData();
            }
        };
        $(window).bind("scroll", tt);
        this.onunload = function () {
            $(window).unbind("scroll", tt);
        };
    },
    btn_next: function () {
        this.getData();
    },
    showLoading: function () {
        this.dom.find(".waterfall-bottombar").html("<div class='waterfall-loading-icon'></div><div class='waterfall-loading-text'>Loading...</div>");
    },
    showEnd: function () {
        this.dom.find(".waterfall-bottombar").html("no more data");
    },
    getData: function () {
        var ths = this;
        if (!this.isLoading) {
            this.isLoading = true;
            this.showLoading();
            var t = {};
            t[this.option.formName] = this.current;
            t[this.option.toName] = this.current + this.option.pageSize;
            this.current += this.option.pageSize;
            this.postData({
                url: this.option.url,
                data: t,
                back: function (data) {
                    ths.isLoading = false;
                    ths.arrange(data);
                },
                dataerror: function () {
                    ths.showEnd();
                },
                neterror: function () {
                    ths.showEnd();
                }
            });
        }
    },
    arrange: function (data) {
        for (var i in data) {
            var _height = this._onewidth * data[i].height / data[i].width + this.option.offsetHeight;
            var _width = this._onewidth;
            var _top = 0;
            var _c = 0;
            if (this._cols[i] === 0) {
                _c = i;
            } else {
                _c = this.getMinIndex();
                _top = this._cols[_c];
            }
            this._cols[_c] = this._cols[_c] + _height + this.option.padding + this.option.offsetHeight;
            var _left = _c * this._mwidth;
            $("<div class='cell' style='overflow:hidden;width:" +
                    _width +
                    "px;height:" +
                    _height +
                    "px;position:absolute;left:" +
                    _left +
                    "px;top:" +
                    _top +
                    "px'>" +
                    (this._template.render(data[i])) +
                    "</div>").appendTo(this._container);
            this._container.height(this._cols[this.getMaxIndex()]);
        }
    },
    getMaxIndex: function () {
        var a = 0, index = 0;
        for (var i in this._cols) {
            if (this._cols[i] > a) {
                a = this._cols[i];
                index = i;
            }
        }
        return index;
    },
    getMinIndex: function () {
        var a = 0, index = 0;
        for (var i in this._cols) {
            if (a === 0) {
                a = this._cols[i];
            }
            if (this._cols[i] < a) {
                a = this._cols[i];
                index = i;
            }
        }
        return index;
    }
});