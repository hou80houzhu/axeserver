package com.ttsx.site.service;

import com.brooder.mvc.data.dao.MysqlDao.PageInfo;
import com.ttsx.site.models.News;
import java.util.HashMap;

public interface NewsService {

    public News add(News news) throws Exception;

    public void remove(News news) throws Exception;

    public void edit(News news) throws Exception;

    public News find(News news) throws Exception;
    
    public HashMap<String,Object> find(String sql,Object[] parameters) throws Exception;

    public PageInfo findNewsPage(String sql,int from,int size, Object[] parameters) throws Exception;
    
    public void removeNews(String ids) throws Exception;
}
