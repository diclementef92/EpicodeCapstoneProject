package com.project.stayhealth.business.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.project.stayhealth.business.entity.WeightMeasurement;

public interface WeightMeasurementRepository
		extends JpaRepository<WeightMeasurement, Long>, PagingAndSortingRepository<WeightMeasurement, Long> {

	Optional<WeightMeasurement> findById(Long id);

	Optional<List<WeightMeasurement>> findByUserId(Long id);

//	@Query("SELECT w FROM WeightMeasurement w WHERE w.user = :user ORDER BY w.date DESC")
	@Query(value = "SELECT w.* FROM weight_measurements w WHERE w.user_id = :userid ORDER BY w.date DESC", nativeQuery = true)
	Optional<List<WeightMeasurement>> findAllByUserIdOrderedByDateDesc(@Param("userid") Long userid);

	Page<WeightMeasurement> findByUserId(Long id, Pageable pageable);

//	Page<WeightMeasurement> findAllOrderedByDate(Pageable pageable);

}
