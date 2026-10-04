package com.open_doc.web_server.modules.user.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.open_doc.web_server.modules.user.domain.dtos.CreateUserRequestDTO;
import com.open_doc.web_server.modules.user.domain.dtos.UserResponseDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

  @PostMapping()
  UserResponseDTO createUser(@RequestBody @Valid CreateUserRequestDTO user) {

    UserResponseDTO response = new UserResponseDTO();
    response.setUserID("123");

    return response;

  }

}
