package com.open_doc.web_server.modules.authentication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.open_doc.web_server.modules.authentication.domain.AuthenticationService;
import com.open_doc.web_server.modules.authentication.domain.dtos.SignInRequestDTO;
import com.open_doc.web_server.modules.authentication.domain.dtos.SignUpRequestDTO;
import com.open_doc.web_server.modules.shared.Constants;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public ResponseEntity<String> signUp(@RequestBody @Valid SignUpRequestDTO body) {
        return authenticationService.signUp(body);
    }
    @PostMapping("/sign-in")
    public ResponseEntity<String> signIn(@RequestBody @Valid SignInRequestDTO body, HttpServletResponse response) {
        String jwt = authenticationService.signIn(body);

        Cookie jwtCookie = new Cookie(Constants.TOKEN, jwt);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setMaxAge(60*60*2);
        jwtCookie.setAttribute("SameSite", "Strict");
        jwtCookie.setPath("/");

        response.addCookie(jwtCookie);

        return ResponseEntity.ok(null);
    }

}
