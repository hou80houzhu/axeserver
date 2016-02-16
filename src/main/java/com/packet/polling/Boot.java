package com.packet.polling;

import com.packet.boot.IBootService;
import com.packet.polling.base.Polling;
import com.packet.util.jsonx.Jsonx;

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
