package com.lego.proapi.service.user;

import com.lego.proapi.configuration.Constants;
import com.lego.proapi.domain.Role;
import com.lego.proapi.domain.User;
import com.lego.proapi.dto.mapper.UserMapper;
import com.lego.proapi.dto.model.UserDto;
import com.lego.proapi.exception.resourceExceptions.ResourceConflictException;
import com.lego.proapi.repository.RoleRepository;
import com.lego.proapi.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Log4j2
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final Constants constants;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, Constants constants, PasswordEncoder passwordEncoder, RoleRepository roleRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.constants = constants;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
    }

    @Override
    @Transactional
    public UserDto signUp(UserDto userDto) {
        userDto.setRoles(null);
        User user = userMapper.userDtoToUser(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        try {
            saveUserWithRoles(user, constants.getUserRole());
        } catch (DataAccessException dataAccessException) {
            log.error("Error signup user ", userDto, dataAccessException);
            throw new ResourceConflictException(dataAccessException.getRootCause(),
                    Optional.ofNullable(userDto.getUserName()),
                    User.class);
        }
        return userMapper.userToUserDto(user);
    }

    private void saveUserWithRoles(User user, Role... roles) {
        for (Role role : roles) {
            user.addRol(role);
        }
        user = userRepository.save(user);
    }

    @Override
    public UserDto login(UserDto userDto) {
        //TODO autenticacion generar el token
        return null;
    }
}

