package com.project.stayhealth.business.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.project.stayhealth.auth.entity.User;
import com.project.stayhealth.auth.exception.MyAPIException;
import com.project.stayhealth.auth.exception.ResourceNotFoundException;
import com.project.stayhealth.auth.repository.UserRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
	@Autowired
	private UserRepository repo;

	public List<User> findAll() throws EntityNotFoundException{
		if(repo.findAll().isEmpty())
			throw new EntityNotFoundException("no users found");
		return repo.findAll();
	}
	public User findById(Long id) throws ResourceNotFoundException{
		return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
	}
	
	public User updateUser(User u) throws ResourceNotFoundException, MyAPIException{
		User userToUpdate = repo.findById(u.getId()).orElseThrow(() -> new ResourceNotFoundException("User", "id", u.getId()));
		
		//TODO: verify if exist another user with same username or email
		if(repo.findByUsernameOrEmail(u.getUsername(),u.getEmail()).isEmpty() || repo.findByUsernameOrEmail(u.getUsername(),u.getEmail()).get().equals(userToUpdate))
			return repo.save(u);
		else throw new MyAPIException (HttpStatus.BAD_REQUEST, "username or email already present");
	}
	
	
}
