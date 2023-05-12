package com.project.stayhealth.business.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.stayhealth.auth.exception.ResourceNotFoundException;
import com.project.stayhealth.auth.repository.UserRepository;
import com.project.stayhealth.business.entity.WeightMeasurement;
import com.project.stayhealth.business.repository.WeightMeasurementRepository;

@Service
public class WeightMeasurementService {
	@Autowired
	private WeightMeasurementRepository weightRepo;

	@Autowired
	private UserRepository userRepo;

	public WeightMeasurement findById(Long id) {
		return weightRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("WeightMeasurement", "id", id));
	}

	public List<WeightMeasurement> findByUserId(Long id) {
		return weightRepo.findByUserId(id)
				.orElseThrow(() -> new ResourceNotFoundException("WeightMeasurement for user", "id", id));
	}

	public WeightMeasurement addWeightMeasurement(Long idUSer, WeightMeasurement w) {
		w.setUser(userRepo.findById(idUSer).orElseThrow(() -> new ResourceNotFoundException("user", "id", idUSer)));
		return weightRepo.save(w);
	}

	public void updateWeightMeasurement(Long idUSer, WeightMeasurement w) {

	}

	public String removeWeightMeasurement(Long idMeasurement) {
		if (findById(idMeasurement) != null) {
			weightRepo.deleteById(idMeasurement);
			return "WeightMeasurement with id " + idMeasurement + " removed!";
		}
		return "not found";
	}

	public List<WeightMeasurement> findAllByUserIdOrderedByDateDesc(Long idUSer) {
		if (userRepo.findById(idUSer).isPresent()) {
			if (weightRepo.findAllByUserIdOrderedByDateDesc(idUSer).isPresent()) {
				return weightRepo.findAllByUserIdOrderedByDateDesc(idUSer).get();
			} else
				throw new ResourceNotFoundException("WeightMeasurement", "id", idUSer);

		} else
			throw new ResourceNotFoundException("user", "id", idUSer);

	}

}
