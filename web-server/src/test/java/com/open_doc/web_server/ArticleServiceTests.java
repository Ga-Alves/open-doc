package com.open_doc.web_server;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.open_doc.web_server.modules.article.domain.ArticleService;
import com.open_doc.web_server.modules.article.domain.dtos.CreateArticleRequestDTO;
import com.open_doc.web_server.modules.article.domain.dtos.UpdateArticleRequestDTO;
import com.open_doc.web_server.modules.article.repository.ArticleEntity;
import com.open_doc.web_server.modules.article.repository.ArticleRepository;

@ExtendWith(MockitoExtension.class)
class ArticleServiceTests {

    @Mock
    private ArticleRepository articleRepository;

    @InjectMocks
    private ArticleService articleService;

    private UUID articleId;
    private UUID authorId;
    private ArticleEntity articleEntity;

    @BeforeEach
    void setUp() {
        articleId = UUID.randomUUID();
        authorId = UUID.randomUUID();
        articleEntity = ArticleEntity.builder()
                .id(articleId)
                .title("Título Original")
                .content("Conteúdo Original")
                .authorId(authorId)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    void updateArticle_WhenArticleExists_ShouldUpdateSuccessfully() {
        // Arrange
        UpdateArticleRequestDTO updateRequest = new UpdateArticleRequestDTO(
            Optional.of("Novo Título"),
            Optional.of("Novo Conteúdo"),
            Optional.of(false)
        );

        when(articleRepository.findById(articleId))
            .thenReturn(Optional.of(articleEntity));

        when(articleRepository.save(any(ArticleEntity.class)))
            .thenReturn(articleEntity);

        // Act
        var response = articleService.updateArticle(updateRequest, articleId, authorId);

        // Assert
        assertNotNull(response);
        assertEquals("Novo Título", response.title());
        assertEquals("Novo Conteúdo", response.content());

        verify(articleRepository).findById(articleId);
        verify(articleRepository).save(articleEntity);
    }

    @Test
    void updateArticle_WhenArticleDoesNotExist_ShouldThrowNotFoundException() {
        // Arrange
        UpdateArticleRequestDTO updateRequest = new UpdateArticleRequestDTO(
            Optional.of("Novo Título"),
            Optional.of("Novo Conteúdo"),
            Optional.of(false)
        );

        when(articleRepository.findById(articleId))
            .thenReturn(Optional.empty());

        // Act & Assert
        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> articleService.updateArticle(updateRequest, articleId, authorId)
        );

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertTrue(exception.getReason().contains("Article not found"));

        verify(articleRepository).findById(articleId);
        verify(articleRepository, never()).save(any());
    }

    @Test
    void updateArticle_WhenUserIsNotTheArticleOwner_ShouldThrowUnauthorizedException() {
        // Arrange
        UpdateArticleRequestDTO updateRequest = new UpdateArticleRequestDTO(
            Optional.of("Novo Título"),
            Optional.of("Novo Conteúdo"),
            Optional.empty()
        );

        when(articleRepository.findById(articleId))
            .thenReturn(Optional.of(articleEntity));

        // Act & Assert
        ResponseStatusException exception = assertThrows(
            ResponseStatusException.class,
            () -> articleService.updateArticle(updateRequest, articleId, UUID.randomUUID())
        );

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatusCode());

        verify(articleRepository).findById(articleId);
        verify(articleRepository, never()).save(any());
    }

    @Test
    void createArticle_ShouldCreateSuccessfully() {
        // Arrange
        CreateArticleRequestDTO createRequest = new CreateArticleRequestDTO(
            "Novo Artigo",
            "Conteúdo do Artigo",
            false
        );

        when(articleRepository.save(any(ArticleEntity.class)))
            .thenReturn(articleEntity);

        // Act
        var response = articleService.createArticle(createRequest, authorId);

        // Assert
        assertNotNull(response);
        assertEquals(articleId, response.id());
        assertEquals("Título Original", response.title());

        verify(articleRepository).save(any(ArticleEntity.class));
    }
}