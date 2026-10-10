package com.open_doc.web_server.modules.accounts.services.dtos;

import com.open_doc.web_server.modules.accounts.domain.SignupLinksEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpLinkResponseDTO {
  private final String link;

  public static SignUpLinkResponseDTO from(SignupLinksEntity entity) {
    return new SignUpLinkResponseDTO("/sign-up/" + entity.getId());
  }

}