package com.ttsx.site.controller;

import com.packet.Result;
import com.packet.contenter.ContenterAdapter;
import com.packet.mvc.annotation.Action;
import com.packet.mvc.annotation.Controller;
import com.packet.mvc.controller.BaseController;
import com.packet.mvc.view.View;

@Controller(basePath = "/test")
public class TestController extends BaseController {

    private String url;

    @Action(path = "/test")
    public View test() throws Exception {
        return Result.success("HELLO WORLD");
    }

    @Action(path = "/test2")
    public View test2() throws Exception {
        this.request.setAttribute("ccc", "xxxxxxxxxxxxxxxxxxx");
        return this.getJspxView("test/test");
    }

    @Action(path = "/page")
    public View page() throws Exception {
        ContenterAdapter.renderPage("pageone", request, response);
        return null;
    }

    @Action(path = "/module")
    public View module() throws Exception {
        ContenterAdapter.renderModule("moduleone", request, response);
        return null;
    }

    @Action(path = "/refresh")
    public View refresh() throws Exception {
        ContenterAdapter.refreshContenter();
        return Result.success();
    }
    
    @Action(path = "/ok")
    public View ok() throws Exception{
        return Result.success();
    }

}
