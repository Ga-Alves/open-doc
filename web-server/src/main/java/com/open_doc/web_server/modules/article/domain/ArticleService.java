package com.open_doc.web_server.modules.article.domain;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.open_doc.web_server.modules.article.domain.dtos.ArticleResponseDTO;
import com.open_doc.web_server.modules.article.domain.dtos.CreateArticleRequestDTO;
import com.open_doc.web_server.modules.article.domain.dtos.UpdateArticleRequestDTO;
import com.open_doc.web_server.modules.article.repository.ArticleEntity;
import com.open_doc.web_server.modules.article.repository.ArticleRepository;
import com.open_doc.web_server.modules.user.repository.UsersEntity;
import com.open_doc.web_server.modules.user.repository.UsersRepository;

@Service
public class ArticleService {

    ArticleRepository articleRepository;
    UsersRepository usersRepository;

    public ArticleService(ArticleRepository articleRepository, UsersRepository usersRepository) {
        this.articleRepository = articleRepository;
        this.usersRepository = usersRepository;
    }

    public List<ArticleResponseDTO> getArticles(UUID userId) {
        return articleRepository.findByAuthorId(userId).stream()
                .map(article -> new ArticleResponseDTO(
                        article.getId(),
                        article.getTitle(),
                        article.getContent(),
                        article.getIsPublic(),
                        article.getCreatedAt().toString()))
                .toList();
    }

    public List<ArticleResponseDTO> getPublicArticles() {
        return articleRepository.findByIsPublic(true).stream()
                .map(article -> new ArticleResponseDTO(
                        article.getId(),
                        article.getTitle(),
                        article.getContent(),
                        article.getIsPublic(),
                        article.getCreatedAt().toString()))
                .toList();
    }

    public ArticleResponseDTO createArticle(CreateArticleRequestDTO payload, UUID userId) {

        UsersEntity author = usersRepository.getReferenceById(userId);

        ArticleEntity newArticle = ArticleEntity.builder()
                .title(payload.title())
                .content(payload.content())
                .isPublic(payload.isPublic())
                .author(author)
                .build();

        ArticleEntity savedArticle = articleRepository.save(newArticle);

        return new ArticleResponseDTO(savedArticle);
    }

    public ArticleResponseDTO updateArticle(UpdateArticleRequestDTO payload, UUID articleId, UUID userId) {

        ArticleEntity article = articleRepository.findById(articleId).orElseThrow(
                () -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Article not found with id: " + articleId));

        if (!article.getAuthor().getId().equals(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You're not the owner of this article");
        }

        payload.title().ifPresent(article::setTitle);
        payload.content().ifPresent(article::setContent);
        payload.isPublic().ifPresent(article::setIsPublic);

        articleRepository.save(article);

        return new ArticleResponseDTO(article);
    }

}
