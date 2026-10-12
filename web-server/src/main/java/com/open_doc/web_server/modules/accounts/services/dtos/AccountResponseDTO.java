package com.open_doc.web_server.modules.accounts.services.dtos;

import java.util.UUID;

import com.open_doc.web_server.modules.accounts.domain.enums.AccountRole;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
@Schema(requiredProperties = {"name", "email", "id", "role", "followedByUser"})
public class AccountResponseDTO {
  private final String name;
  private final String email;
  private final UUID id;
  private final AccountRole role;
  private final boolean isFollowedByUser;
}