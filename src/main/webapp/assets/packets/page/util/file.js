/*!
 * @packet page.util.file;
 */
var file = function (file) {
    this.file = file;
    this.request = null;
};
file.prototype.getFile = function () {
    return this.file;
};
file.prototype.fileName = function () {
    return this.file ? this.file.name : "";
};
file.prototype.fileSize = function () {
    return this.file.size || -1;
};
file.prototype.fileType = function () {
    return this.file ? this.file.type : "";
};
file.prototype.clean = function () {
    for (var i in this) {
        this[i] = null;
    }
    return this;
};
file.prototype.getURI = function (fn) {
    var ths = this;
    var reader = new FileReader();
    reader.onload = function (e) {
        if (fn) {
            fn.call(ths, e.target.result);
        }
    };
    reader.readAsDataURL(this.file);
};
file.prototype.getImage = function (fn) {
    var ths = this;
    if (this.file.type.indexOf("image") !== -1) {
        this.getURI(function (a) {
            $.loader().image(a, function () {
                fn && fn.call(ths, this);
            });
        });
    }
};
file.prototype.getBlob = function (fn) {
    var ths = this;
    this.getURI(function (dataURL) {
        var a = getBlobFromURI(dataURL);
        fn && fn.call(ths, a);
    });
};
file.prototype.saveAs = function (filename) {
    this.getBlob(function (blob) {
        saveAs(blob, filename);
    });
};
file.prototype.upload = function (option) {
    var ths = this;
    var formdata = new FormData();
    formdata.append(option.name, this.file);
    formdata.append("filename", this.file.name);
    formdata.append("filesize", this.file.size);
    formdata.append("filetype", this.file.type);
    for (var _p in option.data) {
        formdata.append(_p, option.data[_p]);
    }
    option.start&&option.start.call(this);
    $.ajax({
        url: option.url || null,
        data: formdata,
        method: "post",
        dataType: "json",
        asysn: option.asysn,
        out: option.out,
        headers: {},
        events: {
            progress: function (e) {
                option.progress && option.progress.call(ths, {
                    total: e.total,
                    loaded: e.loaded,
                    percent: Math.round(e.loaded * 100 / e.total)
                });
            },
            load: function () {
                console.log("====================99999");
                var status = this.response.status;
                if ((status >= 200 && status < 300) || status === 304) {
                    var result = this.response.response;
                    if (this.realType === "json") {
                        var txt = this.response.responseText;
                        try {
                            result = window.JSON.parse(txt);
                        } catch (e) {
                            throw Error("[brooder] ajax unvaliable json string,url is '" + option.url + "'");
                        }
                    }
                    option.success && option.success.call(ths, result);
                } else {
                    option.error && option.error.call(ths, e);
                }
            }
        },
        error: option.error
    });
};

var getBlobFromURI = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];
        return new Blob([raw], {type: contentType});
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var byteString = atob(parts[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: contentType});
};
var saveAs = function (blob, filename) {
    var type = blob.type;
    var force_saveable_type = 'application/octet-stream';
    if (type && type !== force_saveable_type) {
        var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, 0, blob.size, force_saveable_type);
    }
    var url = URL.createObjectURL(blob);
    $().create("a").attr("href", url).attr("download", filename).trigger("click");
};

module.exports = {
    set: function (xfile) {
        return new file(xfile);
    },
    getBlobFromURI: function (uri) {
        return getBlobFromURI(uri);
    },
    saveAs: function (blob, filename) {
        saveAs(blob, filename);
    }
};