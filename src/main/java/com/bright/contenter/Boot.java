package com.bright.contenter;

import com.bright.boot.IBootService;
import com.bright.util.jsonx.Jsonx;
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
