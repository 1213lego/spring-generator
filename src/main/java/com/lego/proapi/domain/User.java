package com.lego.proapi.domain;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Accessors(chain = true)
@Entity
@Table(schema = "public")
public class User extends AbstractBasicAuditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String userName;
    @Column(unique = true)
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<UserRole> roles;

    public void addRol(Role role) {
        if (roles == null) {
            roles = new ArrayList<>();
        }
        UserRoleKey key = UserRoleKey
                .builder()
                .rolId(role.getId())
                .userId(this.id)
                .build();
        UserRole userRole = UserRole
                .builder()
                .role(role)
                .user(this)
                .id(key)
                .build();
        roles.add(userRole);
    }
}
