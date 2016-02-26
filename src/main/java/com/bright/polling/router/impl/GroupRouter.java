package com.bright.polling.router.impl;

import com.bright.polling.base.ConnectManager.PollingConnect;
import com.bright.polling.base.message.MessageWrapper;
import com.bright.polling.router.BaseRouter;

public class GroupRouter extends BaseRouter {

    @Override
    public void rout(PollingConnect connect, MessageWrapper wrapper) throws Exception {
        connect.getConnectManager().postGroupMessage(wrapper.getTo(), wrapper.getMessage());
    }
}
