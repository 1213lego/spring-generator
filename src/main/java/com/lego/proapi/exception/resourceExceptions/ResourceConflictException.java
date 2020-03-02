package com.lego.proapi.exception.resourceExceptions;

import org.springframework.http.HttpStatus;

import java.util.Optional;


public final class ResourceConflictException extends ResourceException {
    private static final String MESSAGE_TEMPLATE = " The resource %s with id: %s was no save";

    public ResourceConflictException(Throwable throwable,
                                     Optional<Object> id,
                                     Class<?> resourceName) {
        super(HttpStatus.CONFLICT, throwable, id, resourceName);
    }

    @Override
    public String getDetailMessage() {
        return String.format(MESSAGE_TEMPLATE,
                super.resourceType.getSimpleName(),
                super.id.map(Object::toString).orElse(null));
    }
}
