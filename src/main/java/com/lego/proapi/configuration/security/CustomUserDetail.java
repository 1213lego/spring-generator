package com.lego.proapi.configuration.security;

import com.lego.proapi.domain.User;
import com.lego.proapi.domain.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


public class CustomUserDetail extends org.springframework.security.core.userdetails.User {
    private User user;

    public CustomUserDetail(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public CustomUserDetail(User user, Collection<? extends GrantedAuthority> authorities) {
        super(user.getUserName(), user.getPassword(), authorities);
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public static List<SimpleGrantedAuthority> loadAuthorities(User user) {
        return user
                .getRoles()
                .stream()
                .map(UserRole::getRole)
                .map(rol -> new SimpleGrantedAuthority("ROLE_" + rol.getRolName()))
                .collect(Collectors.toList());
    }

}
