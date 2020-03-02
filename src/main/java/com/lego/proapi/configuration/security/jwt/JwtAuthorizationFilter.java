package com.lego.proapi.configuration.security.jwt;

import com.lego.proapi.configuration.security.UserDetailServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailServiceImpl userDetailsService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        logger.info("--- JwtAuthorizationFilter ------");
        logger.info(request.getHeader("Authorization"));
        //TODO Logica de obtener el token y validarlo
        chain.doFilter(request, response);
    }
}
