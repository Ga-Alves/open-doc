package com.open_doc.web_server.modules.accounts.services.dtos;

import java.util.UUID;

import com.open_doc.web_server.modules.accounts.domain.enums.AccountRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class AccountResponseDTO {
  private final String name;
  private final String email;
  private final UUID id;
  private final AccountRole role;
}