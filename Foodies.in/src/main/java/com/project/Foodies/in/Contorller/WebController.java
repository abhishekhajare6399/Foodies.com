package com.project.Foodies.in.Contorller;


import com.project.Foodies.in.Entity.customer;
import com.project.Foodies.in.FoodieCommonCode;
import com.project.Foodies.in.FoodiesConstants;
import com.project.Foodies.in.Repository.CustomerRepository;
import com.project.Foodies.in.ValidatePostRequest;
import com.project.Foodies.in.dto.customerService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // allow React to call this API
public class WebController {
    private static final Logger LOGGER = LoggerFactory.getLogger(WebController.class);
    private final CustomerRepository customerRepository;
    private final customerService customerService;
    private ValidatePostRequest validatePostRequest;

    public WebController(ValidatePostRequest validatePostRequest, CustomerRepository customerRepository, customerService customerService) {
        this.validatePostRequest = validatePostRequest;
        this.customerRepository = customerRepository;
        this.customerService = customerService;
    }

    @GetMapping("/api/hello")
    public String sayHello(HttpSession httpSession) {
        LOGGER.trace("This is a TRACE message – very detailed debug info");
        LOGGER.debug("This is a DEBUG message – for debugging");
        LOGGER.info("This is an INFO message – general application flow");
        LOGGER.warn("This is a WARN message – something unexpected but not an error");
        LOGGER.error("This is an ERROR message – something went wrong");
        LOGGER.debug("dsaxzwdasxz sazcx " + httpSession.getAttribute("loggedInCustomer"));
        return "Hello from Spring Boot!";
    }

    // New signup API
    @PostMapping("/api/customers/signup")
    public ResponseEntity<String> signup(@RequestBody customer customer) throws MessagingException, UnsupportedEncodingException {
        LOGGER.debug("customer: {}", customer);
        if (customer == null) {
            LOGGER.error("Customer is null!");
            return ResponseEntity.ok("error");
        }
        LOGGER.debug("Add New Customer Details" + customer.getEmailId() + " mobile number " + customer.getMobileNumber());
        if(validatePostRequest.customerSignup(customer)){
            LOGGER.error("Customer is registered successfully!");
        }else{
            LOGGER.debug("Customer is registered Not successfully!");
        }
        return ResponseEntity.ok("success");

    }
    @GetMapping("api/verification")
    public ResponseEntity<String> verifyAccount(
            @RequestParam String status,
            @RequestParam String token,
            HttpServletRequest request) throws MessagingException {
            LOGGER.debug("status: {}", status);
            LOGGER.debug("token: {}", token);
            String cookieValue = FoodieCommonCode.decryptString(token, FoodiesConstants.key);
            LOGGER.debug("cookieValue: {}", cookieValue);
            String email = cookieValue.split(";")[0];
            String Customerstatus = FoodieCommonCode.verificationForOutOfBandEmail(email,status);
            if(Customerstatus.equals("Accepted")){
                customerService.updateCustomerStatus(email,Customerstatus);
//                FoodieCommonCode.createSessionForCustomer(request,email); // or customer object (better to keep minimal info)
            }
            return ResponseEntity.ok(cookieValue);
    }

    @GetMapping("/auth/status")
    public ResponseEntity<?> authStatus(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // don't create if doesn't exist
        if (session != null && session.getAttribute("loggedInCustomer") != null) {
            return ResponseEntity.ok().body(Map.of(
                    "authenticated", true,
                    "email", session.getAttribute("loggedInCustomer")
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("authenticated", false));
        }
    }



}