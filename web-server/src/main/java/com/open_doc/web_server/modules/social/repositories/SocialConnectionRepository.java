package com.open_doc.web_server.modules.social.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.open_doc.web_server.modules.social.entities.SocialConnectionId;
import com.open_doc.web_server.modules.social.entities.SocialConnectionsEntity;

public interface SocialConnectionRepository extends JpaRepository<SocialConnectionsEntity, SocialConnectionId> {

  List<SocialConnectionsEntity> findAllByFollowerId(UUID followerId);

}
