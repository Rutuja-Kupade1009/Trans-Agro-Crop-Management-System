package com.transagro.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "crops")
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Crop name is required")
    private String cropName;

    @NotBlank(message = "Crop type is required")
    private String cropType;

    @NotBlank(message = "Season is required")
    private String season;

    @Positive(message = "Area must be greater than zero")
    private Double areaInAcres;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    public Crop() {}

    public Long getId() { return id; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }
    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }
    public Double getAreaInAcres() { return areaInAcres; }
    public void setAreaInAcres(Double areaInAcres) { this.areaInAcres = areaInAcres; }
    public Farmer getFarmer() { return farmer; }
    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
}
