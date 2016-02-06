package com.ttsx.site.filter;

import com.brooder.Result;
import com.brooder.mvc.annotation.Filter;
import com.brooder.mvc.filter.ActionFilter;
import com.brooder.mvc.view.JspxView;
import com.brooder.mvc.view.View;

@Filter(name = "session")
public class SessionFilter extends ActionFilter {

    @Override
    public View filter() throws Exception {
        Object user = this.request.getSession().getAttribute("user");
        if (null != user) {
            return this.next();
        } else {
            if(this.isAjaxRequest()){
                return Result.error("session out");
            }else{
                return new JspxView("admin");
            }
        }
    }

}
