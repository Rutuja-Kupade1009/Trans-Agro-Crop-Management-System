package com.transagro.service;

import com.transagro.entity.Farmer;
import java.util.List;

public interface FarmerService {
    Farmer addFarmer(Farmer farmer);
    List<Farmer> getAllFarmers();
    Farmer getFarmerById(Long id);
    Farmer updateFarmer(Long id, Farmer farmer);
    void deleteFarmer(Long id);
}
