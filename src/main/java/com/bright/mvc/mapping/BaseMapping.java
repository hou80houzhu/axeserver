package com.bright.mvc.mapping;

import com.bright.boot.IBootService;
import com.bright.mvc.data.jdbc.pool.DBBoot;
import com.bright.mvc.view.page.Jspx;
import com.bright.util.jsonx.Jsonx;

public class BaseMapping implements IBootService {

    public static Jsonx mapping;

    @Override
    public void serviceStart(Jsonx option) {
        mapping = option;
        String controllerPath = option.get("controller").toString();
        ControllerContainer.getContainer().start(controllerPath);
        FilterContainer.getContainer().start(option.get("filter").toString());
        Jspx.init(option.get("view"));
        ServiceContainer.getContainer().start(option.get("service").toString());
        ModelContainer.getContainer().start(option.get("model").toString());
        DaoContainer.getCotnainer().start(option.get("dao").toString());
        new DBBoot(option.get("jdbc"));
    }

    @Override
    public void serviceStop() {
    }
}
