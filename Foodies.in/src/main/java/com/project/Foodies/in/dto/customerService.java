package com.project.Foodies.in.dto;

import com.project.Foodies.in.Entity.customer;
import jakarta.transaction.Transactional;

import java.util.Date;
import java.util.List;

@Transactional
public interface customerService {

    void addCustomer(String id, String fullName, String email, String password, String mobile, String address, String image, Date date);

    void updateCustomer(String fullName, String email, String password, String mobile, String address,String image);

    void deleteCustomer(String id);

    void updateCustomerStatus(String email, String status);

    List<customer> getcustomerbyemail(String email);

    List<customer> getcustomersbyid(String id);

    List<customer> getcustomerbyname();

    List<customer> getallcustomers();
}
