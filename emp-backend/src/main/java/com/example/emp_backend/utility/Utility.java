package com.example.emp_backend.utility;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.example.emp_backend.repository.UserRepo;
import com.example.emp_backend.model.User;
import java.util.*;

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
                "faculty_id INT NOT NULL, " +
                "faculty_name VARCHAR(255) NOT NULL," +
                "faculty_email VARCHAR(255) NOT NULL, "+
                "faculty_department_id BIGINT, " +
                "faculty_class_id BIGINT," +
                "faculty_gender VARCHAR(255) , "+
                "faculty_dob VARCHAR(255) , "+
                "faculty_phone_no VARCHAR(255) , "+
                "faculty_address VARCHAR(255) , "+
                "faculty_specializations VARCHAR(255) , "+
                "faculty_doj VARCHAR(255) , "+
                "PRIMARY KEY (faculty_id));";

        String queryStudent = "CREATE TABLE IF NOT EXISTS " + instituteName + "_students" + " (" +
                "student_id BIGINT, " +
                "reg_no VARCHAR(255) NOT NULL, " +
                "student_name VARCHAR(255) NOT NULL," +
                "student_email VARCHAR(255) NOT NULL, "+
                "student_department_id BIGINT ," +
                "student_gender VARCHAR(255), "+
                "student_dob VARCHAR(255), "+
                "student_phone_no VARCHAR(255), "+
                "student_address VARCHAR(255), "+
                "student_specializations VARCHAR(255), "+
                "student_class_id BIGINT NOT NULL, "+
                "student_doj VARCHAR(255), "+
                "PRIMARY KEY (student_id));";

        String queryDept = "CREATE TABLE IF NOT EXISTS " + instituteName + "_departments" + " (" +
                            "department_Id BIGINT AUTOINCREAMENT, "+ 
                            "department_name VARCHAR(255) NOT NULL, " +
                            "department_incharge VARCHAR(255) NOT NULL" + 
                            "department_incharge_id BIGINT NOT NULL, "+
                            // "batch_year VARCHAR(255) NOT NULL, " + 
                            "PRIMARY KEY (department_id), "+
                            "";

        String queryClass = "CREATE TABLE IF NOT EXISTS " + instituteName + "_classes" + " (" + 
                            "class_id BIGINT AUTOINCREAMENT, "+
                            "class_name VARCHAR(255) NOT NULL, "+
                            "class_incharge VARCHAR(255) NOT NULL, "+
                            "faculty_in_charge_id BIGINT NOT NULL, ";


        jdbcTemplate.execute(queryFaculty);
        jdbcTemplate.execute(queryStudent);
        // jdbcTemplate.execute(queryDept);

    }

    public boolean addTeachers(User faculty){  
        try{
            String tableName = (faculty.instituteName) + "_faculties";
            String nquery = "INSERT INTO " + tableName + " (faculty_id, faculty_name, faculty_email) VALUES (?, ?, ?)";
            jdbcTemplate.update(nquery, faculty.id, faculty.name, faculty.email);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    public List<User> checkFacultyAlreadyAdded(List<User>users, String instituteName){
        List<User>nonAddedFaculties = new ArrayList<>();
        String tableName = instituteName + "_faculties";
        for(User user : users){
            String query = "SELECT COUNT(*) FROM " + tableName + " WHERE faculty_email = ?";
            Integer count = jdbcTemplate.queryForObject(query, new Object[]{user.getEmail()}, Integer.class);

            if(count == null || count == 0){    
                nonAddedFaculties.add(user);
            }
        }
        return nonAddedFaculties;
    }

    public List<?> managedFacultiesList(String instituteName){
        String tableName = instituteName + "_faculties";
        String query = "SELECT * FROM " + tableName;
        List<Map<String, Object>> facultyList = jdbcTemplate.queryForList(query);
        return facultyList;

    }

}
