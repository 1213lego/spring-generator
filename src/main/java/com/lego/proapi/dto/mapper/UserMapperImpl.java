package com.lego.proapi.dto.mapper;

import com.lego.proapi.domain.Role;
import com.lego.proapi.domain.User;
import com.lego.proapi.domain.UserRole;
import com.lego.proapi.dto.model.RoleDto;
import com.lego.proapi.dto.model.UserDto;
import com.lego.proapi.util.Utils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapperImpl implements UserMapper {
    @Override
    public UserDto userToUserDto(User user) {
        return Utils
                .<User, UserDto>mapperBuilder()
                .addTransform("roles", (this::mapUserRolesToRolesDto))
                .ignoreField("password")
                .source(user)
                .targetType(UserDto.class)
                .map();
    }

    @Override
    public User userDtoToUser(UserDto userDto) {
        return Utils
                .<UserDto, User>mapperBuilder()
                .addTransform("roles", this::mapRolesToUserRoles)
                .source(userDto)
                .targetType(User.class)
                .map();
    }

    public List<UserRole> mapRolesToUserRoles(UserDto userDto) {
        if (userDto.getRoles() == null) return new ArrayList<>();
        return userDto.getRoles()
                .stream()
                .map((roleDto -> UserRole
                        .builder()
                        .role(
                                Role.builder()
                                        .rolName(roleDto.getRolName())
                                        .description(roleDto.getDescription())
                                        .id(roleDto.getId())
                                        .build()
                        )
                        .build()))
                .collect(Collectors.toList());
    }

    public List<RoleDto> mapUserRolesToRolesDto(User user) {
        if (user.getRoles() == null) return new ArrayList<>();
        return user.getRoles()
                .stream()
                .map(UserRole::getRole)
                .map((role) -> RoleDto
                        .builder()
                        .description(role.getDescription())
                        .id(role.getId())
                        .rolName(role.getRolName())
                        .build())
                .collect(Collectors.toList());
    }
}
