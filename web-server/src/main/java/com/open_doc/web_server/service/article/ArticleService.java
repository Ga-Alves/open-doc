package com.open_doc.web_server.service.article;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.open_doc.web_server.repository.article.ArticleRepository;

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
}
