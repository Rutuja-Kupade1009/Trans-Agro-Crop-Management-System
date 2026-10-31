package com.transagro.service.impl;

import com.transagro.entity.Farmer;
import com.transagro.exception.ResourceNotFoundException;
import com.transagro.repository.CropRepository;
import com.transagro.repository.FarmerRepository;
import com.transagro.service.FarmerService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FarmerServiceImpl implements FarmerService {
    private final FarmerRepository farmerRepository;
    private final CropRepository cropRepository;

    public FarmerServiceImpl(FarmerRepository farmerRepository, CropRepository cropRepository) {
        this.farmerRepository = farmerRepository;
        this.cropRepository = cropRepository;
    }

    @Override
    public Farmer addFarmer(Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    @Override
    public List<Farmer> getAllFarmers() {
        return farmerRepository.findAll();
    }

    @Override
    public Farmer getFarmerById(Long id) {
        return farmerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found: " + id));
    }

    @Override
    public Farmer updateFarmer(Long id, Farmer farmer) {
        Farmer existing = getFarmerById(id);
        existing.setName(farmer.getName());
        existing.setEmail(farmer.getEmail());
        existing.setPhone(farmer.getPhone());
        existing.setAddress(farmer.getAddress());
        return farmerRepository.save(existing);
    }

    @Override
    public void deleteFarmer(Long id) {
        Farmer farmer = getFarmerById(id);
        if (cropRepository.existsByFarmerId(id)) {
            throw new IllegalStateException("Delete this farmer's crops before deleting the farmer.");
        }
        farmerRepository.delete(farmer);
    }
}
