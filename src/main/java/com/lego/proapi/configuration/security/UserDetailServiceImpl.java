package com.lego.proapi.configuration.security;

import com.lego.proapi.domain.User;
import com.lego.proapi.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
public class UserDetailServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("---Trying log in user = " + username);
        User user = userRepository
                .findUserByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));
        return new CustomUserDetail(user, CustomUserDetail.loadAuthorities(user));
    }
}
