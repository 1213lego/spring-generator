package com.lego.proapi;

import com.lego.proapi.configuration.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class ProApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProApiApplication.class, args);
    }

}
