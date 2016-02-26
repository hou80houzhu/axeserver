package com.bright.polling;

import com.bright.boot.IBootService;
import com.bright.polling.base.Polling;
import com.bright.util.jsonx.Jsonx;

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
