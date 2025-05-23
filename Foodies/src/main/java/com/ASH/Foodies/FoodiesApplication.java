package com.ASH.Foodies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan // This enables @WebServlet detection
public class FoodiesApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodiesApplication.class, args);
	}

}
