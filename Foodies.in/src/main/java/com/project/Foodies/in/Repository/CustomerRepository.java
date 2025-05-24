package com.project.Foodies.in.Repository;

import com.project.Foodies.in.Entity.customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<customer, String> {
    Optional<customer> findByEmailId(String emailId);
    Optional<customer> findByMobileNumber(String mobileNumber);
    List<customer> findByFullNameContainingIgnoreCase(String fullName);
    boolean existsByEmailId(String emailId);
    boolean existsByMobileNumber(String mobileNumber);
    @Modifying
    @Query("UPDATE customer c SET c.accountStatus = :status WHERE c.emailId = :email")
    void updateCustomerStatus(@Param("email") String email, @Param("status") String status);

}
