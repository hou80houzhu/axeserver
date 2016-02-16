package com.packet.polling.service;

import com.packet.polling.base.PollingRequest;
import com.packet.polling.base.PollingResponse;
import javax.servlet.http.HttpServletRequest;

public abstract class BaseService {

    protected HttpServletRequest request;

    public abstract void excute(PollingRequest request, PollingResponse response);
}
