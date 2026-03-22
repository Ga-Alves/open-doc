package com.open_doc.web_server.modules.user.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<UsersEntity, UUID> {

    boolean existsByEmail(String email);

    Optional<UsersEntity> findByEmail(String email);

}
