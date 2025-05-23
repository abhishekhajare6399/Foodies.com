package com.ASH.Foodies;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/twofactor/performbrowserlogin")
    public String performBrowserLogin(Model model) {
        model.addAttribute("msg", "Perform browser login using 2FA");
        return "performbrowserlogin";  // maps to templates/performbrowserlogin.html
    }

    @GetMapping("/twofactor/setup")
    public String setupPage(Model model) {
        model.addAttribute("msg", "Setup your two-factor authentication");
        return "setup";  // maps to templates/setup.html
    }

    // You can add more mappings if needed
}