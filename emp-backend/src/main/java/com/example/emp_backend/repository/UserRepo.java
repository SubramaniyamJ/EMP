package com.example.emp_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.emp_backend.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

	User findUserByEmail(String email);

    User findUserByInstituteNameAndRole(String instituteName, String role);

    // boolean findByUniqueClassCode(String uniqueClassCode);
    
}
