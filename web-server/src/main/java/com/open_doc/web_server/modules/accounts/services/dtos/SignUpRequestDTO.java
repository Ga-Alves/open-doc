package com.open_doc.web_server.modules.accounts.services.dtos;

import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SignUpRequestDTO(
        @NotBlank String name,

        @NotBlank String password,

        @Email @NotBlank String email,

        @NotNull UUID sign_up_link
) {
}