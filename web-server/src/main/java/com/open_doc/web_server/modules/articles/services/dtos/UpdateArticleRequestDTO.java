package com.open_doc.web_server.modules.articles.services.dtos;

import java.util.Optional;

public record UpdateArticleRequestDTO(
    Optional<String> title,
    Optional<String> content,
    Optional<Boolean> isPublic) {
}
