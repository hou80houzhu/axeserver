/*!
 * @packet admin.option.news; 
 * @include admin.form;
 * @include admin.edit;
 * @include admin.group;
 * @include admin.datepicker;
 */
Option({
    name: "table",
    find: {
        fields: [
            {type: "@form.text", label: "title", name: "title"}
        ]
    },
    tableadd: {
        action: basePath + "news/addnews",
        width:1200,
        fields: [
            {type: "@form.imageupload", label: "封面", name: "image", url: basePath + "news/newsimage", filename: "file"},
            {type: "@form.text", label: "标题", name: "title"},
            {type: "@form.text", label: "简述", name: "author","inputType":"textarea"},
            {type: "@datepicker.datepicker", label: "发布时间", name: "ntimeis"},
            {type: "@edit.editor", label: "内容", name: "content", autosize: true}
        ],
        override: {
            layout: "<div style='position:absolute;left:0;top:0;bottom:0;width:300px;border-right:1px solid #D7D7D7;'>" +
                    "<div class='listform-tips' data-find='tips'></div>" +
                    "<div class='listform-container'>" +
                    "<%=module(data.option.fields[0].type,'','t0');%>" +
                    "<%=module(data.option.fields[1].type,'','t1');%>" +
                    "<%=module(data.option.fields[2].type,'','t2');%>" +
                    "<%=module(data.option.fields[3].type,'','t3');%>" +
                    "</div>" +
                    "</div>" +
                    "<div style='position:absolute;left:301px;top:0;right:0;bottom:0;padding:10px;overflow:hidden;'>" +
                    "<div><%=module(data.option.fields[4].type,'','t4');%></div>" +
                    "</div>"
        }
    },
    tableedit: {
        action: basePath + "news/editnews",
        width:1200,
        fields: [
            {type: "@form.imageupload", label: "封面", name: "image", url: basePath + "news/newsimage", filename: "file"},
            {type: "@form.text", label: "标题", name: "title"},
            {type: "@form.text", label: "简述", name: "author","inputType":"textarea"},
            {type: "@datepicker.datepicker", label: "发布时间", name: "ntimeis"},
            {type: "@edit.editor", label: "内容", name: "content", autosize: true},
            {type: "@form.hidetext", label: "id", name: "id"}
        ],
        override: {
            layout: "<div style='position:absolute;left:0;top:0;bottom:0;width:300px;border-right:1px solid #D7D7D7;'>" +
                    "<div class='listform-tips' data-find='tips'></div>" +
                    "<div class='listform-container'>" +
                    "<%=module(data.option.fields[0].type,'','t0');%>" +
                    "<%=module(data.option.fields[1].type,'','t1');%>" +
                    "<%=module(data.option.fields[2].type,'','t2');%>" +
                    "<%=module(data.option.fields[3].type,'','t3');%>" +
                    "<%=module(data.option.fields[5].type,'','t5');%>" +
                    "</div>" +
                    "</div>" +
                    "<div style='position:absolute;left:301px;top:0;right:0;bottom:0;padding:10px;overflow:hidden;'>" +
                    "<div><%=module(data.option.fields[4].type,'','t4');%></div>" +
                    "</div>"
        }
    },
    tableremove: {
        url: basePath + "news/removenewss"
    },
    table: {
        dataurl: basePath + "news/newslist",
        checkbox: true,
        num: true,
        tool: ["search", "refresh", "deletemulti", "add"],
        deal: ["edit", "delete"],
        rownum: [30, 50, 100, 150],
        cols: [
            {name: "title", key: 'title', ishow: true, width: 500, center: true}
        ]
    },
    override: {
    }
});