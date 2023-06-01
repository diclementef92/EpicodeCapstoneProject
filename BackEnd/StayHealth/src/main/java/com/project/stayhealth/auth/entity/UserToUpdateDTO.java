package com.project.stayhealth.auth.entity;

import java.time.LocalDate;

import com.project.stayhealth.business.entity.EPhysicalActivityLevel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserToUpdateDTO {

	private String firstName;
	private String lastName;
	private LocalDate birthDay;

	private Double heightCm;
	private Double weightKg;

	private EPhysicalActivityLevel physicalActivityLevel;

	private Boolean physicallyActive;

	private String username;
	private String email;
	private String password;

}
