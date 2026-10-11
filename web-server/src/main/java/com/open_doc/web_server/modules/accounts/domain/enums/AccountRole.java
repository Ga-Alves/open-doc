package com.open_doc.web_server.modules.accounts.domain.enums;

public enum AccountRole {
  ADMIN("admin"),
  USER("user");

  private String role;
  AccountRole(String role){
    this.role = role;
  }
}
