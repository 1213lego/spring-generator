package com.lego.proapi.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "filestorage")
@Getter
@Setter
public class FileStorageProperties {
    private String location;
}
