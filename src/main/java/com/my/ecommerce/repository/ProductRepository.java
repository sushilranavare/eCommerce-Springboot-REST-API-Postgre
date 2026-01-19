package com.my.ecommerce.repository;

import com.my.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // This empty interface gives you all the magic methods like save(), findAll(), etc.
}