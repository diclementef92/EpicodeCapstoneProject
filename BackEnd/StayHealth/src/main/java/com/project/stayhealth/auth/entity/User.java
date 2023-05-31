package com.project.stayhealth.auth.entity;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.stayhealth.auth.exception.MyAPIException;
import com.project.stayhealth.business.entity.EGender;
import com.project.stayhealth.business.entity.EPhysicalActivityLevel;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Builder
@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })

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

	@Column(precision = 2)
	private Double dailyCaloricNeeds;

	@Column(precision = 2)
	private Double idealWeight;

	@Column(nullable = false, unique = true)
	private String username;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String password;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	private Set<Role> roles = new HashSet<>();

	public void calculateDailyCaloricNeeds() {
		LocalDate today = LocalDate.now();
		Integer age = Period.between(getBirthDay(), today).getYears();
		Double result = 0d;

		if (age >= 18 && age < 30) {
			if (getGender().equals(EGender.MALE))
				result = 15.3 * getWeightKg() + 679;

			else if (getGender().equals(EGender.FEMALE))
				result = 14.7 * getWeightKg() + 496;

		} else if (age >= 30 && age < 60) {
			if (getGender().equals(EGender.MALE))
				result = 11.6 * getWeightKg() + 879;
			else if (getGender().equals(EGender.FEMALE))
				result = 8.7 * getWeightKg() + 829;

		} else if (age >= 60 && age < 74) {
			if (getGender().equals(EGender.MALE))
				result = 11.9 * getWeightKg() + 700;
			else if (getGender().equals(EGender.FEMALE))
				result = 9.2 * getWeightKg() + 688;

		} else if (age >= 74 && age < 120) {
			if (getGender().equals(EGender.MALE))
				result = 11.6 * getWeightKg() + 879;
			else if (getGender().equals(EGender.FEMALE))
				result = 8.7 * getWeightKg() + 829;

		} else {
			throw new MyAPIException(HttpStatus.NOT_ACCEPTABLE,
					getBirthDay() + " is not a valid value for birthDay, the age range is between 18 e 120");
		}
//		log.info("basal metabolic rate " + result);

		if (age >= 18 && age < 60) {
			if (getGender().equals(EGender.MALE)) {
				if (isPhysicallyActive()) {
					switch (getPhysicalActivityLevel()) {
					case LOW:
						result *= 1.55;
						break;
					case MEDIUM:
						result *= 1.78;
						break;
					case HIGH:
						result *= 2.10;
						break;
					default:
						break;
					}
				} else {
					// if is not PhysicallyActive
					switch (getPhysicalActivityLevel()) {
					case LOW:
						result *= 1.41;
						break;
					case MEDIUM:
						result *= 1.70;
						break;
					case HIGH:
						result *= 2.01;
						break;
					default:
						break;
					}
				}
			} else if (getGender().equals(EGender.FEMALE)) {
				if (isPhysicallyActive()) {
					switch (getPhysicalActivityLevel()) {
					case LOW:
						result *= 1.56;
						break;
					case MEDIUM:
						result *= 1.64;
						break;
					case HIGH:
						result *= 1.82;
						break;
					default:
						break;
					}
				} else {
					// if is not PhysicallyActive
					switch (getPhysicalActivityLevel()) {
					case LOW:
						result *= 1.42;
						break;
					case MEDIUM:
						result *= 1.56;
						break;
					case HIGH:
						result *= 1.73;
						break;

					default:
						break;
					}
				}
			}
		} else if (age >= 60 && age < 75) {
			if (getGender().equals(EGender.MALE))
				if (isPhysicallyActive())
					result *= 1.51;
				else
					result *= 1.40;
			else if (getGender().equals(EGender.FEMALE))
				if (isPhysicallyActive())
					result *= 1.56;
				else
					result *= 1.44;
		} else if (age >= 75 && age < 120) {
			if (getGender().equals(EGender.MALE))
				if (isPhysicallyActive())
					result *= 1.51;
				else
					result *= 1.33;
			else if (getGender().equals(EGender.FEMALE))
				if (isPhysicallyActive())
					result *= 1.56;
				else
					result *= 1.37;
		} else {
			throw new MyAPIException(HttpStatus.NOT_ACCEPTABLE,
					getBirthDay() + " is not a valid value for birthDay, the age range is between 18 e 120");
		}

		setDailyCaloricNeeds(result);

	}

	// formula Keys:
	// MALE: IdealWeight = H^2 * 22,1
	// FEMALE: IdealWeight = H^2 * 20,6
	public void calculateIdealWeight() {
		Double value = getGender().equals(EGender.MALE) ? 22.1 : 20.6;
		Double result = Math.floor(Math.sqrt(getHeightCm() / 100) * value);
		setIdealWeight(result);
	}
}
