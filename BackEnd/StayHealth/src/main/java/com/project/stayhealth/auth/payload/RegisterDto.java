package com.project.stayhealth.auth.payload;

import java.time.LocalDate;
import java.util.Set;

import com.project.stayhealth.business.entity.EGender;
import com.project.stayhealth.business.entity.EPhysicalActivityLevel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    private String firstName;
    private String lastName;
    private LocalDate birthDay;
    private Double initialWeightKg;
    private Double heightCm;
    private EGender gender;
    private EPhysicalActivityLevel physicalActivityLevel;
    private boolean physicallyActive;
    
    private String username;
    private String email;
    private String password;
    
    private Set<String> roles;
}
