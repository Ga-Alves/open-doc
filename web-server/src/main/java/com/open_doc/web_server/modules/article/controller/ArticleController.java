package com.open_doc.web_server.modules.article.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.open_doc.web_server.modules.article.domain.ArticleService;
import com.open_doc.web_server.modules.article.domain.dtos.ArticleResponseDTO;
import com.open_doc.web_server.modules.article.domain.dtos.CreateArticleRequestDTO;
import com.open_doc.web_server.modules.article.domain.dtos.UpdateArticleRequestDTO;

@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController {

    private ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public List<ArticleResponseDTO> getArticles(@AuthenticationPrincipal String userId) {

        return articleService.getArticles(UUID.fromString(userId));
    }

    @GetMapping("/public")
    public List<ArticleResponseDTO> getPublicArticles() {
        return articleService.getPublicArticles();
    }

    @PostMapping
    public ArticleResponseDTO createArticle(
            @RequestBody CreateArticleRequestDTO body,
            @AuthenticationPrincipal String userId) {

        return articleService.createArticle(body, UUID.fromString(userId));
    }

    @PutMapping("/:id")
    public ArticleResponseDTO updateArticle(
            @RequestBody UpdateArticleRequestDTO body,
            @RequestParam UUID id,
            @AuthenticationPrincipal String userId) {

        return articleService.updateArticle(body, id, UUID.fromString(userId));
    }
}
