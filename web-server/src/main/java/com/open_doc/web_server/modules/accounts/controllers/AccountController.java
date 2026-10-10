package com.open_doc.web_server.modules.accounts.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.open_doc.web_server.modules.accounts.services.AccountService;
import com.open_doc.web_server.modules.accounts.services.dtos.SignInRequestDTO;
import com.open_doc.web_server.modules.accounts.services.dtos.SignUpRequestDTO;
import com.open_doc.web_server.modules.shared.Constants;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    @Autowired
    AccountService authenticationService;

    @PostMapping("/sign-up")
    public ResponseEntity<String> signUp(@RequestBody @Valid SignUpRequestDTO body) {
        return authenticationService.signUp(body);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<String> signIn(@RequestBody @Valid SignInRequestDTO body, HttpServletResponse response) {
        String jwt = authenticationService.signIn(body);

        Cookie jwtCookie = new Cookie(Constants.TOKEN, jwt);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setMaxAge(60 * 60 * 24);
        jwtCookie.setAttribute("SameSite", "Strict");
        jwtCookie.setPath("/");

        response.addCookie(jwtCookie);

        return ResponseEntity.ok(null);
    }

}
