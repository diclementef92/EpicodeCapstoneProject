package com.project.stayhealth.auth.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.stayhealth.auth.entity.ERole;
import com.project.stayhealth.auth.entity.Role;
import com.project.stayhealth.auth.entity.User;
import com.project.stayhealth.auth.exception.MyAPIException;
import com.project.stayhealth.auth.payload.LoginDto;
import com.project.stayhealth.auth.payload.RegisterDto;
import com.project.stayhealth.auth.repository.RoleRepository;
import com.project.stayhealth.auth.repository.UserRepository;
import com.project.stayhealth.auth.security.JwtTokenProvider;

@Service
public class AuthServiceImpl implements AuthService {

	private AuthenticationManager authenticationManager;
	private UserRepository userRepository;
	private RoleRepository roleRepository;
	private PasswordEncoder passwordEncoder;
	private JwtTokenProvider jwtTokenProvider;

	public AuthServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository,
			RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	public String login(LoginDto loginDto) {

		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtTokenProvider.generateToken(authentication);

		return token;
	}

	@Override
	public String register(RegisterDto registerDto) {

		// add check for username exists in database
		if (userRepository.existsByUsername(registerDto.getUsername())) {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!.");
		}

		// add check for email exists in database
		if (userRepository.existsByEmail(registerDto.getEmail())) {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!.");
		}

		User user = new User();
		user.setFirstName(registerDto.getFirstName());
		user.setLastName(registerDto.getLastName());
		user.setUsername(registerDto.getUsername());
		user.setBirthDay(registerDto.getBirthDay());
		user.setGender(registerDto.getGender());
		user.setHeightCm(registerDto.getHeightCm());
		user.setWeightKg(registerDto.getInitialWeightKg());
		user.setPhysicalActivityLevel(registerDto.getPhysicalActivityLevel());
		user.setPhysicallyActive(registerDto.isPhysicallyActive());
		user.setEmail(registerDto.getEmail());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		user.calculateDailyCaloricNeeds();
		user.calculateIdealWeight();
		Set<Role> roles = new HashSet<>();

		if (registerDto.getRoles() != null) {
			registerDto.getRoles().forEach(role -> {
				Role userRole = roleRepository.findByRoleName(getRole(role)).get();
				roles.add(userRole);
			});
		} else {
			Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).get();
			roles.add(userRole);
		}

		user.setRoles(roles);
		System.out.println(user);
		userRepository.save(user);

		return "User registered successfully!.";
	}

	public ERole getRole(String role) {
		if (role.equals("ROLE_ADMIN"))
			return ERole.ROLE_ADMIN;
		return ERole.ROLE_USER;
	}

}
