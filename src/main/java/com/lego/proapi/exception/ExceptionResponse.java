package com.lego.proapi.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
public class ExceptionResponse {
    @JsonIgnore
    private final HttpStatus httpStatus;
    private final String message;
    private final Object errors;
    private final LocalDateTime time;
}
