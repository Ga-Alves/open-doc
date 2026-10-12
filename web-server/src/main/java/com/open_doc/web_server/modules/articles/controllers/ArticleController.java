package com.open_doc.web_server.modules.articles.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.open_doc.web_server.modules.articles.services.ArticleService;
import com.open_doc.web_server.modules.articles.services.dtos.ArticleResponseDTO;
import com.open_doc.web_server.modules.articles.services.dtos.CreateArticleRequestDTO;
import com.open_doc.web_server.modules.articles.services.dtos.UpdateArticleRequestDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles")
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public List<ArticleResponseDTO> getArticles(@AuthenticationPrincipal String userId) {

        return articleService.getArticles(UUID.fromString(userId));
    }

    @GetMapping("/public")
    public List<ArticleResponseDTO> getPublicArticles() {
        return articleService.getPublicArticles();
    }

    @GetMapping("/feed")
    public List<ArticleResponseDTO> listFeedArticles(@AuthenticationPrincipal String userId) {
        return articleService.getFolloweeArticles(UUID.fromString(userId));
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
