package com.open_doc.web_server.modules.accounts.domain;

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

import com.open_doc.web_server.modules.accounts.domain.enums.AccountRole;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Table(name = "users")
@Entity(name = "user_auth")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AccountsEntity implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String email;

    private String encryptPassword;

    @Enumerated(EnumType.STRING)
    private AccountRole role;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public AccountsEntity(String name, String email, String encryptedPassword, AccountRole role ){
      this.name = name;
      this.email = email;
      this.encryptPassword = encryptedPassword;
      this.role = role;
    }


  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return getAuthoritiesByAccountRole(role);
  }

  public static List<SimpleGrantedAuthority> getAuthoritiesByAccountRole(AccountRole role){
    if(role == AccountRole.ADMIN){
      return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
    }
    else if(role == AccountRole.USER){
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
