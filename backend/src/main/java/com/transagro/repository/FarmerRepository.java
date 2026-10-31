package com.transagro.repository;

import com.transagro.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    boolean existsByEmail(String email);
}
