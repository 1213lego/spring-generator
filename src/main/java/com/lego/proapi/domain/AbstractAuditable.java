package com.lego.proapi.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractAuditable<U> extends AbstractBasicAuditable {
    @CreatedBy
    @ManyToOne
    @JoinColumn
    protected U createdBy;
    @LastModifiedBy
    @ManyToOne
    @JoinColumn
    protected U lastModifiedBy;
}
