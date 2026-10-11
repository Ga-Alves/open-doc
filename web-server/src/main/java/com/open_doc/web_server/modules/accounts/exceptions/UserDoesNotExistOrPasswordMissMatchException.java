package com.open_doc.web_server.modules.accounts.exceptions;

import org.springframework.http.HttpStatus;

import com.open_doc.web_server.modules.exceptions.BusinessException;

public class UserDoesNotExistOrPasswordMissMatchException extends BusinessException {
    public UserDoesNotExistOrPasswordMissMatchException() {
        super("User not found or password is invalid.", HttpStatus.BAD_REQUEST);
    }
}
