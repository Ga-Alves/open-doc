package com.open_doc.web_server.modules.accounts.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.open_doc.web_server.modules.accounts.domain.AccountsEntity;

public interface AccountsRepository extends JpaRepository<AccountsEntity, UUID>{
  public UserDetails findByEmail(String email);
}
