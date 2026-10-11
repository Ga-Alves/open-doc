package com.open_doc.web_server.modules.social_connections.entities;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "social_connections")
@Entity(name = "social_connections")
@IdClass(SocialConnectionId.class)
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SocialConnectionsEntity {

    @Id
    public UUID followerId;

    @Id
    public UUID followeeId;

}
