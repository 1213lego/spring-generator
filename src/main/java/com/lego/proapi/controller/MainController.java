package com.lego.proapi.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
public class MainController {
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/admin")
    public String admin() {
        return "ADMIN";
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/user")
    public String user() {
        return "USER";
    }

    @PreAuthorize("hasRole('USER') and hasRole('ADMIN')")
    @GetMapping(value = "/user-admin")
    public String userAndAdmin() {
        return "ADMIN";
    }

}
