package com.ttsx.site.contenter.method;

import com.brooder.contenter.template.annotation.ContenterMethod;
import com.brooder.contenter.template.macro.base.ContentMethodBase;
import freemarker.template.TemplateModelException;
import java.util.List;

@ContenterMethod(name = "test")
public class TestMethod extends ContentMethodBase {

    @Override
    public Object exec(List list) throws TemplateModelException {
        return "call method";
    }
}
