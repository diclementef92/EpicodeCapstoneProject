package com.project.stayhealth.business.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.project.stayhealth.auth.entity.User;
import com.project.stayhealth.auth.exception.MyAPIException;
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

	public List<WeightMeasurement> findByUsername(String username) {
		if (weightRepo.findByUsername(username).isPresent())
			return weightRepo.findByUsername(username).get();
		else
			throw new ResourceNotFoundException("WeightMeasurement", "username", username);
	}

	public WeightMeasurement addWeightMeasurement(String username, WeightMeasurement w) {
		User userFound = userRepo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("user", "username", username));

		// retrive all measurement for this user
		List<WeightMeasurement> weights = findByUsername(username);
		// if there isn't for the same date
		if (weights.stream().anyMatch(e -> e.getDate().equals(w.getDate())))
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "WeightMeasurement for this date is already present");

		w.setUser(userFound);
		return weightRepo.save(w);
	}

	public WeightMeasurement updateWeightMeasurement(Long idWeight, WeightMeasurementToUpdateDTO weightDto) {
		WeightMeasurement measurementFound = findById(idWeight);
		if (weightDto.getDate() != null) {
			// retrive all measurement for this user
			List<WeightMeasurement> weights = findByUsername(measurementFound.getUser().getUsername());
			// if there isn't for the same date
			if (weights.stream().anyMatch(e -> e.getDate().equals(weightDto.getDate())))
				throw new MyAPIException(HttpStatus.BAD_REQUEST, "WeightMeasurement for this date is already present");

			measurementFound.setDate(weightDto.getDate());
		}
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

	public List<WeightMeasurement> findAllByUsernameOrderedByDateAsc(String username) {
		if (userRepo.findByUsername(username).isPresent()) {
			if (weightRepo.findAllByUsernameOrderedByDateAsc(username).isPresent()) {
				return weightRepo.findAllByUsernameOrderedByDateAsc(username).get();
			} else
				throw new ResourceNotFoundException("WeightMeasurement", "username", username);

		} else
			throw new ResourceNotFoundException("user", "username", username);

	}

}
