package com.open_doc.web_server.modules.article.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<ArticleEntity, UUID> {

}