package com.project.Foodies.in.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers")
public class customers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="fullName")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "mobileNumber", unique = true, nullable = false)
    private String phone;

    @Column(name = "email_id", unique = true, nullable = false)
    private String email;
    private String image;
    private String password;
}
