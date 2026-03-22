package com.open_doc.web_server.modules.authentication.exceptions;

import org.springframework.http.HttpStatus;

import com.open_doc.web_server.modules.exceptions.BusinessException;

public class UserDoesNotExistOrPasswordMissMatchException extends BusinessException {
    public UserDoesNotExistOrPasswordMissMatchException() {
        super("User not found or password is incorrect.", HttpStatus.BAD_REQUEST);
    }
}
