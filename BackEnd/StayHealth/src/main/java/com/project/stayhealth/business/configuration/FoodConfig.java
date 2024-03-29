package com.project.stayhealth.business.configuration;

import java.util.Locale;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.github.javafaker.Faker;
import com.project.stayhealth.business.entity.Food;

@Configuration
public class FoodConfig {

	private String[] foodGroups = { "Vegetable", "Fruit", "Dairy Product", "Meat Product" };
	private Faker fake = Faker.instance(new Locale("it-IT"));

	@Bean("FakeFoodBean")
	@Scope("prototype")
	public Food createFakeFood() {

		Food randomFood = Food.builder().description(fake.food().ingredient().toString())
				.groupDescr(foodGroups[fake.number().numberBetween(0, foodGroups.length)])
				.kCal(fake.number().randomDouble(0, 0, 800)).build();

		return randomFood;

	}
}
