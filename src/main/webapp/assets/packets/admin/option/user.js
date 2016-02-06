/*!
 * @packet admin.option.user; 
 * @include admin.form;
 * @include admin.group;
 */
Option({
    name: "table",
    find: {
        colnum: 2,
        fields: [
            {type: "@form.text", label: "username", name: "username"}
        ]
    },
    tableadd:{
        action:basePath+"user/adduser",
        fields: [
            {type: "@form.text", label: "username", name: "username"}
        ]
    },
    tableremove:{
        url:basePath+"user/removeusers"
    },
    table: {
        dataurl: basePath+"user/userlist",
        checkbox: true,
        num: true,
        tool: ["search","refresh", "deletemulti", "add"],
        deal: ["delete"],
        rownum: [30, 50, 100, 150],
        cols: [
            {name: "username", key: 'username', ishow: true, width: 200,center:true},
            {name: "role", key: 'role', ishow: true, width: 200,center:true}
        ]
    },
    override: {
        event_table_choutier: function (e) {
            console.log("=====>>");
        }
    }
});