package com.ttsx.site.service;

import com.brooder.mvc.data.dao.MysqlDao.PageInfo;
import com.ttsx.site.models.Product;

public interface ProductService {

    public Product add(Product product) throws Exception;

    public void remove(Product product) throws Exception;

    public void edit(Product product) throws Exception;

    public Product find(Product product) throws Exception;

    public PageInfo findProductPage(String sql, int from, int size, Object[] parameters) throws Exception;

    public void removeProducts(String ids) throws Exception;
}
