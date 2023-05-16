package com.project.stayhealth.business.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.stayhealth.business.entity.Food;
import com.project.stayhealth.business.service.FoodService;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
	@Autowired
	private FoodService foodService;

	@GetMapping("{id}")
	public Food findByID(@PathVariable Long id) {
		return foodService.findByID(id);
	}
}
