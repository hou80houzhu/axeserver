package com.ttsx.site.question;

import com.packet.boot.IBootService;
import com.packet.util.jsonx.Jsonx;

public class QuestionBoot implements IBootService {

    @Override
    public void serviceStart(Jsonx option) {
        QuestionOption.init(option);
    }

    @Override
    public void serviceStop() {
    }

}
