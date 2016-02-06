/*!
 * @packet admin.option.brand; 
 * @include admin.form;
 * @include admin.group;
 */
Option({
    name: "table",
    find: {
        colnum: 2,
        fields: [
            {type: "@form.text", label: "name", name: "name"}
        ]
    },
    tableadd: {
        action: basePath + "brand/addbrand",
        fields: [
            {type: "@form.imageupload", label: "name", name: "image", url: basePath + "brand/brandimage", filename: "file"},
            {type: "@form.text", label: "name", name: "name"},
            {type: "@form.text", label: "url", name: "url"}
        ]
    },
    tableedit:{
        action: basePath + "brand/editbrand",
        fields: [
            {type: "@form.imageupload", label: "name", name: "image", url: basePath + "brand/brandimage", filename: "file"},
            {type: "@form.text", label: "name", name: "name"},
            {type: "@form.text", label: "url", name: "url"},
            {type: "@form.hidetext", label: "id", name: "id"}
        ]
    },
    tableremove: {
        url: basePath + "brand/removebrands"
    },
    table: {
        dataurl: basePath + "brand/brandlist",
        checkbox: true,
        num: true,
        tool: ["search", "refresh", "deletemulti", "add"],
        deal: ["edit", "delete"],
        rownum: [30, 50, 100, 150],
        cols: [
            {name: "name", key: 'name', ishow: true, width: 200, center: true}
        ]
    },
    override: {
    }
});