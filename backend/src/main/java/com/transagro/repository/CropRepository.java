package com.transagro.repository;

import com.transagro.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findByFarmerId(Long farmerId);
    boolean existsByFarmerId(Long farmerId);
}
