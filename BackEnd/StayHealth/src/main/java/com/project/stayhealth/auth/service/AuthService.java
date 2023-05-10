package com.project.stayhealth.auth.service;

import com.project.stayhealth.auth.payload.LoginDto;
import com.project.stayhealth.auth.payload.RegisterDto;

public interface AuthService {
    
	String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
    
}
