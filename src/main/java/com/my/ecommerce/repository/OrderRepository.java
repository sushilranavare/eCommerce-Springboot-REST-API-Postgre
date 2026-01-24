package com.my.ecommerce.repository;

import com.my.ecommerce.model.Order;
import com.my.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // This custom method allows us to find all orders belonging to a specific user
    List<Order> findByUser(User user);
}