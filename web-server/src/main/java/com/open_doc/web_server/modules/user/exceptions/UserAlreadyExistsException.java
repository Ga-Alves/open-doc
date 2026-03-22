package com.open_doc.web_server.modules.user.exceptions;

import org.springframework.http.HttpStatus;

import com.open_doc.web_server.modules.exceptions.BusinessException;

public class UserAlreadyExistsException extends BusinessException {
    public UserAlreadyExistsException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}