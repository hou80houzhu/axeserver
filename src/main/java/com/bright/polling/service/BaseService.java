package com.bright.polling.service;

import com.bright.polling.base.PollingRequest;
import com.bright.polling.base.PollingResponse;
import javax.servlet.http.HttpServletRequest;

public abstract class BaseService {

    protected HttpServletRequest request;

    public abstract void excute(PollingRequest request, PollingResponse response);
}
