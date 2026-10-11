package com.open_doc.web_server.modules.accounts.services;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.open_doc.web_server.modules.accounts.domain.AccountsEntity;
import com.open_doc.web_server.modules.accounts.domain.SignupLinksEntity;
import com.open_doc.web_server.modules.accounts.domain.enums.AccountRole;
import com.open_doc.web_server.modules.accounts.exceptions.InvalidSignUpLink;
import com.open_doc.web_server.modules.accounts.exceptions.UserDoesNotExistOrPasswordMissMatchException;
import com.open_doc.web_server.modules.accounts.repositories.AccountsRepository;
import com.open_doc.web_server.modules.accounts.repositories.SignupLinksRepository;
import com.open_doc.web_server.modules.accounts.services.dtos.AccountResponseDTO;
import com.open_doc.web_server.modules.accounts.services.dtos.SignInRequestDTO;
import com.open_doc.web_server.modules.accounts.services.dtos.SignUpRequestDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountsRepository accountsRepository;
    private final SignupLinksRepository signUpLinkRepository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public ResponseEntity<String> signUp(SignUpRequestDTO body) {

        SignupLinksEntity inviteLink = signUpLinkRepository.findById(body.sign_up_link())
                .orElseThrow(InvalidSignUpLink::new);

        UserDetails userAuth = accountsRepository.findByEmail(body.email());

        if (userAuth != null)
            throw new UserDoesNotExistOrPasswordMissMatchException();

        String encryptedPassword = new BCryptPasswordEncoder().encode(body.password());

        AccountsEntity newUser = new AccountsEntity(body.name(), body.email(), encryptedPassword, AccountRole.USER);

        signUpLinkRepository.delete(inviteLink);
        accountsRepository.save(newUser);

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

    public List<AccountResponseDTO> listAccounts() {

        List<AccountsEntity> accounts = accountsRepository.findAll();

        return accounts.stream().map((a) -> AccountResponseDTO.builder()
                .id(a.getId())
                .name(a.getName())
                .email(a.getEmail())
                .role(a.getRole())
                .build())
                .toList();
    }
}
