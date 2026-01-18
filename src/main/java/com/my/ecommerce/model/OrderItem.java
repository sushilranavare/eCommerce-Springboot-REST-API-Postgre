package com.my.ecommerce.model; // Make sure this matches your package structure

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;  // This links back to the Order class

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // This links to the Product class

    private Integer quantity;

    private Double priceAtPurchase;
}