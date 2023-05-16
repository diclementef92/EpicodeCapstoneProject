package com.project.stayhealth.business.runner;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.project.stayhealth.business.entity.Food;
import com.project.stayhealth.business.service.FoodService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class FoodRunner implements ApplicationRunner {
	@Autowired
	private FoodService service;

	@Autowired
	@Qualifier("FakeFoodBean")
	ObjectProvider<Food> fakeFoodBean;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		if (service.findAll().isEmpty()) {
//			for (int i = 0; i < 50; i++) {
//				service.createFood(fakeFoodBean.getObject());
//			}
			service.importFoods();
			log.info("fake foods created");
		}

	}

}
