package com.brooder.polling.router.impl;

import com.brooder.polling.base.ConnectManager.PollingConnect;
import com.brooder.polling.base.message.MessageWrapper;
import com.brooder.polling.router.BaseRouter;

public class FilterRouter extends BaseRouter {

    @Override
    public void rout(PollingConnect connect, MessageWrapper wrapper) throws Exception {
        connect.getConnectManager().postFilterMessage(wrapper.getFilter(), wrapper.getMessage());
    }

}
