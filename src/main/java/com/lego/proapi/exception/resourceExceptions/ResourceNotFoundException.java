package com.lego.proapi.exception.resourceExceptions;

import org.springframework.http.HttpStatus;

import java.util.Optional;


public class ResourceNotFoundException extends ResourceException {
    private static final String MESSAGE_TEMPLATE = "The resource %s with id: %s does not exists";

    public ResourceNotFoundException(Throwable throwable,
                                     Optional<Object> id,
                                     Class<?> resourceType) {
        super(HttpStatus.NOT_FOUND, throwable, id, resourceType);
    }

    @Override
    public String getDetailMessage() {
        return String.format(MESSAGE_TEMPLATE,
                super.resourceType.getSimpleName(),
                super.id.map(Object::toString).orElse(null));
    }
}
