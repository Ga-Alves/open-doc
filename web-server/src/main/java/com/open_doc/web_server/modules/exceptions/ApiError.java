package com.open_doc.web_server.modules.exceptions;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiError {

    String message;

    List<String> errors;
}
