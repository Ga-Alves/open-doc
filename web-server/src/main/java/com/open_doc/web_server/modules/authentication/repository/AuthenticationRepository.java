package com.open_doc.web_server.modules.authentication.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepository extends JpaRepository<AuthenticationEntity, UUID> {

    AuthenticationEntity findByUserId(UUID userId);
}
