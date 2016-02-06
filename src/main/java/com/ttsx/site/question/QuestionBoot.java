package com.ttsx.site.question;

import com.brooder.boot.IBootService;
import com.brooder.util.jsonx.Jsonx;

public class QuestionBoot implements IBootService {

    @Override
    public void serviceStart(Jsonx option) {
        QuestionOption.init(option);
    }

    @Override
    public void serviceStop() {
    }

}
