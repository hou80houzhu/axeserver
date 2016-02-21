package com.axes.polling.router.impl;

import com.axes.polling.base.ConnectManager.PollingConnect;
import com.axes.polling.base.message.MessageWrapper;
import com.axes.polling.router.BaseRouter;

public class SomeRouter extends BaseRouter {

    @Override
    public void rout(PollingConnect connect, MessageWrapper wrapper) throws Exception {
        connect.getConnectManager().postSomeMessage(wrapper.getTos(), wrapper.getMessage());
    }

}
