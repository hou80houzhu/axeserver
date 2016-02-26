package com.bright.polling.base;

import com.bright.polling.base.ConnectManager.PollingConnect;
import com.bright.util.jsonx.Jsonx;

public class PollingRequest {

    private final Jsonx content;
    private final PollingConnect connect;

    public PollingRequest(String serviceType, String content, PollingConnect connect) throws Exception {
        this.connect = connect;
        this.content = Jsonx.create(content);
    }

    public String getParameter(String key) {
        return this.content.get(key).toString();
    }

    public PollingSession getSession() {
        return this.connect.getSession();
    }

    public PollingConnect getConnect() {
        return this.connect;
    }
}
