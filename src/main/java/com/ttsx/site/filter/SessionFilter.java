package com.ttsx.site.filter;

import com.packet.Result;
import com.packet.mvc.annotation.Filter;
import com.packet.mvc.filter.ActionFilter;
import com.packet.mvc.view.JspxView;
import com.packet.mvc.view.View;

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
