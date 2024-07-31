package com.example.emp_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.example.emp_backend.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

	User findUserByEmail(String email);

    List<User> findUserByRole(String role);

    User findUserByInstituteNameAndRole(String instituteName, String role);

    // boolean findByUniqueClassCode(String uniqueClassCode);
    
}
