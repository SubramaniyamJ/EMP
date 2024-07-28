package com.example.emp_backend.utility;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.example.emp_backend.repository.UserRepo;

public class Utility {

    @Autowired
    private UserRepo repo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    String candites = "ABCDEFGHIJKLMNOPQRSTUVYXZabcdefghijklmnopqrstuvxyz1234567890";
    public String tryCode(){
        StringBuilder s = new StringBuilder(candites);
        Random random = new Random();
        int len = candites.length();
        for(int i = 0; i < 8; i++){
            s.append(candites.charAt(random.nextInt(len)));
        }
        return s.toString();


    }

    // public String generateClassCode(){
    //     String uniqueClassCode = "";
    //     do{
    //         uniqueClassCode = tryCode();
    //     }while(repo.findByUniqueClassCode(uniqueClassCode));
    //     return uniqueClassCode;
    // }

    public void createInstituteTable(String instituteName){
        String queryFaculty = "CREATE TABLE IF NOT EXISTS " + instituteName + "_faculties" + " (" +
                "faculty_id BIGINT, " +
                "facult_name VARCHAR(255) NOT NULL," +
                "faculty_email VARCHAR(255) NOT NULL, "+
                "faculty_gender VARCHAR(255) , "+
                "faculty_dob VARCHAR(255) , "+
                "faculty_phone_no VARCHAR(255) , "+
                "faculty_address VARCHAR(255) , "+
                "faculty_specializations VARCHAR(255) , "+
                "faculty_doj VARCHAR(255) , "+
                "PRIMARY KEY (faculty_id))";
        String queryStudent = "CREATE TABLE IF NOT EXISTS " + instituteName + "_students" + " (" +
                "student_id BIGINT, " +
                "reg_no VARCHAR(255) NOT NULL, " +
                "student_name VARCHAR(255) NOT NULL," +
                "student_email VARCHAR(255) NOT NULL, "+
                "student_gender VARCHAR(255), "+
                "student_dob VARCHAR(255), "+
                "student_phone_no VARCHAR(255), "+
                "student_address VARCHAR(255), "+
                "student_specializations VARCHAR(255), "+
                "student_doj VARCHAR(255), "+
                "PRIMARY KEY (student_id))";

        jdbcTemplate.execute(queryFaculty);
        jdbcTemplate.execute(queryStudent);


    }


}
