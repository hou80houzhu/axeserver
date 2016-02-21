package com.axes.jmail;

import com.axes.boot.IBootService;
import com.axes.jmail.data.JmailConfig;
import com.axes.jmail.page.JmailPage;
import com.axes.util.jsonx.Jsonx;
import com.axes.util.worker.JworkerContainer;

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
