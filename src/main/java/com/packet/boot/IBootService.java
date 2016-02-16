package com.packet.boot;

import com.packet.util.jsonx.Jsonx;

public interface IBootService {

	public void serviceStart(Jsonx option);

	public void serviceStop();
}