package com.open_doc.web_server.modules.accounts.services;

import org.springframework.stereotype.Service;

import com.open_doc.web_server.modules.accounts.domain.SignupLinksEntity;
import com.open_doc.web_server.modules.accounts.repositories.SignupLinksRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignupLinksService {

  private final SignupLinksRepository signupLinksRepository;

  public SignupLinksEntity createSignUpLink() {

    SignupLinksEntity link = SignupLinksEntity.builder().build();

    return signupLinksRepository.save(link);
  }

}
