package com.transagro.service;

import com.transagro.entity.Crop;
import java.util.List;

public interface CropService {
    Crop addCrop(Crop crop, Long farmerId);
    List<Crop> getAllCrops();
    Crop getCropById(Long id);
    List<Crop> getCropsByFarmer(Long farmerId);
    Crop updateCrop(Long id, Crop crop);
    void deleteCrop(Long id);
}
