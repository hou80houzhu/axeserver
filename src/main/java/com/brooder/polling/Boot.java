package com.brooder.polling;

import com.brooder.boot.IBootService;
import com.brooder.polling.base.Polling;
import com.brooder.util.jsonx.Jsonx;

public class Boot implements IBootService {

    @Override
    public void serviceStart(Jsonx option) {
        try {
            Polling.init(option);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void serviceStop() {
        Polling.getPolling().stop();
    }

}
