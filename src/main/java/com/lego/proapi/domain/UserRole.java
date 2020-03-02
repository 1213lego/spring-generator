package com.lego.proapi.domain;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table
public class UserRole extends AbstractBasicAuditable {
    @EmbeddedId
    private UserRoleKey id;
    @ManyToOne
    @MapsId("userId")
    private User user;
    @ManyToOne
    @MapsId("rolId")
    private Role role;
}
