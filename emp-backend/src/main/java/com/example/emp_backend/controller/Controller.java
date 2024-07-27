package com.example.emp_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Reference;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.emp_backend.model.StudentUser;
import com.example.emp_backend.repository.UserRepo;

import ch.qos.logback.classic.spi.STEUtil;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
@RestController
public class Controller {
    @Autowired
    private UserRepo repo;
    

    @PostMapping("/poststudentuser")
    public StudentUser postStudentUser(@RequestBody StudentUser studentUser){
        return repo.save(studentUser);
    }

    @GetMapping("/checkstudentlogin")
    public boolean checkStudentUser(@RequestParam String email, @RequestParam String password){
        StudentUser user = repo.findStudentUserByEmail(email);
        if(user != null){
            if((user.password).equals(password)){
                return true;
            }
        }
        return false;

    }


}
