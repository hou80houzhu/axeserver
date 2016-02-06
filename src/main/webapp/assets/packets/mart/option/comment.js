/*!
 * @packet mart.option.comment; 
 * @include mart.main;
 * @include mart.option.page1;
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.commentprogress", option: ""},
        {name: "@main.singlestatebar", option: ""},
        {name: "@main.datalist-comment", option: "@.commentlist"}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "商品评价"
});
Option({
    name:"commentlist",
    url: "mart/commentlist.json"
});