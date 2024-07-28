package com.example.emp_backend.config;

import com.example.emp_backend.utility.Utility;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public Utility utility() {
        return new Utility();
    }
}
