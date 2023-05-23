package com.project.stayhealth.business.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.stayhealth.business.entity.Food;
import com.project.stayhealth.business.service.FoodService;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
	@Autowired
	private FoodService foodService;

	@GetMapping("{id}")
	public ResponseEntity<Food> findByID(@PathVariable Long id) {
		return new ResponseEntity<Food>(foodService.findByID(id), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<Food>> findByDescriptionLike(@RequestParam String descr) {
		return new ResponseEntity<List<Food>>(foodService.findByDescriptionLike(descr), HttpStatus.OK);
	}

}
