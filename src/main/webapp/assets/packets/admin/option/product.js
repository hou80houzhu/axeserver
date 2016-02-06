/*!
 * @packet admin.option.product; 
 * @include admin.form;
 * @include admin.group;
 */
Option({
    name: "table",
    find: {
        colnum: 2,
        fields: [
            {type: "@form.text", label: "title", name: "title"}
        ]
    },
    tableadd: {
        action: basePath + "product/addproduct",
        fields: [
            {type: "@form.imageupload", label: "name", name: "image", url: basePath + "product/productimage", filename: "file"},
            {type: "@form.text", label: "title", name: "title"},
            {type: "@form.text", label: "desc", name: "desc"},
            {type: "@form.text", label: "pagename", name: "pagename"}
        ]
    },
    tableedit: {
        action: basePath + "product/editproduct",
        fields: [
            {type: "@form.imageupload", label: "name", name: "image", url: basePath + "product/productimage", filename: "file"},
            {type: "@form.text", label: "title", name: "title"},
            {type: "@form.text", label: "desc", name: "desc"},
            {type: "@form.text", label: "pagename", name: "pagename"},
            {type: "@form.hidetext", label: "id", name: "id"}
        ]
    },
    tableremove: {
        url: basePath + "product/removeproducts"
    },
    table: {
        dataurl: basePath + "product/productlist",
        checkbox: true,
        num: true,
        tool: ["search", "refresh", "deletemulti", "add"],
        deal: ["edit", "delete"],
        rownum: [30, 50, 100, 150],
        cols: [
            {name: "title", key: 'title', ishow: true, width: 300, center: true},
            {name: "pagename", key: 'pagename', ishow: true, width: 200, center: true}
        ]
    },
    override: {
    }
});