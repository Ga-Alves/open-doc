package com.open_doc.web_server.modules.social.controllers;

import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.open_doc.web_server.modules.social.services.SocialService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/social")
public class SocialController {

  private final SocialService socialService;

  @PostMapping("/follow/:id")
  public void followUser(@AuthenticationPrincipal String userId, @RequestParam UUID accountToFollow) {
    socialService.follow(UUID.fromString(userId), accountToFollow);
  }

}
