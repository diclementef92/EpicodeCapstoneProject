package com.project.stayhealth.business.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.stayhealth.auth.entity.User;
import com.project.stayhealth.auth.entity.UserDTO;
import com.project.stayhealth.auth.entity.UserToUpdateDTO;
import com.project.stayhealth.business.service.UserService;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UsersController {

	@Autowired
	private UserService userService;

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<User>> getAllUsers() {
		if (userService.findAll().isEmpty())
			throw new EntityNotFoundException("no users found");
		return new ResponseEntity<List<User>>(userService.findAll(), HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public String deleteUserById(@PathVariable Long id) {
		if (userService.findById(id) != null) {
			userService.removeUser(id);
			return "User with id " + id + " removed!";
		}
		return "not found";

	}

	@GetMapping("/{username}")
	@PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
	public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
		return new ResponseEntity<UserDTO>(userService.findByUsername(username), HttpStatus.OK);
	}

	@PutMapping("/{username}")
	@PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
	public ResponseEntity<UserDTO> updateUser(@PathVariable String username, @RequestBody UserToUpdateDTO user) {
		return new ResponseEntity<UserDTO>(userService.updateUser(username, user), HttpStatus.OK);
	}
}
