package com.open_doc.web_server.modules.authentication.domain;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.open_doc.web_server.modules.authentication.domain.dtos.SignInRequestDTO;
import com.open_doc.web_server.modules.authentication.domain.dtos.SignUpRequestDTO;
import com.open_doc.web_server.modules.authentication.exceptions.UserDoesNotExistOrPasswordMissMatchException;
import com.open_doc.web_server.modules.authentication.repository.AuthenticationEntity;
import com.open_doc.web_server.modules.authentication.repository.AuthenticationRepository;
import com.open_doc.web_server.modules.user.exceptions.UserAlreadyExistsException;
import com.open_doc.web_server.modules.user.repository.UsersEntity;
import com.open_doc.web_server.modules.user.repository.UsersRepository;

@Service
public class AuthenticationService {

    @Autowired
    AuthenticationRepository authRepository;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String signUp(SignUpRequestDTO request) {
        Boolean doesUserExists = usersRepository.existsByEmail(request.email());

        if (doesUserExists) {
            throw new UserAlreadyExistsException("User with email " + request.email() + " already exists");
        }

        UsersEntity user = UsersEntity.builder()
                .name(request.name())
                .email(request.email())
                .build();

        UsersEntity savedUser = usersRepository.save(user);

        AuthenticationEntity auth = AuthenticationEntity.builder()
                .email(request.email())
                .encryptPassword(passwordEncoder.encode(request.password()))
                .user(savedUser)
                .build();

        authRepository.save(auth);

        return "Your JWT here!";
    }

    public String signIn(SignInRequestDTO request) {
        Optional<UsersEntity> userOptional = usersRepository.findByEmail(request.email());

        if (userOptional.isEmpty()) {
            throw new UserDoesNotExistOrPasswordMissMatchException();
        }

        UsersEntity user = userOptional.get();
        AuthenticationEntity auth = authRepository.findByUserId(user.id);

        if (!passwordEncoder.matches(request.password(), auth.encryptPassword)) {
            throw new UserDoesNotExistOrPasswordMissMatchException();
        }

        return "Your JWT here!";
    }

}
