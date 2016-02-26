package com.bright.polling.base.event;

import com.bright.polling.base.ConnectManager.PollingConnect;
import com.bright.polling.base.PollingResponse;
import javax.servlet.http.HttpServletRequest;

public abstract class BaseEventHandler {
    

    public abstract void onConnect(PollingConnect connect, HttpServletRequest request, PollingResponse response);

    public abstract void onClose(PollingConnect connect, PollingResponse response);

}
