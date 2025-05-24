package com.project.Foodies.in;

import com.project.Foodies.in.Contorller.LoginFilter;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.net.http.HttpRequest;
import java.security.MessageDigest;
import java.util.*;

@Component
public class FoodieCommonCode extends HttpServlet {
    static final Logger LOGGER = LoggerFactory.getLogger(LoginFilter.class);

    private static FoodiesConstants foodiesConstants;

    public FoodieCommonCode(FoodiesConstants foodiesConstants) {
        this.foodiesConstants = foodiesConstants;
    }

    private static SecretKeySpec getKeyFromString(String key) {
        // Use first 16 bytes (128 bits) of the key string for AES
        byte[] keyBytes = new byte[16];
        byte[] parameterKeyBytes = key.getBytes();
        System.arraycopy(parameterKeyBytes, 0, keyBytes, 0, Math.min(parameterKeyBytes.length, keyBytes.length));
        return new SecretKeySpec(keyBytes,foodiesConstants.ALGORITHM);
    }

    public static String encryptpassword(String plainText, String key) throws Exception {
        SecretKeySpec secretKey = getKeyFromString(key);

        Cipher cipher = Cipher.getInstance(foodiesConstants.ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);

        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes("UTF-8"));
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    // Decrypt cipher text
    public static String decrypt(String cipherText, String key) throws Exception {
        SecretKeySpec secretKey = getKeyFromString(key);

        Cipher cipher = Cipher.getInstance(foodiesConstants.ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);

        byte[] decodedBytes = Base64.getDecoder().decode(cipherText);
        byte[] decryptedBytes = cipher.doFinal(decodedBytes);
        return new String(decryptedBytes, "UTF-8");
    }

    public Boolean sendEmail(String email, String subject, String body) throws MessagingException {
        ClassLoader threadClassLoader = Thread.currentThread().getContextClassLoader();

        String hostname = foodiesConstants.SMTP_HOST;
        Integer port = foodiesConstants.SMTP_PORT;
        String mailServerUsername = foodiesConstants.Username;
        String mailServerPassword = foodiesConstants.Password;
        String mailFrom = foodiesConstants.FROM_EMAIL;

        LOGGER.debug("Details: hostname = " + hostname + " port = " + port + " mailFrom = " + mailFrom);

        Properties properties = new Properties();
        properties.put("mail.smtp.host", hostname);
        properties.put("mail.smtp.port", port.toString());
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true"); // Or false if using SSL

        Session sessionObject = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(mailServerUsername, mailServerPassword);
            }
        });

        try {
            MimeMessage message = new MimeMessage(sessionObject);
            message.setFrom(new InternetAddress(mailFrom));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            message.setSubject(subject);
            message.setContent(body, "text/html");

            Transport.send(message);
            LOGGER.debug("✅ Successfully sent email");
            return true;
        } catch (Exception e) {
            LOGGER.error("❌ Error in sending email", e);
        } finally {
            Thread.currentThread().setContextClassLoader(threadClassLoader);
        }
        return false;
    }


    public static SecretKeySpec getSecretKey(String myKey) {
        SecretKeySpec secretKey=null;
        byte[] key;
        MessageDigest sha = null;
        try {
            key = myKey.getBytes("UTF-8");
            sha = MessageDigest.getInstance("SHA-256");
            key = sha.digest(key);
            key = Arrays.copyOf(key, 16);
            secretKey = new SecretKeySpec(key, "AES");
            return secretKey;
        } catch (Exception e) {
            LOGGER.error("Error :",e);
        }
        return secretKey;
    }

    public static String encryptString(String toEncrypt,String instanceKey) {
        try {
            SecretKeySpec secretKey=getSecretKey(instanceKey);
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            return java.util.Base64.getEncoder().encodeToString(cipher.doFinal(toEncrypt.getBytes("UTF-8")));
        } catch (Exception e) {
            LOGGER.debug("Error while encrypting: " + e.toString());
        }
        return null;
    }

    public static String decryptString(String toDecrypt, String instanceKey) {
        try {
            SecretKeySpec secretKey=getSecretKey(instanceKey);
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            return new String(cipher.doFinal(java.util.Base64.getDecoder().decode(toDecrypt)), "UTF-8");
        } catch (Exception e) {
            LOGGER.debug("Error while decrypting: " + e.toString());
        }
        return null;
    }

    public static String verificationForOutOfBandEmail(String username, String status) throws MessagingException {
        String verificationStatus;
        final long TIMEOUT = 1 * 60000;

        Timer timer = new Timer();
        long startTime = System.currentTimeMillis();
        long elapsedTime = System.currentTimeMillis() - startTime;
        if (elapsedTime >= TIMEOUT) {
            verificationStatus = "timeout";
            LOGGER.error("TimeOut Error");
            timer.cancel();
        } else {
            verificationStatus = "Accepted";
            LOGGER.debug("");
        }
        return verificationStatus;
    }

//    public static void createSessionForCustomer(HttpRequest request, String email) {
//        HttpSession session = request.getSession(true); // creates session if not exists
//        session.setAttribute("loggedInCustomer", email);
//    }
}
