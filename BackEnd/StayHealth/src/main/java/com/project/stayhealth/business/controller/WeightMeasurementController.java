package com.project.stayhealth.business.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.stayhealth.business.entity.WeightMeasurement;
import com.project.stayhealth.business.service.WeightMeasurementService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/weights")
public class WeightMeasurementController {

	@Autowired
	private WeightMeasurementService service;

	@GetMapping("{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<WeightMeasurement>> findByUserId(@PathVariable Long id) {
		return new ResponseEntity<List<WeightMeasurement>>(service.findByUserId(id), HttpStatus.FOUND);
	}

	@PostMapping("{idUser}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<WeightMeasurement> addWeightMeasurement(@PathVariable Long idUser,
			@RequestBody WeightMeasurement weight) {
		return new ResponseEntity<WeightMeasurement>(service.addWeightMeasurement(idUser, weight), HttpStatus.OK);
	}
}
