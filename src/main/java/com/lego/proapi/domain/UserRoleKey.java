package com.lego.proapi.domain;

import lombok.Builder;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Builder
@Embeddable
public class UserRoleKey implements Serializable {
    private Long userId;
    private Short rolId;

    public UserRoleKey() {

    }

    public UserRoleKey(Long userId, Short rolId) {
        this.userId = userId;
        this.rolId = rolId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Short getRolId() {
        return rolId;
    }

    public void setRolId(Short rolId) {
        this.rolId = rolId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRoleKey that = (UserRoleKey) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(rolId, that.rolId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, rolId);
    }
}
