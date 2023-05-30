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

	Page<WeightMeasurement> findByUserId(Long id, Pageable pageable);

	@Query(value = "SELECT w.* FROM weight_measurements w INNER JOIN users u ON w.user_id = u.id WHERE u.username = :username", nativeQuery = true)
	Optional<List<WeightMeasurement>> findByUsername(@Param("username") String username);

	@Query(value = "SELECT w.* FROM weight_measurements w INNER JOIN users u ON w.user_id = u.id WHERE u.username = :username ORDER BY w.date ASC", nativeQuery = true)
	Optional<List<WeightMeasurement>> findAllByUsernameOrderedByDateAsc(@Param("username") String username);

	@Query(value = "SELECT w.* FROM weight_measurements w INNER JOIN users u ON w.user_id = u.id WHERE u.username = :username ORDER BY w.date ASC", nativeQuery = true)
	Page<List<WeightMeasurement>> findAllByUsernameOrderedByDateAsc(@Param("username") String username,
			Pageable pageable);

}
