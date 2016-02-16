package com.ttsx.site.filter;

import com.packet.mvc.annotation.Filter;
import com.packet.mvc.filter.ActionFilter;
import com.packet.mvc.view.View;

@Filter(name = "aa")
public class TestFilter extends ActionFilter {

    @Override
    public View filter() throws Exception {
        System.out.println(this.request);
        return this.next();
    }
}
