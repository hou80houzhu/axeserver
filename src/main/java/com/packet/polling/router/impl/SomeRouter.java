package com.packet.polling.router.impl;

import com.packet.polling.base.ConnectManager.PollingConnect;
import com.packet.polling.base.message.MessageWrapper;
import com.packet.polling.router.BaseRouter;

public class SomeRouter extends BaseRouter {

    @Override
    public void rout(PollingConnect connect, MessageWrapper wrapper) throws Exception {
        connect.getConnectManager().postSomeMessage(wrapper.getTos(), wrapper.getMessage());
    }

}
