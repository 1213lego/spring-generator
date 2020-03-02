package com.lego.proapi.dto.mapper;

import com.lego.proapi.domain.User;
import com.lego.proapi.dto.model.UserDto;

public interface UserMapper {
    UserDto userToUserDto(User user);

    User userDtoToUser(UserDto userDto);
}
