package com.example.emp_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class StudentUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    public String name;
    public String email;
    public String password;
    public String instituteName;
}
