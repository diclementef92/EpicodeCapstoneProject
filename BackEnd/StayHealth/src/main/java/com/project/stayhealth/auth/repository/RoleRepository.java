package com.project.stayhealth.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.stayhealth.auth.entity.ERole;
import com.project.stayhealth.auth.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
	Optional<Role> findByRoleName(ERole roleName);

}
