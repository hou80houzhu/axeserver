package com.packet.contenter;

import com.packet.boot.IBootService;
import com.packet.util.jsonx.Jsonx;
import org.apache.log4j.Logger;

public class Boot implements IBootService {

    @Override
    public void serviceStart(Jsonx option) {
        try {
            Contenter.init(new ContenterOption(option));
        } catch (Exception ex) {
            ex.printStackTrace();
            Logger.getLogger(Boot.class).debug(ex.getMessage());
        }
    }

    @Override
    public void serviceStop() {
    }

}
