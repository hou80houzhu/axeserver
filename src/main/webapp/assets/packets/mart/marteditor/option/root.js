/*!
 * @packet mart.marteditor.option.root; 
 * @require mart.marteditor.main;
 */
Option({
    name:"root",
    override:{
        onendinit:function(){
            this.addChild({
                type:"@main.main"
            });
        }
    }
});

