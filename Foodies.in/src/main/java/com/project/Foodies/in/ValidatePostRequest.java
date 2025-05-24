package com.project.Foodies.in;

import com.project.Foodies.in.Contorller.WebController;
import com.project.Foodies.in.Entity.customer;
import com.project.Foodies.in.Repository.CustomerRepository;
import com.project.Foodies.in.dto.customerService;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.*;

@Component
public class ValidatePostRequest {
    private static final Logger LOGGER = LoggerFactory.getLogger(ValidatePostRequest.class);
    public static boolean customerSignup;

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private customerService customerService;
    @Autowired
    private FoodiesConstants foodiesConstants;
    @Autowired
    private FoodieCommonCode foodieCommonCode;

    public ValidatePostRequest(customerService customerService,CustomerRepository customerRepository
    ,FoodiesConstants foodiesConstants,FoodieCommonCode foodieCommonCode) {
        this.customerService = customerService;
        this.customerRepository = customerRepository;
        this.foodiesConstants = foodiesConstants;
        this.foodieCommonCode = foodieCommonCode;
    }


    public Boolean customerSignup(customer customer) throws UnsupportedEncodingException, MessagingException {
        LOGGER.debug("ValidatePostRequest: customerSignup called");
        Random random = new Random();
        List<customer> customersList =  customerService.getcustomerbyemail(customer.getEmailId());
        LOGGER.debug("ValidatePostRequest: customerSignup called" + customersList.size());
        LOGGER.debug("ValidatePostRequest: customerSignup called " + customerRepository.existsByEmailId(customer.getEmailId()));
        Calendar calendar = Calendar.getInstance();
        long timeMilliSecs = calendar.getTimeInMillis();
        Date newdate = new Date(timeMilliSecs);
        if(customersList.isEmpty()){
            LOGGER.debug("Add customer to list");
            String Id = String.valueOf(random.nextInt(10000) + 1);
            String encryptpassword = "";
            try {
                encryptpassword = FoodieCommonCode.encryptpassword(customer.getPassword(), FoodiesConstants.key);
            }catch (Exception e){
                LOGGER.error("Error in encryptpassword " ,e);
            }
            customerService.addCustomer(Id,customer.getFullName(),customer.getEmailId(),encryptpassword,customer.getMobileNumber(),customer.getAddress(),customer.getImage(),newdate);
            String Subject = "Account Successfully Registered On Foodies.in";

            String randKey = String.valueOf(UUID.randomUUID());
            String tokenGenerationTimeStamp = String.valueOf(System.currentTimeMillis());
            StringBuffer userToken = new StringBuffer(customer.getEmailId());
            userToken.append(";");
            userToken.append(randKey);
            userToken.append(";");
            userToken.append(tokenGenerationTimeStamp);

            String encryptedToken = foodieCommonCode.encryptString(String.valueOf(userToken), foodiesConstants.key);
            String token = URLEncoder.encode(encryptedToken,"UTF-8");
            String VerifyURL = foodiesConstants.baseURL + "/api/verification?status=approved&token="+token;
            String subject = "Verify Successfully Registered On Foodies.in";
            String body = foodiesConstants.AccountVerificationTemplate;
            body = body.replace("$$username$$", customer.getFullName());
            body = body.replace("$$ip$$","10.10.10.10");
            body = body.replace("$$VerifyURL$$", VerifyURL);
            LOGGER.debug("Subject: " + subject + " Body: " + body);
            Boolean isEmailSend = foodieCommonCode.sendEmail(customer.getEmailId(),subject,body);
            return isEmailSend;
        }else{
            LOGGER.debug("Customer is already registered!");
        }
        return false;
    }
}
