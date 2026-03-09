package com.open_doc.web_server.repository.article;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<ArticleEntity, UUID> {

}