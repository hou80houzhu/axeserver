package com.axes.contenter.page;

import com.axes.contenter.data.ContentPage;
import com.axes.util.base.reflect.ObjectSnooper;
import com.axes.util.file.Jile;
import com.axes.util.file.JileEach;
import com.axes.util.jsonx.Jsonx;
import java.io.File;
import java.util.HashMap;
import java.util.List;

public class FileContentPageProvider extends BaseContentPageProvider {

    @Override
    public HashMap<String, ContentPage> getAllContentPages() {
        File xmt = new File(this.getClass().getClassLoader().getResource("/").getPath());
        String pageTemplatePath = xmt.getParentFile().getAbsolutePath() + File.separator + "contenter" + File.separator + "_objectpage_";
        HashMap<String, ContentPage> map = new HashMap<String, ContentPage>();
        try {
            Jile.with(pageTemplatePath).each(new JileEach(map) {
                @Override
                public boolean each(Jile file) throws Exception {
                    HashMap<String, ContentPage> map = (HashMap<String, ContentPage>) this.arguments[0];
                    Jsonx json = Jsonx.create(file.file());
                    String name = json.get("id").toString();
                    ContentPage page = new ContentPage();
                    ObjectSnooper.snoop(page).sett(json.toHashMap());
                    map.put(name, page);
                    return false;
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }

    @Override
    public void saveContentPageList(List<ContentPage> pageList) {
        for (ContentPage page : pageList) {
            this.saveContentPage(page);
        }
    }

    @Override
    public void saveContentPage(ContentPage page) {
        File xmt = new File(this.getClass().getClassLoader().getResource("/").getPath());
        String pageTemplatePath = xmt.getParentFile().getAbsolutePath() + File.separator + "contenter" + File.separator + "_objectpage_";
        String id = page.getId();
        try {
            Jsonx.create(page).toFile(pageTemplatePath + File.separator + id + ".json");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void removeContentPage(ContentPage page) {
        File xmt = new File(this.getClass().getClassLoader().getResource("/").getPath());
        String pageTemplatePath = xmt.getParentFile().getAbsolutePath() + File.separator + "contenter" + File.separator + "_objectpage_";
        String id = page.getId();
        Jile.with(pageTemplatePath + File.separator + id + ".json").remove();
    }

    @Override
    public void removeContentPageList(List<ContentPage> pageList) {
        for (ContentPage page : pageList) {
            this.removeContentPage(page);
        }
    }

    @Override
    public void editContentPage(ContentPage page) {
        this.saveContentPage(page);
    }

    @Override
    public void removeAllContentPage() {
    }

}
