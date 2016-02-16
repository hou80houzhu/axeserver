package com.packet.jmail;

import com.packet.boot.IBootService;
import com.packet.jmail.data.JmailConfig;
import com.packet.jmail.page.JmailPage;
import com.packet.util.jsonx.Jsonx;
import com.packet.util.worker.JworkerContainer;

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
