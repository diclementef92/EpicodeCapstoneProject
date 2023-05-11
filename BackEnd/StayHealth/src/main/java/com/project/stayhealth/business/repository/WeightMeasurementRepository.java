package com.project.stayhealth.business.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.stayhealth.business.entity.WeightMeasurement;

public interface WeightMeasurementRepository extends JpaRepository<WeightMeasurement, Long> {

	Optional<WeightMeasurement> findById(Long id);

	Optional<List<WeightMeasurement>> findByUserId(Long id);
}
