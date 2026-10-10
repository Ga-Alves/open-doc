package com.open_doc.web_server.modules.articles.services.dtos;

public record CreateArticleRequestDTO(String title, String content, Boolean isPublic) {

}
