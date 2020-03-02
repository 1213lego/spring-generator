package com.lego.proapi.repository;

import com.lego.proapi.configuration.Constants;
import com.lego.proapi.configuration.security.CustomUserDetail;
import com.lego.proapi.domain.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = "com.lego.proapi.repository")
public class PersistenceConfig {
    private final Constants constants;

    public PersistenceConfig(Constants constants) {
        this.constants = constants;
    }

    @Bean
    public AuditorAware<User> auditorAware() {
        return () -> Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getPrincipal)
                .map((userDetail) -> {
                    if (userDetail instanceof CustomUserDetail) {
                        return ((CustomUserDetail) userDetail).getUser();
                    } else {
                        return constants.anonymousUser();
                    }
                });
    }
}
