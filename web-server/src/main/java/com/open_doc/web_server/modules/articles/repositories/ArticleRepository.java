package com.open_doc.web_server.modules.articles.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.open_doc.web_server.modules.articles.domain.ArticleEntity;

public interface ArticleRepository extends JpaRepository<ArticleEntity, UUID> {

  List<ArticleEntity> findByAuthorId(UUID authorId);

  List<ArticleEntity> findByIsPublic(Boolean isPublic);

  List<ArticleEntity> findByAuthorIdIn(List<UUID> authorIds);
}