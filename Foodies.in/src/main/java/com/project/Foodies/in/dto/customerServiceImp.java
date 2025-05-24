package com.project.Foodies.in.dto;

import com.project.Foodies.in.Entity.customer;
import com.project.Foodies.in.Repository.CustomerRepository;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class customerServiceImp implements customerService {
    private static final Log LOGGER = LogFactory.getLog(customerServiceImp.class);
    private Date period;
    private String auditLogUsernameSearchKeyword;
    private String auditLogIp;

    @Autowired
    private CustomerRepository customerRepository;

    public customerServiceImp(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    public void addCustomer(String id,String fullName, String email, String password, String mobile, String address, String image,Date date) {
        final customer customer = new customer();
        customer.setId(id);
        customer.setFullName(fullName);
        customer.setEmailId(email);
        customer.setPassword(password);
        customer.setMobileNumber(mobile);
        customer.setAddress(address);
        customer.setImage(image);
        customer.setDate(date);
        customer.setAccountStatus("Inactive");
        customerRepository.save(customer);
    }

    @Override
    @Transactional
    public void updateCustomerStatus(String email, String status) {
        customerRepository.updateCustomerStatus(email, status);
    }



    @Override
    public void updateCustomer(String fullName, String email, String password, String mobile, String address, String image) {

    }

    @Override
    public void deleteCustomer(String id) {

    }

    @Override
    public List<customer> getcustomerbyemail(String email) {
        return List.of();
    }

    @Override
    public List<customer> getcustomersbyid(String id) {
        return List.of();
    }

    @Override
    public List<customer> getcustomerbyname() {
        return List.of();
    }

    @Override
    public List<customer> getallcustomers() {
        return List.of();
    }
}
