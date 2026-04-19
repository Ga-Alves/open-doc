package com.open_doc.web_server.modules.authentication.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserAuthRepository extends JpaRepository<UserAuthEntity, UUID>{
  public UserDetails findByEmail(String email);
}
