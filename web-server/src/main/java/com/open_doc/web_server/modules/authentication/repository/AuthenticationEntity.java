package com.open_doc.web_server.modules.authentication.repository;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.open_doc.web_server.modules.user.repository.UsersEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "auth")
@Entity(name = "auth")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    public String email;

    public String encryptPassword;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UsersEntity user;
}
