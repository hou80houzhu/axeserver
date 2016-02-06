package com.brooder.polling.service.impl;

import com.brooder.polling.base.PollingRequest;
import com.brooder.polling.base.PollingResponse;
import com.brooder.polling.base.message.PollingMessage;
import com.brooder.polling.router.BaseRouter;
import com.brooder.polling.service.BaseService;
import com.brooder.util.jsonx.Jsonx;
import java.util.HashMap;

public class OneToOneService extends BaseService {

    @Override
    public void excute(PollingRequest request, PollingResponse response) {
        PollingMessage message = new PollingMessage();
        message.setCode("1");
        HashMap<String, String> map = new HashMap<>();
        map.put("form", request.getConnect().getId());
        map.put("msg", request.getParameter("content"));
        message.setContent(Jsonx.create(map).toString());
        message.setCallback("message");
        response.append(BaseRouter.CARRIER_TYPE_CONNECT, request.getParameter("to"), message);
    }

}
