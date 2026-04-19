package com.open_doc.web_server.modules.authentication.domain.enums;

public enum UserRole {
  ADMIN("admin"),
  USER("user");

  private String role;
  UserRole(String role){
    this.role = role;
  }
}
