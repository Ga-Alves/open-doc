package com.open_doc.web_server.modules.article.domain.dtos;

import java.util.UUID;

import com.open_doc.web_server.modules.article.repository.ArticleEntity;

import jakarta.validation.constraints.NotBlank;

public record ArticleResponseDTO(@NotBlank UUID id, @NotBlank String title, @NotBlank String content,
        @NotBlank String createdAt) {
    public ArticleResponseDTO(ArticleEntity article) {
        this(article.getId(), article.getTitle(), article.getContent(), article.getCreatedAt().toString());
    }
}
