package com.project.stayhealth.business.configuration;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.github.javafaker.Faker;
import com.project.stayhealth.auth.entity.ERole;
import com.project.stayhealth.auth.entity.Role;
import com.project.stayhealth.auth.entity.User;
import com.project.stayhealth.auth.repository.RoleRepository;
import com.project.stayhealth.business.entity.EGender;
import com.project.stayhealth.business.entity.EPhysicalActivityLevel;

@Configuration
public class UserConfig {

	@Autowired
	private RoleRepository roleRepository;

	private Faker fake = Faker.instance(new Locale("it-IT"));

	@Bean("FakeUserBean")
	@Scope("prototype")
	public User createFakeUser() {
		String firstname = fake.name().firstName();
		String lastname = fake.name().lastName();
		Integer random = (int) Math.floor(Math.random() * 10);// random number between 0 and 9

		Set<Role> roles = new HashSet<Role>();

		Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).get();
		roles.add(userRole);

		User newUser = User.builder().firstName(firstname).lastName(lastname)
				.birthDay(LocalDate.now().minusYears(fake.number().numberBetween(20, 80))
						.minusWeeks(fake.number().numberBetween(1, 20)))
				.weightKg((double) fake.number().numberBetween(45, 100))
				.heightCm((double) fake.number().numberBetween(140, 200))
				.gender(random % 2 == 0 ? EGender.MALE : EGender.FEMALE) // 50% MALE and 50% FEMALE
				.physicalActivityLevel(random % 2 == 0 ? EPhysicalActivityLevel.LOW
						: random % 3 == 0 ? EPhysicalActivityLevel.MEDIUM : EPhysicalActivityLevel.HIGH)
				.physicallyActive(random % 2 == 0 ? true : false).username(lastname + fake.number().randomDigit())
				.roles(roles).email(firstname.substring(0, 1) + "." + lastname + "@mail.it")
				.password(fake.funnyName().name().replace(" ", "") + fake.number().randomNumber()).build();

		newUser.calculateDailyCaloricNeeds();

		return newUser;

	}
}
