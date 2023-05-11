package com.project.stayhealth.business.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.project.stayhealth.auth.entity.User;
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

	public List<User> findAll() throws EntityNotFoundException {

		return repo.findAll();
	}

	public User findById(Long id) throws ResourceNotFoundException {
		return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
	}

	public User createUser(User u) {
		if (repo.findByUsernameOrEmail(u.getUsername(), u.getEmail()).isPresent())
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "username or email already present");
		log.info("user " + u.toString());
		return repo.save(u);
	}

	public User updateUser(Long id, UserToUpdateDTO userDto) throws ResourceNotFoundException, MyAPIException {
		User userToUpdate = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

		// verify if exist another user with same username or email
		Optional<User> userFound = repo.findByUsernameOrEmail(userDto.getUsername(), userDto.getEmail());
		if (userFound.isEmpty() || userFound.get().equals(userToUpdate)) {
			if (userDto.getFirstName() != null)
				userToUpdate.setFirstName(userDto.getFirstName());
			if (userDto.getLastName() != null)
				userToUpdate.setLastName(userDto.getLastName());
			if (userDto.getBirthDay() != null)
				userToUpdate.setBirthDay(userDto.getBirthDay());

			if (userDto.getPhysicalActivityLevel() != null)
				userToUpdate.setPhysicalActivityLevel(userDto.getPhysicalActivityLevel());

			if (userDto.getPhysicallyActive() != null)
				if (userDto.getPhysicallyActive().equalsIgnoreCase("true"))
					userToUpdate.setPhysicallyActive(true);
				else
					userToUpdate.setPhysicallyActive(false);

			if (userDto.getUsername() != null)
				userToUpdate.setUsername(userDto.getUsername());

			if (userDto.getEmail() != null)
				userToUpdate.setEmail(userDto.getEmail());

			if (userDto.getPassword() != null)
				userToUpdate.setPassword(userDto.getPassword());

			return repo.save(userToUpdate);
		} else
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "username or email already present");
	}

}
