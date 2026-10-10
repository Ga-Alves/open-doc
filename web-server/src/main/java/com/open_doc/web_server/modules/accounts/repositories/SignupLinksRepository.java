package com.open_doc.web_server.modules.accounts.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.open_doc.web_server.modules.accounts.domain.SignupLinksEntity;


public interface SignupLinksRepository extends JpaRepository<SignupLinksEntity, UUID> {

}
