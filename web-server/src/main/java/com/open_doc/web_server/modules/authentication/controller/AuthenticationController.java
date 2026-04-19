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
    public ResponseEntity<String> signIn(@RequestBody @Valid SignInRequestDTO body) {
        return authenticationService.signIn(body);
    }

}
