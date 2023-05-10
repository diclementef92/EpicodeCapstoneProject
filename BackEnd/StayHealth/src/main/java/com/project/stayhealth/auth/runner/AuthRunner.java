package com.project.stayhealth.auth.runner;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.project.stayhealth.auth.entity.ERole;
import com.project.stayhealth.auth.entity.Role;
import com.project.stayhealth.auth.repository.RoleRepository;
import com.project.stayhealth.auth.repository.UserRepository;
import com.project.stayhealth.auth.service.AuthService;


@Component
public class AuthRunner implements ApplicationRunner {
	
	@Autowired RoleRepository roleRepository;
	@Autowired UserRepository userRepository;
	@Autowired PasswordEncoder passwordEncoder;
	@Autowired AuthService authService;
	
	private Set<Role> adminRole;
	private Set<Role> userRole;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
		if(roleRepository.findAll().isEmpty())
			setRoleDefault();
		if(userRepository.findAll().isEmpty())
			createFakeUsers(10);
	}
	
	private void createFakeUsers(Integer num) {
		for (int i = 0; i < num; i++) {
			// TODO: create fakeUser method in configuration bean
		}
	}

	private void setRoleDefault() {
		Role admin = new Role();
		admin.setRoleName(ERole.ROLE_ADMIN);
		roleRepository.save(admin);
		
		Role user = new Role();
		user.setRoleName(ERole.ROLE_USER);
		roleRepository.save(user);
		
		
		
		adminRole = new HashSet<Role>();
		adminRole.add(admin);
		adminRole.add(user);
		
		
		userRole = new HashSet<Role>();
		userRole.add(user);
	}

}
