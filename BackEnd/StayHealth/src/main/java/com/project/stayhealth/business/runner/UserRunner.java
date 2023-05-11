package com.project.stayhealth.business.runner;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.project.stayhealth.auth.entity.User;
import com.project.stayhealth.business.service.UserService;

@Component
public class UserRunner implements ApplicationRunner {
	@Autowired
	private UserService service;

	@Autowired
	@Qualifier("FakeUserBean")
	ObjectProvider<User> fakeUserBean;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		if (service.findAll().isEmpty())
			createFakeUsers(10);
	}

	private void createFakeUsers(Integer num) {
		for (int i = 0; i < num; i++) {
			service.createUser(fakeUserBean.getObject());
		}
	}
}
