package com.open_doc.web_server.modules.social.api;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.open_doc.web_server.modules.social.entities.SocialConnectionsEntity;
import com.open_doc.web_server.modules.social.repositories.SocialConnectionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
class SocialQueryApiImpl implements SocialQueryApi {

  private final SocialConnectionRepository socialConnetionRepository;

  public List<UUID> findFolloweeIds(UUID followerId) {

    List<SocialConnectionsEntity> connections = this.socialConnetionRepository.findAllByFollowerId(followerId);

    return connections.stream().map((connection) -> connection.getFolloweeId()).toList();
  }

  public boolean follows(UUID followerId, UUID followeeId) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'follows'");
  }
}