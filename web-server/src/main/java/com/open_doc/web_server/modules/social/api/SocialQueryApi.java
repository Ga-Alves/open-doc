package com.open_doc.web_server.modules.social.api;

import java.util.List;
import java.util.UUID;

public interface SocialQueryApi {
  List<UUID> findFolloweeIds(UUID followerId);
}
