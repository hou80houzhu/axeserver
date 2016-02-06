package com.brooder.boot;

import com.brooder.util.jsonx.Jsonx;

public interface IBootService {

	public void serviceStart(Jsonx option);

	public void serviceStop();
}