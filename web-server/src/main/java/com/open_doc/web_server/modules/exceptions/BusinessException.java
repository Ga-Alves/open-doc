package com.open_doc.web_server.modules.exceptions;

import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
    HttpStatus httpStatus;

    String message;

    List<String> errors;

    public BusinessException(String message, HttpStatus httpStatus) {
        super(message);
        this.message = message;
        this.httpStatus = httpStatus;
        this.errors = List.of();
    }

    public BusinessException(String message, HttpStatus httpStatus, List<String> errors) {
        super(message);
        this.message = message;
        this.httpStatus = httpStatus;
        this.errors = errors;
    }

}