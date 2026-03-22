package com.open_doc.web_server.modules.exceptions;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> genericException(Exception ex) {
        ApiError apiError = ApiError.builder()
                .message(ex.getMessage())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiError> businessException(BusinessException ex) {
        ApiError apiError = ApiError.builder()
                .message(ex.getMessage())
                .errors(ex.getErrors())
                .build();

        return new ResponseEntity<>(apiError, ex.getHttpStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationExceptions(
            MethodArgumentNotValidException ex,
            WebRequest request) {

        List<String> errors = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(error -> {
                    if (error instanceof FieldError) {
                        FieldError fieldError = (FieldError) error;
                        return fieldError.getField() + ": " + fieldError.getDefaultMessage();
                    }
                    return error.getDefaultMessage();
                })
                .collect(Collectors.toList());

        ApiError apiError = ApiError.builder()
                .message("Validation failed")
                .errors(errors)
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

}
