package com.ttsx.site.filter;

import com.brooder.mvc.annotation.Filter;
import com.brooder.mvc.filter.ActionFilter;
import com.brooder.mvc.view.View;

@Filter(name = "aa")
public class TestFilter extends ActionFilter {

    @Override
    public View filter() throws Exception {
        System.out.println(this.request);
        return this.next();
    }
}
