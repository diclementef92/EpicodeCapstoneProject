package com.project.stayhealth.business.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.stayhealth.auth.entity.User;
import com.project.stayhealth.auth.exception.ResourceNotFoundException;
import com.project.stayhealth.auth.repository.UserRepository;
import com.project.stayhealth.business.entity.WeightMeasurement;
import com.project.stayhealth.business.entity.WeightMeasurementToUpdateDTO;
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
		User userFound = userRepo.findById(idUSer)
				.orElseThrow(() -> new ResourceNotFoundException("user", "id", idUSer));

		w.setUser(userFound);
		return weightRepo.save(w);
	}

	public WeightMeasurement updateWeightMeasurement(Long idWeight, WeightMeasurementToUpdateDTO weightDto) {
		WeightMeasurement measurementFound = findById(idWeight);
		if (weightDto.getDate() != null)
			measurementFound.setDate(weightDto.getDate());
		if (weightDto.getWeight() != null)
			measurementFound.setWeight(weightDto.getWeight());

		return weightRepo.save(measurementFound);

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
