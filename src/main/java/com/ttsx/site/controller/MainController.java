package com.ttsx.site.controller;

import com.packet.Result;
import com.packet.contenter.ContenterAdapter;
import com.packet.mvc.annotation.Action;
import com.packet.mvc.annotation.Controller;
import com.packet.mvc.annotation.ControllerService;
import com.packet.mvc.annotation.Filters;
import com.packet.mvc.controller.BaseController;
import com.packet.mvc.mapping.BaseMapping;
import com.packet.mvc.view.View;
import com.packet.util.file.Jile;
import com.packet.util.file.JileEach;
import com.ttsx.site.models.User;
import com.ttsx.site.service.NewsService;
import com.ttsx.site.service.UserService;
import java.io.File;
import java.util.HashMap;

@Controller
public class MainController extends BaseController {

    private String username;
    private String password;
    @ControllerService(name = "user")
    private UserService service;
    private File file;

    private int page;
    private int pageSize;

    @ControllerService(name = "news")
    private NewsService newsservice;

    @Action(path = "/")
    public View indext() throws Exception {
        ContenterAdapter.renderPage("index", request, response);
        return null;
    }
    
    @Action(path = "/font")
    public View font() throws Exception {
        return this.getJspxView("font");
    }
    
    @Action(path = "/question")
    public View question() throws Exception {
        return this.getJspxView("question");
    }

    @Action(path = "/pages/{pn}")
    public View pn(HashMap<String, String> np) throws Exception {
        ContenterAdapter.renderPage(np.get("pn"), request, response);
        return null;
    }

    @Action(path = "/admin")
    public View admin() throws Exception {
        return this.getJspxView("admin");
    }

    @Action(path = "/login")
    public View login() throws Exception {
        User user = service.login(username, password);
        if (null != user) {
            this.request.getSession().setAttribute("user", user);
            return Result.success();
        } else {
            return Result.error("username or passowod error");
        }
    }

    @Action(path = "/session")
    public View session() throws Exception {
        if (null != this.request.getSession().getAttribute("user")) {
            return Result.success();
        } else {
            return Result.error("need login");
        }
    }

    @Action(path = "/editor/upload")
    public View upload() throws Exception {
        String filename = System.currentTimeMillis() + ".png";
        String t = File.separator + "upload" + File.separator + "editor" + File.separator + filename;
        Jile.with(file).move(this.basePath() + t);
        return Result.success(BaseMapping.mapping.get("projectHost").toString() + "upload/editor/" + filename);
    }

    @Action(path = "/index")
    public View index() throws Exception {
        return this.getJspxView("mart");
    }

    @Action(path = "/marteditor")
    public View marteditor() throws Exception {
        return this.getJspxView("marteditor");
    }

    @Action(path = "/path")
    public View marte() throws Exception {
        Jile.with("I:\\brooder\\brooder\\packets").browse(new JileEach() {
            @Override
            public boolean each(Jile file) throws Exception {
                System.out.println(file.file().getAbsolutePath().substring(19).replaceAll("\\\\", "/"));
                return false;
            }
        });
        return Result.success();
    }

    @Action(path = "/news")
    public View news() throws Exception {
        return Result.success(newsservice.findNewsPage("select * from news", page, pageSize, null));
    }
}
