/*!
 * @packet page.base; 
 * @css page.css.font-awesome-min;
 */
Module({
    name: "basepagemodule",
    extend: 'viewgroup',
    isedit: function () {
        return window.ISEDIT ? true : false;
    },
    update: function () {
        var ths = this;
        this.postData({
            url: basePath + "contenter/moduleinfo",
            data: {moduleId: this.getId(), moduleType: this.dom.attr("module"), values: window.JSON.stringify(this.__values__)},
            back: function (data) {
                ths.dom.html(data.templateString);
                ths.rerender();
            }
        });
    }
});
Module({
    name: "navigator",
    extend: "@.basepagemodule",
    init: function () {
        if (this.isedit()) {
            this.nofix();
        } else {
            var ths = this;
            $(window).bind("scroll", function () {
                var top = $("body").scrollTop();
                if (top > 100) {
                    ths.dom.children(0).addClass("bg").addClass("fixed");
                } else {
                    ths.dom.children(0).removeClass("bg").removeClass("fixed");
                }
                ths.dom.children(0).removeClass("open");
            });
        }
        var ths = this;
        this.dom.find(".navigator-container-menu").click(function () {
            console.log("===========>>>>");
            ths.dom.children(0).toggleClass("open");
        });
    },
    nofix: function () {
        this.dom.children(0).addClass("bg").css({
            "position": "static",
            "z-index": -2000000
        });
    }
});
Module({
    name: "pictab",
    className: "pictab",
    extend: "@.basepagemodule",
    init: function () {
        this.current = 0;
        this.gotoPage(0);
        this.auto();
    },
    find_imgs: function (dom) {
        this.total = dom.children(0).children().length;
        this.imgs = dom;
    },
    find_dots: function (dom) {
        var ths = this;
        dom.children().each(function () {
            $(this).click(function () {
                ths.gotoPage($(this).index());
            });
        });
        this.dots = dom;
    },
    gotoPage: function (index) {
        if (index >= 0 && index < this.total) {
            this.imgs.scrollingLeft(index * $(window).width());
            this.dots.children().each(function (a) {
                if (a === index) {
                    $(this).addClass("active");
                } else {
                    $(this).removeClass("active");
                }
            });
            this.current = index;
        }
    },
    auto: function () {
        var ths = this;
        this.interval=setInterval(function () {
            var a = ths.current + 1;
            if (a === ths.total) {
                a = 0;
            }
            ths.gotoPage(a);
        }, 5000);
    }
});
Module({
    name: "map",
    extend: "view",
    className: "map",
    init: function () {
        var ths = this;
        var dom = this.dom;
        $.loader().js(basePath + "assets/packets/page/lib/bdmap.js", function () {
            var map = new BMap.Map(dom.get(0));
            var point = new BMap.Point(116.219829, 39.913894);
            map.centerAndZoom(point, 18);
            map.disableScrollWheelZoom();
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.MapTypeControl());
            var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                offset: new BMap.Size(10, 25), // 指定定位位置  
                imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移  
            });
            map.setMaxZoom(18);
            map.addEventListener("dragend", function () {
                map.enableScrollWheelZoom();
            });
            map.addEventListener("mouseout", function () {
                map.disableScrollWheelZoom();
            });
            var marker = new BMap.Marker(point, {icon: myIcon});
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
            marker.addEventListener("click", function () {
                map.centerAndZoom(point, 18);
                var opts = {
                    width: 250, // 信息窗口宽度    
                    height: 130, // 信息窗口高度    
                    title: ""  // 信息窗口标题   
                };
                var infoWindow = new BMap.InfoWindow("<div id='fuckbaidumap'>" +
                        "<div style='border-bottom:1px solid #D7D7D7;text-align:center;'>" +
                        "<img src='" + basePath + "assets/packets/page/css/images/logo3.png'>" +
                        "</div>" +
                        "<div>" +
                        "<div style='line-height:20px;font-size:12px;'>联系电话：010-62332347</div>" +
                        "<div style='line-height:20px;font-size:12px;'>联系电话：010-68888804</div>" +
                        "</div>" +
//                        "<div style='padding:5px 0 5px 0;'>" +
//                        "<div style='line-height:30px;text-align:center;background:#1DA362;color:white;font-size:12px;'>发送邮件</div>" +
//                        "</div>" +
                        "</div>", opts);
                map.openInfoWindow(infoWindow, map.getCenter());
                setTimeout(function () {
                    $("#fuckbaidumap").click(function () {
                        map.closeInfoWindow();
                        ths.dispatchEvent("popupclick");
                    });
                }, 0);
            });
            var polyline = new BMap.Polyline([
                new BMap.Point(116.219052, 39.91333),
                new BMap.Point(116.219047, 39.913693),
                new BMap.Point(116.219689, 39.913711),
                new BMap.Point(116.219694, 39.913845)
            ], {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5});
            map.addOverlay(polyline);
            map.setMapStyle({style: 'grayscale'});
            ths.map = map;
        });
    },
    event_mapcenter: function () {
        this.map.centerAndZoom(new BMap.Point(116.219829, 39.913894), 18);
    },
    event_popupclick: function (e) {
        var ths = this;
        var str = "<div class='map-contact'>" +
                "<div class='map-contact-mask'></div>" +
                "<div class='map-contact-box'>" +
                "<div class='map-contact-box-title'>" +
                "<div class='map-contact-box-title-a'>发送邮件</div>" +
                "<div class='map-contact-box-title-b'><i class='fa fa-times'></i></div>" +
                "</div>" +
                "<div class='map-contact-box-content'>" +
                "<div class='map-contact-box-content-c'>姓名</div>" +
                "<div class='map-contact-box-content-d'><input type='text'></div>" +
                "<div class='map-contact-box-content-c'>邮箱</div>" +
                "<div class='map-contact-box-content-d'><input type='text'></div>" +
                "<div class='map-contact-box-content-c'>留言</div>" +
                "<div class='map-contact-box-content-d'><textarea></textarea></div>" +
                "<div class='map-contact-box-content-e'>发送</div>" +
                "</div>" +
                "</div>" +
                "</div>";
        $(str).appendTo(this.dom).find(".map-contact-box-title-b").click(function () {
            ths.dispatchEvent("mapcenter");
            $(this).parent(3).remove();
        });
    }
});
Module({
    name: "newslist",
    extend: "view",
    option: {
        size: 10
    },
    init: function () {
        var ths = this;
        this.current = 0;
        this.isloading = false;
        if (this.dom.children(0).children(0).children().length >= 12) {
            this.dom.find(".nptt-loading-bar").html("点击继续加载").click(function () {
                ths.getData();
            });
        } else {
            this.dom.find(".nptt-loading-bar").hide();
        }
    },
    getData: function () {
        if (!this.isloading) {
            this.isloading = true;
            this.dom.find(".nptt-loading-bar").html("<i class='fa fa-refresh fa-spin'></i> Loading...");
            this.current += 1;
            this.postData({
                url: basePath + "news",
                data: {
                    page: this.current * this.option.size,
                    pageSize: this.option.size
                },
                back: function (e) {
                    var t = e.rows;
                    this.isloading = false;
                    if (t.length > 0) {
                        for (var i in t) {
                            var str = "<div class='span1-3'><div class='nptt-inner'><div class='nptt-img'><img src='" + t[i].image + "' alt=''></div><div class='nptt-title'>" + t[i].title + "</div><div class='nptt-time'>" + t[i].time + "</div><div class='nptt-desc'>" + t[i].author + "</div><div class='nptt-link'><a href='http://localhost:8084/ttsxhome/pages/newsdetail?newsid=" + t[i].id + "'>查看详情</a></div></div></div>";
                            $(str).appendTo(this.dom.children(0).children(0));
                        }
                        if (t.length < this.option.size) {
                            this.dom.find(".nptt-loading-bar").hide();
                        } else {
                            this.dom.find(".nptt-loading-bar").html("点击继续加载")
                        }
                    } else {
                        this.dom.find(".nptt-loading-bar").hide();
                    }
                }
            });
        }
    }
});