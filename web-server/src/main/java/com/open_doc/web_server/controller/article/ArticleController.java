package com.open_doc.web_server.controller.article;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.open_doc.web_server.service.article.ArticleResponseDTO;
import com.open_doc.web_server.service.article.ArticleService;

@RestController
@RequestMapping("/api/v1/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("")
    public List<ArticleResponseDTO> getArticles() {
        return articleService.getArticles();
    }
}
