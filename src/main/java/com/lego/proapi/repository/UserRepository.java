package com.lego.proapi.repository;

import com.lego.proapi.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUserName(String userName);

    @EntityGraph(attributePaths = "roles")
    User findByEmail(String email);

    @Query("SELECT  U FROM User U LEFT JOIN FETCH U.roles WHERE U.email =:email")
    User findOneWithRolesByEmail(@Param("email") String email);
}
