package com.example.emp_backend.utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.example.emp_backend.repository.UserRepo;
import com.example.emp_backend.model.Department;
import com.example.emp_backend.model.User;
import com.example.emp_backend.model.VerifyUser;

import java.util.*;;

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
                "student_id INT NOT NULL, " +
                "reg_no VARCHAR(255) , " +
                "student_name VARCHAR(255) NOT NULL," +
                "student_email VARCHAR(255) NOT NULL, "+
                "student_department_id BIGINT ," +
                "student_gender VARCHAR(255), "+
                "student_dob VARCHAR(255), "+
                "student_phone_no VARCHAR(255), "+
                "student_address VARCHAR(255), "+
                "student_specializations VARCHAR(255), "+
                "student_class_id BIGINT , "+
                "student_doj VARCHAR(255), "+
                "PRIMARY KEY (student_id));";

        String queryDept = "CREATE TABLE IF NOT EXISTS " + instituteName + "_departments" + " (" +
                            "department_Id INT NOT NULL, "+ 
                            "department_name VARCHAR(255) NOT NULL, " +
                            "department_incharge_name VARCHAR(255) , " + 
                            "department_incharge_id INT , "+
                            "PRIMARY KEY (department_Id)); ";

        String queryClass = "CREATE TABLE IF NOT EXISTS " + instituteName + "_classes" + " (" + 
                            "class_id INT NOT NULL, "+
                            "class_name VARCHAR(255) NOT NULL, "+
                            "class_incharge_name VARCHAR(255) , "+
                            "class_incharge_id INT , ";

        String queryRequest= "CREATE TABLE IF NOT EXISTS " + instituteName + "_requests" + " ("+
                             "email VARCHAR(255) NOT NULL, " +
                             "verified BOOLEAN NOT  NULL, " +
                             "PRIMARY KEY (email)); ";


        jdbcTemplate.execute(queryFaculty);
        jdbcTemplate.execute(queryStudent);
        jdbcTemplate.execute(queryDept);
        jdbcTemplate.execute(queryRequest);

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
    public boolean addStudents(User student){
        try{
            String tableName=(student.instituteName) + "_students";
            String nquery="INSERT INTO " + tableName + " (student_id, student_name, student_email) VALUES (?, ?, ?)";
            jdbcTemplate.update(nquery, student.id,student.name,student.email);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    public boolean createdept(Department dept){
        try{
            String tableName=(dept.instituteName) + "_departments";
            String nquery="INSERT INTO "+ tableName + " (department_Id, department_name, department_incharge_name, department_incharge_id) VALUES(?, ?, ?, ?)";
            jdbcTemplate.update(nquery,dept.dept_id,dept.dept_name,dept.dept_incharge_name,dept.dept_incharge_id);
            return true;
        }catch(Exception e){
           
            return false;
        }
    }
    public boolean addRequest(String instituteName,VerifyUser user){
        try{
            String tableName=instituteName + "_requests";
            String query="INSERT INTO "+ tableName + " (email, verified) VALUES(?,?)";
            jdbcTemplate.update(query,user.email,user.verified);
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
    public List<?> existedDepartments(String instituteName){
        String tableName=instituteName + "_departments";
        String query = "SELECT * FROM " + tableName;
        List<Map<String,Object>> deptList=jdbcTemplate.queryForList(query);
        return deptList;
    }
    public List<?> checkverifiedstatus(String email,String instituteName){
        String tableName=instituteName + "_requests";
        String query="SELECT verified FROM "+ tableName +" WHERE email=?";
        List<Map<String,Object>> verified=jdbcTemplate.queryForList(query,email);
        return verified;
    }
    public void updateVerifyStatus(String email,String instituteName){  
        String tableName=instituteName + "_requests";
        String updateQuery="UPDATE "+tableName+" SET verified = TRUE WHERE email=?";
        jdbcTemplate.update(updateQuery,email);      
    }
    

}