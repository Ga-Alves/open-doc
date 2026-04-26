package com.open_doc.web_server.modules.authentication.repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.open_doc.web_server.modules.authentication.domain.enums.UserRole;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;


@Table(name = "users")
@Entity(name = "user_auth")
@NoArgsConstructor
public class UserAuthEntity implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    public String name;

    public String email;

    public String encryptPassword;

    @Enumerated(EnumType.STRING)
    public UserRole role;

    @CreationTimestamp
    public LocalDateTime createdAt;

    @UpdateTimestamp
    public LocalDateTime updatedAt;

    public UserAuthEntity(String name, String email, String encryptedPassword, UserRole role ){
      this.name = name;
      this.email = email;
      this.encryptPassword = encryptedPassword;
      this.role = role;
    }


  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return getAuthoritiesByUserRole(role);
  }

  public static List<SimpleGrantedAuthority> getAuthoritiesByUserRole(UserRole role){
    if(role == UserRole.ADMIN){
      return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
    }
    else if(role == UserRole.USER){
      return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }
    return List.of();
  }

  @Override
  public @Nullable String getPassword() {
    return this.encryptPassword;
  }

  @Override
  public String getUsername() {
    return this.email;
  }

}
