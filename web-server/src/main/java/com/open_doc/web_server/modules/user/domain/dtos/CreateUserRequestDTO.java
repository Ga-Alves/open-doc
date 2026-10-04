package com.open_doc.web_server.modules.user.domain.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateUserRequestDTO {

  @NotBlank
  String name;

  @NotBlank
  @Email

  @NotBlank
  String email;

  @NotBlank
  String password;
}
