package com.open_doc.web_server.modules.accounts.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.open_doc.web_server.modules.accounts.domain.SignupLinksEntity;
import com.open_doc.web_server.modules.accounts.services.AccountService;
import com.open_doc.web_server.modules.accounts.services.SignupLinksService;
import com.open_doc.web_server.modules.accounts.services.dtos.AccountResponseDTO;
import com.open_doc.web_server.modules.accounts.services.dtos.SignInRequestDTO;
import com.open_doc.web_server.modules.accounts.services.dtos.SignUpLinkResponseDTO;
import com.open_doc.web_server.modules.accounts.services.dtos.SignUpRequestDTO;
import com.open_doc.web_server.modules.shared.Constants;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/accounts")
public class AccountsController {

    final AccountService accountService;
    final SignupLinksService signupLinksService;

    @PostMapping("/sign-up")
    public ResponseEntity<String> signUp(@RequestBody @Valid SignUpRequestDTO body) {
        return accountService.signUp(body);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<String> signIn(@RequestBody @Valid SignInRequestDTO body, HttpServletResponse response) {
        String jwt = accountService.signIn(body);

        Cookie jwtCookie = new Cookie(Constants.TOKEN, jwt);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setMaxAge(60 * 60 * 24);
        jwtCookie.setAttribute("SameSite", "Strict");
        jwtCookie.setPath("/");

        response.addCookie(jwtCookie);

        return ResponseEntity.ok(null);
    }

    @PostMapping("/sign-up/link")
    public SignUpLinkResponseDTO createSignupLink() {
        SignupLinksEntity entity = signupLinksService.createSignUpLink();
        return SignUpLinkResponseDTO.from(entity);
    }

    @GetMapping()
    public List<AccountResponseDTO> listAccounts() {
        return accountService.listAccounts();
    }
}
