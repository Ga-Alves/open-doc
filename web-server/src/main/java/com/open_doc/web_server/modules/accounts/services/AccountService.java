package com.open_doc.web_server.modules.accounts.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.open_doc.web_server.modules.accounts.domain.AccountsEntity;
import com.open_doc.web_server.modules.accounts.domain.enums.AccountRole;
import com.open_doc.web_server.modules.accounts.repositories.AccountsRepository;
import com.open_doc.web_server.modules.accounts.services.dtos.SignInRequestDTO;
import com.open_doc.web_server.modules.accounts.services.dtos.SignUpRequestDTO;

@Service
public class AccountService {

    @Autowired
    private AccountsRepository userAuthRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public ResponseEntity<String> signUp(SignUpRequestDTO body) {
        UserDetails userAuth = userAuthRepository.findByEmail(body.email());

        if (userAuth != null)
            return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(body.password());

        AccountsEntity newUser = new AccountsEntity(body.name(), body.email(), encryptedPassword, AccountRole.USER);

        userAuthRepository.save(newUser);

        String authToken = tokenService.generateToken(newUser);

        return ResponseEntity.ok().body(authToken);
    }

    public String signIn(SignInRequestDTO body) {

        var password = new UsernamePasswordAuthenticationToken(body.email(), body.password());

        var auth = this.authenticationManager.authenticate(password);

        AccountsEntity user = (AccountsEntity) auth.getPrincipal();

        String jwt = tokenService.generateToken(user);

        return jwt;
    }
}
