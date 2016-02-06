package com.ttsx.site.service.serviceImp;

import com.brooder.mvc.annotation.Dao;
import com.brooder.mvc.annotation.Service;
import com.brooder.mvc.annotation.Transation;
import com.brooder.mvc.data.dao.MysqlDao;
import com.ttsx.site.models.Product;
import com.ttsx.site.service.ProductService;

@Service(name = "product")
public class ProductServiceImp implements ProductService {

    @Dao
    private MysqlDao dao;

    @Override
    @Transation
    public Product add(Product product) throws Exception {
        return this.dao.insert(product);
    }

    @Override
    @Transation
    public void remove(Product product) throws Exception {
        this.dao.delete(product);
    }

    @Override
    @Transation
    public void edit(Product product) throws Exception {
        this.dao.update(product);
    }

    @Override
    public Product find(Product product) throws Exception {
        return this.dao.query(product);
    }

    @Override
    public MysqlDao.PageInfo findProductPage(String sql, int from, int size, Object[] parameters) throws Exception {
        return this.dao.queryPage(sql, from, size, parameters);
    }

    @Override
    public void removeProducts(String ids) throws Exception {
        String[] t = ids.split(",");
        for (String id : t) {
            Product product = new Product();
            product.setId(Integer.parseInt(id));
            this.dao.delete(product);
        }
    }

}
