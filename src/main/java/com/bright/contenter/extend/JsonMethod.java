package com.bright.contenter.extend;

import com.bright.util.jsonx.Jsonx;
import java.util.List;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;

public class JsonMethod implements TemplateMethodModelEx {

    @Override
    public Object exec(List arg0) throws TemplateModelException {
        Object t = arg0.get(0);
        return Jsonx.create(t).toString();
    }

}
