package com.project.stayhealth.business.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.project.stayhealth.auth.entity.Role;
import com.project.stayhealth.auth.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "weightMeasurements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeightMeasurement {

	@Id
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "user_id" , nullable = false)
	private User user;
	private LocalDate date;
	private Double weight;
	
}
