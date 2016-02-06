(function ($) {
    $.fn.gallery = function (option) {
        var ops = {
            rotateOffset: 5,
            zoomOffset: 100
        };
        return new gallery(this, $.extend(ops, option));
    };
    var gallery = function (dom, option) {
        this.dom = dom;
        this.option = option;
        this.imagesList = [];
        this.currentIndex = 0;
        this.loading = $("<div class='loadingcon'><div class='loading'><i class='fa fa-refresh fa-spin'></i></div></div>").appendTo(this.dom);
        var width = this.dom.width(), height = this.dom.height();
        var scene = this.dom.scene({
            background: {
                color: "rgba(0,0,0,0.8)",
                imageType: "repeat"
            },
            mousedown: function (e) {
                e = e.getSpriteLocal(pic);
                if (pic.checkPointIn(e.x, e.y)) {
                    this.ops.ismove = true;
                    this.ops.ox = e.x - pic.x();
                    this.ops.oy = e.y - pic.y();
                }
            },
            mouseup: function () {
                this.ops.ismove = false;
            },
            mousemove: function (e) {
                e = e.getSpriteLocal(pic);
                if (this.ops.ismove === true) {
                    var _x = e.x - this.ops.ox;
                    var _y = e.y - this.ops.oy;
                    pic.x(_x);
                    pic.y(_y);
                    scene.draw();
                }
            }
        });
        this.maxwidth = width * 4;
        this.maxheight = height * 4;
        var picon = $.sprite({
            name: "picon",
            x: -width * 3 / 2,
            y: -height * 3 / 2,
            width: this.maxwidth,
            height: this.maxheight,
            background: {
                color: "rgba(0,0,0,0)"
            }
        }).rotatePoint(width / 2, height / 2);
        var pic = $.sprite({
            name: "pic",
            x: 0,
            y: 0,
            width: width,
            height: height,
            background: {
                color: "rgba(0,0,0,0.6)"
            }
        });
        picon.appendChild(pic);
        scene.appendChild(picon).draw();
        this.picon = picon;
        this.scene = scene;
        this.pic = pic;
        var ths = this;
        var a = $("<div class='tools'>" +
                "<div class='btn-group'>" +
                "<div class='btn nextpic disabled'><i class='fa fa-chevron-left'></i></div>" +
                "<div class='btn rotateleft disabled'><i class='fa fa-repeat'></i></div>" +
                "<div class='btn rotateright disabled'><i class='fa fa-undo'></i></div>" +
                "<div class='btn zoomin disabled'><i class='fa fa-search-plus'></i></div>" +
                "<div class='btn zoomout disabled'><i class='fa fa-search-minus'></i></div>" +
                "<div class='btn rest disabled'><i class='fa fa-refresh'></i></div>" +
                "<div class='btn prevpic disabled'><i class='fa fa-chevron-right'></i></div>" +
                "</div>" +
                "</div>").appendTo(this.dom);
        this.dom.bind("mousewheel", function (e) {
            if (e.deltaY > 0) {
                ths.zoom(ths.option.zoomOffset);
            } else {
                ths.zoom(-ths.option.zoomOffset);
            }
        });
        a.find(".nextpic").click(function () {
            if (!$(this).hasClass("disabled"))
                ths.prevImage();
        });
        a.find(".rotateleft").click(function () {
            if (!$(this).hasClass("disabled"))
                ths.rotate(ths.option.rotateOffset);
        });
        a.find(".rotateright").click(function () {
            if (!$(this).hasClass("disabled"))
                ths.rotate(-ths.option.rotateOffset);
        });
        a.find(".zoomin").click(function () {
            if (!$(this).hasClass("disabled"))
                ths.zoom(ths.option.zoomOffset);
        });
        a.find(".zoomout").click(function () {
            if (!$(this).hasClass("disabled"))
                ths.zoom(-ths.option.zoomOffset);
        });
        a.find(".rest").click(function () {
            if (!$(this).hasClass("disabled"))
                ths.reset();
        });
        a.find(".prevpic").click(function () {
            if (!$(this).hasClass("disabled"))
                ths.nextImage();
        });
        var b = $("<div class='thumblist'>" +
                "<div class='movetop'><i class='fa fa-angle-up'></i></div>" +
                "<div class='con'>" +
                "<div class='thumb'><img/></div>" +
                "</div>" +
                "<div class='movebottom'><i class='fa fa-angle-down'></i></div>" +
                "<div class='switchbtn'><i class='fa fa-angle-left'></i></div>" +
                "</div>").appendTo(this.dom);
        b.find(".switchbtn").click(function () {
            ths.dom.toggleClass("show");
        });
        b.find(".movebottom").click(function () {
            var c = $(this).parent().find(".con");
            c.animate({
                scrollTop: c.scrollTop() + 150
            });
        });
        b.find(".movetop").click(function () {
            var c = $(this).parent().find(".con");
            c.animate({
                scrollTop: c.scrollTop() - 150
            });
        });
    };
    gallery.prototype.setImages = function (images) {
        if (images && images.length > 0) {
            this.dom.find(".tools .btn").each(function () {
                $(this).removeClass("disabled");
            });
            var ths = this;
            this.imagesList = images;
            var a = "", i = 0;
            for (var i in images) {
                a += "<div class='thumb' num='" + i + "' style='background-image:url(" + images[i].thumb + ");'></div>";
                i++;
            }
            this.dom.find(".thumblist .con").html(a);
            this.dom.find(".thumblist .thumb").each(function () {
                $(this).click(function () {
                    var num = parseInt($(this).attr("num"));
                    ths.gotoImage(num);
                });
            });
            if (images.length > 1) {
                this.dom.addClass("show");
            } else {
                this.dom.removeClass("show");
            }
            this.gotoImage(0);
        }
    };
    gallery.prototype.gotoImage = function (num) {
        if (num >= 0 && num < this.imagesList.length) {
            this.currentIndex = num;
            this.setImage(this.imagesList[num].big);
        }
    };
    gallery.prototype.nextImage = function () {
        var num = this.currentIndex + 1;
        if (num < this.imagesList.length) {
            this.currentIndex = num;
            this.setImage(this.imagesList[num].big);
        }
    };
    gallery.prototype.prevImage = function () {
        var num = this.currentIndex - 1;
        if (num >= 0) {
            this.currentIndex = num;
            this.setImage(this.imagesList[this.currentIndex].big);
        }
    };
    gallery.prototype.reset = function () {
        this.scene.width(this.dom.width()).height(this.dom.height());
        this.picon.x(-this.dom.width() * 3 / 2).y(-this.dom.height() * 3 / 2).width(this.dom.width() * 4).height(this.dom.height() * 4).rotate(0);
        var _w = 0, _h = 0, ow = this.pic.originalwidth, oh = this.pic.originalheight;
        if (ow > this.dom.width() || oh > this.dom.height()) {
            if (_w < this.dom.width()) {
                _w = this.dom.width();
                _h = (oh / ow) * _w;
                if (_h > this.dom.height()) {
                    _h = this.dom.height();
                    _w = (ow / oh) * _h;
                }
            } else if (_h < this.dom.height()) {
                _h = this.dom.height();
                _w = (ow / oh) * _h;
                if (_w > this.dom.width()) {
                    _w = (ow / oh) * _h;
                }
            }
        } else {
            _w = ow;
            _h = oh;
        }
        this.pic.width(_w).height(_h).x((this.picon.width() - _w) / 2).y((this.picon.height() - _h) / 2);
        this.scene.draw();
    };
    gallery.prototype.setImage = function (url) {
        this.loading.show();
        var ths = this, pic = this.pic, scene = this.scene, picon = this.picon;
        $.source().image({
            path: url,
            success: function () {
                ths.loading.hide();
                var image = this, _w = image.width, _h = image.height, _x = 0, _y = 0, image = this;
                pic.originalwidth = image.width;
                pic.originalheight = image.height;
                if (_w > scene.width() || _h > scene.height()) {
                    if (_w > scene.width()) {
                        _w = scene.width();
                        _h = (image.height / image.width) * _w;
                        if (_h > scene.height()) {
                            _h = scene.height();
                            _w = (image.width / image.height) * _h;
                        }
                    } else if (_h > scene.height()) {
                        _h = scene.height();
                        _w = (image.width / image.height) * _h;
                        if (_w > scene.width()) {
                            _w = (image.width / image.height) * _h;
                        }
                    }
                }
                pic.width(_w);
                pic.height(_h);
                pic.x((picon.width() - pic.width()) / 2);
                pic.y((picon.height() - pic.height()) / 2);
                ths.picon.rotate(0);
                pic.backgroundImage(this);
                scene.draw();
            },
            error: function () {
                ths.dom.find(".loadingcon").children(0).html("加载图片失败");
            }
        });
    };
    gallery.prototype.rotate = function (num) {
        var picon = this.picon, scene = this.scene;
        picon.rotate(picon.rotate() + num);
        scene.draw();
    };
    gallery.prototype.zoom = function (num) {
        var ow = this.pic.width();
        var oh = this.pic.height();
        var ox = this.pic.x();
        var oy = this.pic.y();
        var a = this.pic.width() + num;
        var b = this.pic.originalheight / this.pic.originalwidth * a;
        if (a >= 10 && b >= 10) {
            this.pic.width(a);
            this.pic.height(b);
            this.pic.x(ox - ((a - ow) / 2));
            this.pic.y(oy - ((b - oh) / 2));
            this.scene.draw();
        }
    };
})(brooder);