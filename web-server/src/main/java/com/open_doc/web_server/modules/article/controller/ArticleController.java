package com.open_doc.web_server.modules.article.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.open_doc.web_server.modules.article.domain.ArticleService;
import com.open_doc.web_server.modules.article.domain.dtos.ArticleResponseDTO;
import com.open_doc.web_server.modules.article.domain.dtos.CreateArticleRequestDTO;

@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("")
    public List<ArticleResponseDTO> getArticles() {
        return articleService.getArticles();
    }

    @PostMapping
    public ArticleResponseDTO createArticle(
            @RequestBody CreateArticleRequestDTO body) {
        return articleService.createArticle(body);
    }
}
