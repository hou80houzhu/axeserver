package com.bright.polling.service.impl;

import com.bright.polling.base.PollingRequest;
import com.bright.polling.base.PollingResponse;
import com.bright.polling.base.message.PollingMessage;
import com.bright.polling.router.BaseRouter;
import com.bright.polling.service.BaseService;
import com.bright.util.jsonx.Jsonx;
import java.util.HashMap;

public class GroupToGroupService extends BaseService {

    @Override
    public void excute(PollingRequest request, PollingResponse response) {
        PollingMessage message = new PollingMessage();
        message.setCode("1");
        HashMap<String, String> map = new HashMap<>();
        map.put("form", request.getConnect().getGroupId());
        map.put("msg", request.getParameter("content"));
        message.setContent(Jsonx.create(map).toString());
        message.setCallback("message");
        response.append(BaseRouter.CARRIER_TYPE_GROUP, request.getParameter("to"), message);
    }

}
