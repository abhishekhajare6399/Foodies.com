package com.project.Foodies.in;

import org.springframework.stereotype.Component;

@Component
public class FoodiesConstants {
    public static final String baseURL = "http://localhost:8080";
    public static final String ALGORITHM = "AES";
    public static final String key = "mySecretKey12345";
    public static final String SMTP_HOST = "smtp.gmail.com";
    public static final int SMTP_PORT = 587;
    public static final String SMTP_AUTH = "true";
    public static final String FROM_EMAIL = "abhishekhajare088@gmail.com";
    public static final String Username = "abhishekhajare088@gmail.com";
    public static final String Password = "gkgv jmqr srsa pahe";
    public static final String AccountVerificationTemplate =
            "Dear $$username$$,<br><br>" +
                    "A 2FA authentication request was initiated for your Atlassian account from $$ip$$ IP address.<br><br>" +
                    "Click on APPROVE to verify and grant access. If this wasn't you, click on DENY to restrict access.<br><br>" +
                    "<h3><a href=\"$$VerifyURL$$\" target=\"_self\">Verify Account</a></h3>" +
                    "Thank you,<br>" +
                    "miniOrange";

}
