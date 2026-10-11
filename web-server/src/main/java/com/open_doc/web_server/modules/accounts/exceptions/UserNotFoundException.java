package com.open_doc.web_server.modules.accounts.exceptions;

import org.springframework.http.HttpStatus;

import com.open_doc.web_server.modules.exceptions.BusinessException;

public class UserNotFoundException extends BusinessException {
    public UserNotFoundException() {
        super("User not found.", HttpStatus.NOT_FOUND);
    }
}
