/*!
 * @packet mart.option.nopage; 
 * @include mart.main;
 */
Option({
    name: "page",
    mapping: [
        {name: "@main.statictopbar", option: "@.topbar"},
        {name: "@main.404", option: ""}
    ]
});
Option({
    name: "topbar",
    leftbtns: [
        {action: "back", icon: "fa fa-angle-left"}
    ],
    rightbtns: [],
    title: "404"
});

