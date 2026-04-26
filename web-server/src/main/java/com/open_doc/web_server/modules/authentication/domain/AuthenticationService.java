package com.open_doc.web_server.modules.authentication.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.open_doc.web_server.modules.authentication.domain.dtos.SignInRequestDTO;
import com.open_doc.web_server.modules.authentication.domain.dtos.SignUpRequestDTO;
import com.open_doc.web_server.modules.authentication.domain.enums.UserRole;
import com.open_doc.web_server.modules.authentication.repository.UserAuthEntity;
import com.open_doc.web_server.modules.authentication.repository.UserAuthRepository;

@Service
public class AuthenticationService {

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public ResponseEntity<String> signUp(SignUpRequestDTO body) {
        UserDetails userAuth = userAuthRepository.findByEmail(body.email());

        if (userAuth != null)
            return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(body.password());

        UserAuthEntity newUser = new UserAuthEntity(body.name(), body.email(), encryptedPassword, UserRole.USER);

        userAuthRepository.save(newUser);

        String authToken = tokenService.generateToken(newUser);

        return ResponseEntity.ok().body(authToken);
    }

    public String signIn(SignInRequestDTO body) {

        var password = new UsernamePasswordAuthenticationToken(body.email(), body.password());

        var auth = this.authenticationManager.authenticate(password);

        UserAuthEntity user = (UserAuthEntity) auth.getPrincipal();

        String jwt = tokenService.generateToken(user);

        return jwt;
    }
}
