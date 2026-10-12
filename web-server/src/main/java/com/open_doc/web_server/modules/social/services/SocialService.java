package com.open_doc.web_server.modules.social.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.open_doc.web_server.modules.social.entities.SocialConnectionsEntity;
import com.open_doc.web_server.modules.social.repositories.SocialConnectionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SocialService {

  private final SocialConnectionRepository socialConnetionRepository;

  public List<UUID> getFollowersOf(UUID userId) {

    List<SocialConnectionsEntity> connections = this.socialConnetionRepository.findAllByFollowerId(userId);

    return connections.stream().map((connection) -> connection.getFolloweeId()).toList();
  }

  public void follow(UUID followerId, UUID followee) {

    SocialConnectionsEntity connection = SocialConnectionsEntity.builder()
        .followerId(followerId)
        .followeeId(followee)
        .build();

    socialConnetionRepository.save(connection);
  }

    public void unfollow(UUID followerId, UUID followee) {

    SocialConnectionsEntity connection = SocialConnectionsEntity.builder()
        .followerId(followerId)
        .followeeId(followee)
        .build();

    socialConnetionRepository.delete(connection);
  }

}
