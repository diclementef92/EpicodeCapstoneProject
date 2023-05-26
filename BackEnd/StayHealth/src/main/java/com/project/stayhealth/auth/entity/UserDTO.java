package com.project.stayhealth.auth.entity;

import java.time.LocalDate;

import com.project.stayhealth.business.entity.EGender;
import com.project.stayhealth.business.entity.EPhysicalActivityLevel;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {

	private String firstName;
	private String lastName;
	private LocalDate birthDay;

	private Double weightKg;

	private Double heightCm;

	private EGender gender;

	private EPhysicalActivityLevel physicalActivityLevel;

	private boolean physicallyActive;

	private Double dailyCaloricNeeds;

	private String username;
	private String email;

}
