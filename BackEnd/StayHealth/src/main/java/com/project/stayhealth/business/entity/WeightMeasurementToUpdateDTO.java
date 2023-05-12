package com.project.stayhealth.business.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeightMeasurementToUpdateDTO {

	private LocalDate date;

	private Double weight;

}
