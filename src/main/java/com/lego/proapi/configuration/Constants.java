package com.lego.proapi.configuration;


import com.lego.proapi.domain.Bike;
import com.lego.proapi.domain.Role;
import com.lego.proapi.domain.User;
import com.lego.proapi.repository.BikeRepository;
import com.lego.proapi.repository.RoleRepository;
import com.lego.proapi.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class Constants implements CommandLineRunner {
    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private Role userRole;
    private Role adminRole;
    private User anonymousUser;

    public Constants(BikeRepository bikeRepository, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.bikeRepository = bikeRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User anonymousUser() {
        if (anonymousUser == null) {
            anonymousUser = User
                    .builder()
                    .email("anonymous@anonymous.com")
                    .roles(List.of())
                    .userName("anonymous")
                    .firstName("anonymous")
                    .lastName("anonymous")
                    .password("anonymous")
                    .build();
            userRepository.save(anonymousUser);
        }
        return anonymousUser;
    }

    public Role getUserRole() {
        if (userRole == null) {
            userRole = Role
                    .builder()
                    .rolName("USER")
                    .description("Normal user")
                    .build();
            roleRepository.save(userRole);
        }
        return userRole;
    }

    public Role getAdminRole() {
        if (adminRole == null) {
            adminRole = Role
                    .builder()
                    .rolName("ADMIN")
                    .build();
            roleRepository.save(adminRole);
        }
        return adminRole;
    }

    public void loadBikes() {
        List<Bike> bikes = IntStream.range(1, 5)
                .mapToObj((i) -> Bike.builder()
                        .price(i * 6.831698)
                        .serial("B" + i)
                        .weight(1.36598 * i * i)
                        .purchaseDate(LocalDate.now())
                        .build())
                .collect(Collectors.toList());
        bikeRepository.saveAll(bikes);
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        loadBikes();
    }
}
