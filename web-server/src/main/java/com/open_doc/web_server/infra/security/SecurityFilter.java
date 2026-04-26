package com.open_doc.web_server.infra.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.open_doc.web_server.modules.authentication.domain.TokenService;
import com.open_doc.web_server.modules.authentication.domain.enums.UserRole;
import com.open_doc.web_server.modules.authentication.repository.UserAuthEntity;
import com.open_doc.web_server.modules.shared.Constants;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

  @Autowired
  TokenService tokenService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    var token = this.recoverToken(request);

    if (token != null) {
      this.tokenService.validateToken(token);
      UserRole userRole = tokenService.getRole(token);
      String subject = tokenService.getSubject(token);

      UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(subject, null,
          getAuthoritiesBasedOnRole(userRole));

      SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    filterChain.doFilter(request, response);
  }

  private String recoverToken(HttpServletRequest request) {

    Cookie[] cookies = request.getCookies();

    if(cookies == null) return null;

    for (int i = 0; i < cookies.length; i++) {
      String cookieName = cookies[i].getName();
      if (cookieName.equals(Constants.TOKEN)) {
        return cookies[i].getValue();
      }
    }

    return null;

  }

  private List<SimpleGrantedAuthority> getAuthoritiesBasedOnRole(UserRole role) {
    return UserAuthEntity.getAuthoritiesByUserRole(role);
  }

}
