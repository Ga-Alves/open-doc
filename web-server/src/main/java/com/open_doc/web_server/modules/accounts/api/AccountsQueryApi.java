package com.open_doc.web_server.modules.accounts.api;

import java.util.List;
import java.util.UUID;

public interface AccountsQueryApi {
  List<UUID> getAdminsIds();
}
