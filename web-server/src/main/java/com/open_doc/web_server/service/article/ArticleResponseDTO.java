package com.open_doc.web_server.service.article;

import java.util.UUID;

import com.open_doc.web_server.repository.article.ArticleEntity;

public record ArticleResponseDTO(UUID id, String title, String content, String createdAt) {
    public ArticleResponseDTO(ArticleEntity article) {
        this(article.getId(), article.getTitle(), article.getContent(), article.getCreatedAt().toString());
    }
}
