package com.ttsx.site.contenter.provider;

import com.packet.contenter.template.annotation.ContenterProvider;
import com.packet.mvc.annotation.ControllerService;
import com.ttsx.site.contenter.BrooderProvider;
import com.ttsx.site.service.UserService;
import java.util.HashMap;

@ContenterProvider(name = "testProvider")
public class TestProvider extends BrooderProvider {

    @ControllerService(name = "user")
    private UserService service;

    
    public HashMap<String, Object> getData() throws Exception {
        HashMap<String, Object> map = new HashMap<>();
        map.put("aa", "aa");
        map.put("bb", "bb");
        map.put("cc", service.getUserPage("select * from user", 0, 10, null));
        return map;
    }
}
