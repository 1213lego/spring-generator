package com.lego.proapi.exception;

import com.google.common.base.Strings;
import com.lego.proapi.exception.resourceExceptions.ResourceException;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
@Log4j2
public class ApiExceptionHandler {
    private static final String BAD_REQUEST_RESOURCE_MESSAGE = "El recurso %s no se ecuentra bien formado";

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    public ResponseEntity<ExceptionResponse> handleValidationExceptions(MethodArgumentNotValidException e) {
        Map<String, String> errors = e.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors.toMap(FieldError::getField,
                        fieldError -> Strings.nullToEmpty(fieldError.getDefaultMessage())));
        HttpStatus conflict = HttpStatus.BAD_REQUEST;
        String resource = e.getParameter().getParameterType().getSimpleName();
        String message = String.format(BAD_REQUEST_RESOURCE_MESSAGE, resource);
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                conflict,
                message,
                errors,
                LocalDateTime.now()
        );
        return new ResponseEntity<>(exceptionResponse, conflict);
    }

    @ExceptionHandler(value = {ResourceException.class})
    public ResponseEntity<ExceptionResponse> handleResourceException(ResourceException e) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                e.getHttpStatus(),
                e.getDetailMessage(),
                Arrays.asList(e.getMessage(),
                        e.getCause().getMessage()),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(exceptionResponse, e.getHttpStatus());
    }

    /*@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({Exception.class})
    public void fatalErrorUnexpectedException(HttpServletRequest request, Exception exception) {
        log.error(request, exception);
    }*/
}
