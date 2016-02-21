package com.axes.polling.base.event;

import com.axes.polling.base.ConnectManager;
import com.axes.polling.base.PollingResponse;
import javax.servlet.http.HttpServletRequest;

public class SessionGroupEventHandler extends BaseEventHandler {

    @Override
    public void onConnect(ConnectManager.PollingConnect connect, HttpServletRequest request, PollingResponse response) {
        String groupid = request.getSession().getId();
        connect.setGroupId(groupid);
    }

    @Override
    public void onClose(ConnectManager.PollingConnect connect, PollingResponse response) {
    }

}
