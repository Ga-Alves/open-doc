package com.open_doc.web_server.modules.social_connections.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.open_doc.web_server.modules.social_connections.entities.SocialConnectionId;
import com.open_doc.web_server.modules.social_connections.entities.SocialConnectionsEntity;

public interface SocialConnectionRepository extends JpaRepository<SocialConnectionsEntity, SocialConnectionId> {

}
