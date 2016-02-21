package com.axes.boot;

import com.axes.util.jsonx.Jsonx;

public interface IBootService {

	public void serviceStart(Jsonx option);

	public void serviceStop();
}