package com.open_doc.web_server.modules.article.domain;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.open_doc.web_server.modules.article.domain.dtos.ArticleResponseDTO;
import com.open_doc.web_server.modules.article.domain.dtos.CreateArticleRequestDTO;
import com.open_doc.web_server.modules.article.domain.dtos.UpdateArticleRequestDTO;
import com.open_doc.web_server.modules.article.repository.ArticleEntity;
import com.open_doc.web_server.modules.article.repository.ArticleRepository;

@Service
public class ArticleService {

    @Autowired
    ArticleRepository articleRepository;

    public List<ArticleResponseDTO> getArticles() {
        return articleRepository.findAll().stream()
                .map(article -> new ArticleResponseDTO(
                        article.getId(),
                        article.getTitle(),
                        article.getContent(),
                        article.getCreatedAt().toString()))
                .toList();
    }

    public ArticleResponseDTO createArticle(CreateArticleRequestDTO payload) {

        ArticleEntity newArticle = ArticleEntity.builder()
                .title(payload.title())
                .content(payload.content())
                .build();

        ArticleEntity savedArticle = articleRepository.save(newArticle);

        return new ArticleResponseDTO(savedArticle);
    }

    public ArticleResponseDTO updateArticle(UpdateArticleRequestDTO payload, UUID articleId) {

        ArticleEntity article = articleRepository.findById(articleId).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Article not found with id: " + articleId));

        article.setTitle(payload.title());
        article.setContent(payload.content());

        articleRepository.save(article);

        return new ArticleResponseDTO(article);
    }

}
