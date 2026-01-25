package com.my.ecommerce;

import com.my.ecommerce.model.Product;
import com.my.ecommerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // It only insert data if the database is empty
        if (productRepository.count() == 0) {
            Product p1 = new Product();
            p1.setName("Wireless Headphones");
            p1.setDescription("Noise-cancelling, 20-hour battery life.");
            p1.setPrice(89.99);
            p1.setImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500");

            Product p2 = new Product();
            p2.setName("Smart Watch");
            p2.setDescription("Tracks fitness, heart rate, and notifications.");
            p2.setPrice(120.50);
            p2.setImageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500");

            Product p3 = new Product();
            p3.setName("Gaming Mouse");
            p3.setDescription("High precision optical sensor, RGB lighting.");
            p3.setPrice(45.00);
            p3.setImageUrl("https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500");

            Product p4 = new Product();
            p4.setName("Mechanical Keyboard");
            p4.setDescription("Clicky blue switches, compact layout.");
            p4.setPrice(75.00);
            p4.setImageUrl("https://images.unsplash.com/photo-1587829741301-dc798b91a91e?w=500");

            productRepository.saveAll(Arrays.asList(p1, p2, p3, p4));
            System.out.println("--- Data Seeding Completed: 4 Products Added ---");
        }
    }
}