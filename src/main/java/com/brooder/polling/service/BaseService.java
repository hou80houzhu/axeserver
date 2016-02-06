package com.brooder.polling.service;

import com.brooder.polling.base.PollingRequest;
import com.brooder.polling.base.PollingResponse;
import javax.servlet.http.HttpServletRequest;

public abstract class BaseService {

    protected HttpServletRequest request;

    public abstract void excute(PollingRequest request, PollingResponse response);
}
