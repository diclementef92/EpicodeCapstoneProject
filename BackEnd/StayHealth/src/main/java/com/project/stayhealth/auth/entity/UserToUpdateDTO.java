package com.project.stayhealth.auth.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;

import com.project.stayhealth.auth.exception.MyAPIException;
import com.project.stayhealth.business.entity.EGender;
import com.project.stayhealth.business.entity.EPhysicalActivityLevel;
import com.project.stayhealth.business.entity.WeightMeasurement;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserToUpdateDTO {

    private String firstName;
    private String lastName;
    private LocalDate birthDay;
    
    private EPhysicalActivityLevel physicalActivityLevel;
    
    private String physicallyActive;
        
    private String username;
    private String email;
    private String password;
    
    
    
}
