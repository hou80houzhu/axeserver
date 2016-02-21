package com.axes.polling.service.impl;

import com.axes.polling.base.PollingRequest;
import com.axes.polling.base.PollingResponse;
import com.axes.polling.base.message.PollingMessage;
import com.axes.polling.router.BaseRouter;
import com.axes.polling.service.BaseService;
import com.axes.util.jsonx.Jsonx;
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
