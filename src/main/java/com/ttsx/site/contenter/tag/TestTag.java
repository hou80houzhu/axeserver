package com.ttsx.site.contenter.tag;

import com.brooder.contenter.template.annotation.ContenterTag;
import com.brooder.contenter.template.macro.base.ContentMacroTagBase;
import java.util.HashMap;

@ContenterTag(name = "testTag")
public class TestTag extends ContentMacroTagBase {

    @Override
    public HashMap<String, Object> doService() {
        HashMap<String,Object> map=new HashMap<String,Object>();
        map.put("aaa", "aaa");
        map.put("bbb", "bbb");
        map.put("ccc", "ccc");
        return map;
    }
}
