package com.bright.boot;

import com.bright.util.jsonx.Jsonx;

public interface IBootService {

	public void serviceStart(Jsonx option);

	public void serviceStop();
}