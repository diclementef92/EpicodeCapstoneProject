package com.project.stayhealth.business.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.stayhealth.auth.entity.User;
import com.project.stayhealth.auth.entity.UserDTO;
import com.project.stayhealth.auth.entity.UserToUpdateDTO;
import com.project.stayhealth.auth.exception.MyAPIException;
import com.project.stayhealth.auth.exception.ResourceNotFoundException;
import com.project.stayhealth.auth.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {
	@Autowired
	private UserRepository repo;

	private PasswordEncoder encoder;

	public List<User> findAll() throws EntityNotFoundException {
		return repo.findAll();
	}

	public User findById(Long id) throws ResourceNotFoundException {
		return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
	}

	public UserDTO findByUsername(String username) throws ResourceNotFoundException {
		User user = repo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
		return userDtoFrom(user);
	}

	public User createUser(User u) {
		if (repo.findByUsernameOrEmail(u.getUsername(), u.getEmail()).isPresent())
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "username or email already present");

		return repo.save(u);
	}

	public UserDTO updateUser(String username, UserToUpdateDTO userDto)
			throws ResourceNotFoundException, MyAPIException {
		User userToUpdate = repo.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

		try {
			// verify if exist another user with same username or email
			Optional<User> userFound = repo.findByUsernameOrEmail(userDto.getUsername(), userDto.getEmail());
			if (userFound.isEmpty() || userFound.get().equals(userToUpdate)) {
				// update only fields present in Dto body
				if (userDto.getFirstName() != null)
					userToUpdate.setFirstName(userDto.getFirstName());

				if (userDto.getLastName() != null)
					userToUpdate.setLastName(userDto.getLastName());

				if (userDto.getBirthDay() != null)
					userToUpdate.setBirthDay(userDto.getBirthDay());

				if (userDto.getHeightCm() != null)
					userToUpdate.setHeightCm(userDto.getHeightCm());

				if (userDto.getPhysicalActivityLevel() != null)
					userToUpdate.setPhysicalActivityLevel(userDto.getPhysicalActivityLevel());

				if (userDto.getPhysicallyActive() != null)
					if (userDto.getPhysicallyActive())
						userToUpdate.setPhysicallyActive(userDto.getPhysicallyActive().booleanValue());

				if (userDto.getUsername() != null)
					userToUpdate.setUsername(userDto.getUsername());

				if (userDto.getEmail() != null)
					userToUpdate.setEmail(userDto.getEmail());

				userToUpdate.calculateDailyCaloricNeeds();
				userToUpdate.calculateIdealWeight();

				return userDtoFrom(repo.save(userToUpdate));
			} else
				throw new MyAPIException(HttpStatus.BAD_REQUEST, "username or email already present");

		} catch (IncorrectResultSizeDataAccessException e) {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "username or email already present");
		}
	}

	public void removeUser(Long id) {
		repo.delete(findById(id));
	}

	private UserDTO userDtoFrom(User user) {
		return UserDTO.builder().firstName(user.getFirstName()).lastName(user.getLastName())
				.birthDay(user.getBirthDay()).weightKg(user.getWeightKg()).heightCm(user.getHeightCm())
				.gender(user.getGender()).physicalActivityLevel(user.getPhysicalActivityLevel())
				.idealWeight(user.getIdealWeight()).physicallyActive(user.isPhysicallyActive())
				.dailyCaloricNeeds(user.getDailyCaloricNeeds()).username(user.getUsername()).email(user.getEmail())
				.build();
	}
}
