package com.transagro.controller;

import com.transagro.entity.Crop;
import com.transagro.service.CropService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "http://localhost:5173")
public class CropController {
    private final CropService cropService;

    public CropController(CropService cropService) {
        this.cropService = cropService;
    }

    @PostMapping("/farmer/{farmerId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Crop addCrop(@PathVariable Long farmerId, @Valid @RequestBody Crop crop) {
        return cropService.addCrop(crop, farmerId);
    }

    @GetMapping
    public List<Crop> getAllCrops() {
        return cropService.getAllCrops();
    }

    @GetMapping("/{id}")
    public Crop getCropById(@PathVariable Long id) {
        return cropService.getCropById(id);
    }

    @GetMapping("/farmer/{farmerId}")
    public List<Crop> getCropsByFarmer(@PathVariable Long farmerId) {
        return cropService.getCropsByFarmer(farmerId);
    }

    @PutMapping("/{id}")
    public Crop updateCrop(@PathVariable Long id, @Valid @RequestBody Crop crop) {
        return cropService.updateCrop(id, crop);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCrop(@PathVariable Long id) {
        cropService.deleteCrop(id);
    }
}
