package com.open_doc.web_server.modules.user.repository;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @CreationTimestamp
    public LocalDateTime createdAt;

    @UpdateTimestamp
    public LocalDateTime updatedAt;

}
