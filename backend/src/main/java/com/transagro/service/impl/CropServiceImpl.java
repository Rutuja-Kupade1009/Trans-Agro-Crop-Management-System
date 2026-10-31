package com.transagro.service.impl;

import com.transagro.entity.Crop;
import com.transagro.entity.Farmer;
import com.transagro.exception.ResourceNotFoundException;
import com.transagro.repository.CropRepository;
import com.transagro.repository.FarmerRepository;
import com.transagro.service.CropService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CropServiceImpl implements CropService {
    private final CropRepository cropRepository;
    private final FarmerRepository farmerRepository;

    public CropServiceImpl(CropRepository cropRepository, FarmerRepository farmerRepository) {
        this.cropRepository = cropRepository;
        this.farmerRepository = farmerRepository;
    }

    @Override
    public Crop addCrop(Crop crop, Long farmerId) {
        Farmer farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found: " + farmerId));
        crop.setFarmer(farmer);
        return cropRepository.save(crop);
    }

    @Override
    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }

    @Override
    public Crop getCropById(Long id) {
        return cropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crop not found: " + id));
    }

    @Override
    public List<Crop> getCropsByFarmer(Long farmerId) {
        if (!farmerRepository.existsById(farmerId)) {
            throw new ResourceNotFoundException("Farmer not found: " + farmerId);
        }
        return cropRepository.findByFarmerId(farmerId);
    }

    @Override
    public Crop updateCrop(Long id, Crop crop) {
        Crop existing = getCropById(id);
        existing.setCropName(crop.getCropName());
        existing.setCropType(crop.getCropType());
        existing.setSeason(crop.getSeason());
        existing.setAreaInAcres(crop.getAreaInAcres());
        return cropRepository.save(existing);
    }

    @Override
    public void deleteCrop(Long id) {
        cropRepository.delete(getCropById(id));
    }
}
