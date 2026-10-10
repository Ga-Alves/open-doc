package com.open_doc.web_server.modules.accounts.services.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignUpRequestDTO(
        @NotBlank String name,

        @NotBlank String password,

        @Email @NotBlank String email) {

}
