package com.open_doc.web_server.modules.accounts.exceptions;

import org.springframework.http.HttpStatus;

import com.open_doc.web_server.modules.exceptions.BusinessException;

public class InvalidSignUpLink extends BusinessException {
    public InvalidSignUpLink() {
        super("This link is invalid or not long available.", HttpStatus.BAD_REQUEST);
    }
}
