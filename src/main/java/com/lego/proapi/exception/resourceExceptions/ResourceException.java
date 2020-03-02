package com.lego.proapi.exception.resourceExceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.Optional;

@Getter
public abstract class ResourceException extends RuntimeException {
    protected HttpStatus httpStatus;
    protected Optional<Object> id;
    protected Class<?> resourceType;

    public ResourceException(HttpStatus httpStatus,
                             Throwable throwable,
                             Optional<Object> id,
                             Class<?> resourceType) {
        super(throwable);
        this.id = id;
        this.resourceType = resourceType;
        this.httpStatus = httpStatus;
    }

    public abstract String getDetailMessage();
}
