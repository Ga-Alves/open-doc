package com.open_doc.web_server.modules.accounts.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.open_doc.web_server.modules.accounts.domain.AccountsEntity;
import com.open_doc.web_server.modules.accounts.domain.enums.AccountRole;

@Service
public class TokenService {

  @Value("${api.security.token.secret}")
  private String secret;

  private String issuer = "auth-api";

  public String generateToken(AccountsEntity userAuth) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);
      String jwt = JWT.create()
          .withIssuer(this.issuer)
          .withSubject(userAuth.id.toString())
          .withExpiresAt(genExpirationDate())
          .withClaim("role", userAuth.role.toString())
          .sign(algorithm);

      return jwt;

    } catch (JWTCreationException e) {
      throw new RuntimeException("Error when generating token!");
    }
  }

  public void validateToken(String jwt) {
    Algorithm algorithm = Algorithm.HMAC256(secret);
    var tokenExpiration = JWT.require(algorithm)
        .withIssuer(this.issuer)
        .build()
        .verify(jwt)
        .getExpiresAt();

    if (tokenExpiration == null) {
      throw new RuntimeException("Fail to Authenticate. Token Invalid or miss match.");
    }

    Boolean isExpired = tokenExpiration.before(Date.from(Instant.now()));

    if (isExpired) {
      throw new RuntimeException("Fail to Authenticate. Token already expired.");
    }
  }

  public AccountRole getRole(String jwt) {
    Algorithm algorithm = Algorithm.HMAC256(secret);
    String role = JWT.require(algorithm)
        .build()
        .verify(jwt)
        .getClaim("role").asString();

    return AccountRole.valueOf(role);
  }

  public String getSubject(String jwt) {
    Algorithm algorithm = Algorithm.HMAC256(secret);
    String subject = JWT.require(algorithm)
        .build()
        .verify(jwt)
        .getSubject();

    return subject;
  }

  private Instant genExpirationDate() {
    return LocalDateTime.now().plusHours(24).toInstant(ZoneOffset.of("-3"));
  }
}
