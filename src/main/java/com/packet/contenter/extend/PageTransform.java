package com.packet.contenter.extend;

import com.packet.contenter.Contenter;
import com.packet.contenter.data.ContentPage;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;
import java.util.List;

public class PageTransform implements TemplateMethodModelEx {

    @Override
    public Object exec(List list) throws TemplateModelException {
        Object t = list.get(0);
        ContentPage page = Contenter.getContenter().getContentPageContainer().getContentPage(t.toString());
        return page.getPageurl() == null ? "" : page.getPageurl();
    }

}
