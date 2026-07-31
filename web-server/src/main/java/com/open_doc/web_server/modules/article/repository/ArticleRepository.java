package com.open_doc.web_server.modules.article.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<ArticleEntity, UUID> {

  List<ArticleEntity> findByAuthorId(UUID authorId);
  List<ArticleEntity> findByIsPublic(Boolean isPublic);

}