package com.bright.util.jsonx;

public abstract class JsonEachArray {

    protected Object[] arguments;

    public JsonEachArray(Object... args) {
        this.arguments = args;
    }

    public abstract boolean each(int index, Jsonx json) throws Exception;
}
