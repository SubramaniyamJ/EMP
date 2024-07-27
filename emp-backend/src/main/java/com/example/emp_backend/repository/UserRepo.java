package com.example.emp_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.emp_backend.model.StudentUser;

@Repository
public interface UserRepo extends JpaRepository<StudentUser, Integer> {

	StudentUser findStudentUserByEmail(String email);
    
}
