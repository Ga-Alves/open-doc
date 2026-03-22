package com.open_doc.web_server.modules.authentication.domain.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignInRequestDTO(
                @NotBlank String password,

                @Email @NotBlank String email) {

}
