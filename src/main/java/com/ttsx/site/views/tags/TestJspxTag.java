package com.ttsx.site.views.tags;

import com.brooder.mvc.view.page.annotation.JspxTag;
import com.brooder.mvc.view.page.base.JspxTagBase;
import java.util.HashMap;

@JspxTag(name = "testxx")
public class TestJspxTag extends JspxTagBase {

    @Override
    public HashMap<String, Object> doService() {
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("xxxtest", "nnnnn");
        return map;
    }

}
