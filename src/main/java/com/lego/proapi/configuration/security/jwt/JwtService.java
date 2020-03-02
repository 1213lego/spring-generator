package com.lego.proapi.configuration.security.jwt;

import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private static final String BEARER = "Bearer ";

    public boolean isBearer(String authorization) {
        return authorization != null
                && authorization.startsWith(BEARER)
                && authorization.split("\\.").length == 3;
    }
}
