package com.brooder.polling.router.impl;

import com.brooder.polling.base.ConnectManager.PollingConnect;
import com.brooder.polling.base.message.MessageWrapper;
import com.brooder.polling.router.BaseRouter;

public class WithoutGroupRouter extends BaseRouter {

    @Override
    public void rout(PollingConnect connect, MessageWrapper wrapper) throws Exception {
        connect.getConnectManager().broadCastWithOutGroupId(wrapper.getTo(), wrapper.getMessage());
    }

}
