package com.bright.mvc.mapping;

import com.bright.mvc.annotation.DaoClass;
import com.bright.util.base.PackageBrowser;
import com.bright.util.base.reflect.ObjectSnooper;
import java.util.HashMap;
import java.util.List;
import org.apache.log4j.Logger;

public class DaoContainer {
    private static DaoContainer container=null;
    private HashMap<String,String> mapping=new HashMap<>();
    
    private DaoContainer(){
        
    }
    public static DaoContainer getCotnainer(){
        if(container==null){
            container=new DaoContainer();
            container.mapping.put("mysql","com.brooder.mvc.data.dao.MysqlDao");
        }
        return container;
    }
    public void start(String path) {
        try {
            if (path != null && !path.equals("")) {
                List<String> classNames = PackageBrowser.getClassNames(path);
                if (classNames != null) {
                    for (String classname : classNames) {
                        ObjectSnooper snooper = ObjectSnooper.snoop(classname);
                        if (null != snooper.annotation(DaoClass.class)) {
                            DaoClass k = (DaoClass) snooper.annotation(DaoClass.class);
                            this.mapping.put(k.name(), classname);
                            Logger.getLogger(DaoContainer.class).info("dao:"+k.name());
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public Object getDao(String daoName) throws Exception{
        String a=this.mapping.get(daoName);
        if(null!=a&&!"".equals(a)){
            return ObjectSnooper.snoop(a).object();
        }else{
            return null;
        }
    }
}
