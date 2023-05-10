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

@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false)
    private LocalDate birthDay;
    
    @Column(nullable = false)
    private Double weightKg;
    
    @Column(nullable = false)
    private Double heightCm;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EGender gender;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EPhysicalActivityLevel physicalActivityLevel;
    
    @Column(nullable = false)
    private boolean physicallyActive;
    
    private Double dailyCaloricNeeds;
    
    @OneToMany(mappedBy = "user")
    private List<WeightMeasurement> weightHistory;
    
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Set<Role> roles = new HashSet<>();
    
    public void calculateDailyCaloricNeeds() {
    	LocalDate today  =LocalDate.now();    	
    	Integer age =Period.between(getBirthDay(), today).getYears();
    	Double result = 0d;
    	
    	if (age>=18 && age<30) {
    		if(getGender().equals(EGender.MALE))
    			result= 15.3 *getWeightKg() + 679;
    			
    		else if(getGender().equals(EGender.FEMALE))
    				result= 14.7 *getWeightKg() + 496;
    		
    	}else if (age>=30 && age<60) {
    		if(getGender().equals(EGender.MALE))
    			result= 11.6 *getWeightKg() + 879;
    		else if(getGender().equals(EGender.FEMALE))
    			result= 8.7 *getWeightKg() + 829;
    		
    	}else if (age>=60 && age<74) {
    		if(getGender().equals(EGender.MALE))
    			result= 11.9 *getWeightKg() + 700;
    		else if(getGender().equals(EGender.FEMALE))
    			result= 9.2 *getWeightKg() + 688;
    		
    	}else if (age>=74 && age <120) {
    		if(getGender().equals(EGender.MALE))
    			result= 11.6 *getWeightKg() + 879;
    		else if(getGender().equals(EGender.FEMALE))
    			result= 8.7 *getWeightKg() + 829;
    		
    	}else {
    		throw new MyAPIException(HttpStatus.NOT_ACCEPTABLE, getBirthDay() + " is not a valid value for birthDay, the age range is between 18 e 120");
    	}
    	log.info("basal metabolic rate " + result);
    	
    	if(age>=18 && age<60) {
	    	if(getGender().equals(EGender.MALE)) {
	    		if(isPhysicallyActive()) {
					switch (getPhysicalActivityLevel()) {
					case LOW:
						result*=1.55;
						break;
					case MEDIUM:
						result*=1.78;
						break;
					case HIGH:
						result*=2.10;
						break;
					default:
						break;
					}
			}else {
				//if is not PhysicallyActive
    			switch (getPhysicalActivityLevel()) {
					case LOW:
						result*=1.41;
						break;
					case MEDIUM:
						result*=1.70;
						break;
					case HIGH:
						result*=2.01;
						break;
					default:
						break;
					}
				}
	    	}else if(getGender().equals(EGender.FEMALE)) {
	    		if(isPhysicallyActive()) {
					switch (getPhysicalActivityLevel()) {
					case LOW:
						result*=1.56;
						break;
					case MEDIUM:
						result*=1.64;
						break;
					case HIGH:
						result*=1.82;
						break;
					default:
						break;
					}
		}else {
			//if is not PhysicallyActive
			switch (getPhysicalActivityLevel()) {
				case LOW:
					result*=1.42;
					break;
				case MEDIUM:
					result*=1.56;
					break;
				case HIGH:
					result*=1.73;
					break;

				default:
					break;
				}
		}
    }
   }else if(age>60 && age <75) {
	   if(getGender().equals(EGender.MALE))
		   if(isPhysicallyActive())
			   result*=1.51;
		   else
			   result*=1.40;
	   else
		   if(getGender().equals(EGender.FEMALE))
			   if(isPhysicallyActive())
				   result*=1.56;
			   else
				   result*=1.44;
   }else if(age >=75 && age <120) {
	   if(getGender().equals(EGender.MALE))
		   if(isPhysicallyActive())
			   result*=1.51;
		   else
			   result*=1.33;
	   else
		   if(getGender().equals(EGender.FEMALE))
			   if(isPhysicallyActive())
				   result*=1.56;
			   else
				   result*=1.37;
   }else {
		throw new MyAPIException(HttpStatus.NOT_ACCEPTABLE, getBirthDay() + " is not a valid value for birthDay, the age range is between 18 e 120");
   }
    	
    	setDailyCaloricNeeds(result);
    }
}
