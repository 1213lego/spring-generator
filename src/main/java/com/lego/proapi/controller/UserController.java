package com.lego.proapi.controller;

import com.lego.proapi.configuration.security.CustomUserDetail;
import com.lego.proapi.dto.mapper.UserMapper;
import com.lego.proapi.dto.model.UserDto;
import com.lego.proapi.service.user.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Log4j2
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping("/signup")
    public UserDto signUp(@RequestBody @Valid UserDto userDto) {
        return userService.signUp(userDto);
    }

    @PostMapping(value = "/login")
    public void login(@AuthenticationPrincipal CustomUserDetail activeUser) {
        log.info(activeUser);
    }
}
