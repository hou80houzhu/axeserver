package com.bright.jmail;

import com.bright.boot.IBootService;
import com.bright.jmail.data.JmailConfig;
import com.bright.jmail.page.JmailPage;
import com.bright.util.jsonx.Jsonx;
import com.bright.util.worker.JworkerContainer;

public class JmailBoot implements IBootService {

    @Override
    public void serviceStart(Jsonx option) {
        try {
            JmailConfig.init(option);
            JmailPage.init(option.get("template"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void serviceStop() {
        JworkerContainer.getContainer().getSinglePool("xxmailonly").stop();
    }

}
