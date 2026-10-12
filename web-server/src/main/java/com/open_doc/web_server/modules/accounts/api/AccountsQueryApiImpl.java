package com.open_doc.web_server.modules.accounts.api;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.open_doc.web_server.modules.accounts.domain.enums.AccountRole;
import com.open_doc.web_server.modules.accounts.repositories.AccountsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
class AccountsQueryApiImpl implements AccountsQueryApi {

  private final AccountsRepository accountsRepository;

  @Override
  public List<UUID> getAdminsIds() {
    return accountsRepository.findAllByRole(AccountRole.ADMIN)
        .stream()
        .map(account -> account.getId())
        .toList();
  }

}
