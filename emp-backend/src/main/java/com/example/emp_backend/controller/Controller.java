package com.example.emp_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.emp_backend.model.User;
import com.example.emp_backend.repository.UserRepo;
import com.example.emp_backend.utility.Utility;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
@RestController
public class Controller {
    @Autowired
    private UserRepo repo;

    @Autowired
    private Utility util;

    @PostMapping("/postuser")
    boolean postuser(@RequestBody User user){

        User userWithSameEmail = repo.findUserByEmail(user.email);
        if(userWithSameEmail != null){
            return false;
        }
        if(user.role.equals("admin")){
            User adminWithSameInstitueName = repo.findUserByInstituteNameAndRole(user.instituteName, "admin");
            if(adminWithSameInstitueName != null){
                return false;
            }
            util.createInstituteTable(user.instituteName);
        }
        repo.save(user);
        return true;
    }

    @GetMapping("/checkuser")
    User checkStudentUser(@RequestParam String email, @RequestParam String password, @RequestParam String role){
        User user = repo.findUserByEmail(email);
        if(user != null){
            if(user.password.equals(password) && user.role.equals(role)){
                return user;
            }       
        }
        return null;
    }


}
