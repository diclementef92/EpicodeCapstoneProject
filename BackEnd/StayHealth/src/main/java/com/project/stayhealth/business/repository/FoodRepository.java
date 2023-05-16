package com.project.stayhealth.business.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.stayhealth.business.entity.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

	@Query("SELECT f From Food f Where LOWER(f.description) LIKE LOWER(CONCAT('%',:name,'%'))")
	Optional<List<Food>> findByDescriptionLike(@Param("name") String name);

	@Query("SELECT f From Food f Where LOWER(f.description) LIKE LOWER(CONCAT('%',:name,'%'))")
	Page<Food> findByDescriptionLike(@Param("name") String name, Pageable pageable);
}
