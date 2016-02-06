package com.brooder.jmail;

import com.brooder.boot.IBootService;
import com.brooder.jmail.data.JmailConfig;
import com.brooder.jmail.page.JmailPage;
import com.brooder.util.jsonx.Jsonx;
import com.brooder.util.worker.JworkerContainer;

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
