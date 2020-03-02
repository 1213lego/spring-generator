package com.lego.proapi.service.user;

import com.lego.proapi.dto.model.UserDto;

public interface UserService {
    UserDto signUp(UserDto userDto);

    UserDto login(UserDto userDto);
}
