package com.lego.proapi.dto.model;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.lego.proapi.domain.Bike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class BikeDto {
    @Size(max = 30)
    @NotBlank
    private String serial;
    @NotNull
    @PastOrPresent
    private LocalDate purchaseDate;
    @PositiveOrZero
    private double weight;
    @PositiveOrZero
    private double price;

    public BikeDto(Bike bike) {
        serial = bike.getSerial();
        purchaseDate = bike.getPurchaseDate();
        weight = bike.getWeight();
        price = bike.getPrice();
    }
}
