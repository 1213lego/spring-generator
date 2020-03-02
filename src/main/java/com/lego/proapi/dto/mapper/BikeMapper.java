package com.lego.proapi.dto.mapper;


import com.lego.proapi.domain.Bike;
import com.lego.proapi.dto.model.BikeDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BikeMapper {
    BikeDto toBikeDto(Bike bike);

    Bike toBike(BikeDto bikeDto);

    List<BikeDto> toBikeDtos(List<Bike> bikes);
}
