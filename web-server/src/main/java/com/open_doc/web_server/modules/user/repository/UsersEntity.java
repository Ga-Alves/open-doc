package com.open_doc.web_server.modules.user.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.open_doc.web_server.modules.article.repository.ArticleEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "users")
@Entity(name = "users")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UsersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    public String name;

    public String email;

    @OneToMany(mappedBy = "author")
    public List<ArticleEntity> articles;

    @CreationTimestamp
    public LocalDateTime createdAt;

    @UpdateTimestamp
    public LocalDateTime updatedAt;

}
