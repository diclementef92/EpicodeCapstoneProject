package com.project.stayhealth.business.service;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvValidationException;
import com.project.stayhealth.auth.exception.ResourceNotFoundException;
import com.project.stayhealth.business.entity.Food;
import com.project.stayhealth.business.repository.FoodRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FoodService {
	@Autowired
	FoodRepository foodRepository;

	@Value("${app.foods.csvFilePath}")
	private String fileName;

	public void importFoodsFromCSVFile() throws IOException, FileNotFoundException, CsvValidationException {
//		String fileName = "src\\main\\resources\\foods-complete_mod.csv";

		try (CSVReader reader = new CSVReaderBuilder(new FileReader(fileName)).withSkipLines(1).build()) {
			String[] lineInArray = reader.readNext();

			while (lineInArray != null) {
//				System.out.println(lineInArray[1] + " - " + lineInArray[2] + " - " + lineInArray[3]);
				Food food = Food.builder().description(lineInArray[1]).groupDescr(lineInArray[2])
						.kCal(Double.parseDouble((lineInArray[3].equals("") ? "0" : lineInArray[3]))).build();

				foodRepository.save(food);

				lineInArray = reader.readNext();
			}
		}

	}

	public Food createFood(Food food) {
		return foodRepository.save(food);
	}

	public List<Food> findAll() {
		return foodRepository.findAll();
	}

	public Food findByID(Long id) {
		return foodRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Food", "id", id));
	}

	public List<Food> findByDescriptionLike(String name) {
		return foodRepository.findByDescriptionLike(name)
				.orElseThrow(() -> new ResourceNotFoundException("Food", "name", name));

	}

}
