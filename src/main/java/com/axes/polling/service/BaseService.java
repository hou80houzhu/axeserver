package com.axes.polling.service;

import com.axes.polling.base.PollingRequest;
import com.axes.polling.base.PollingResponse;
import javax.servlet.http.HttpServletRequest;

public abstract class BaseService {

    protected HttpServletRequest request;

    public abstract void excute(PollingRequest request, PollingResponse response);
}
