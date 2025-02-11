package com.example.Agenda.util;

import com.example.Agenda.model.AgendaDto;
import com.example.Agenda.model.Agendas;
import java.util.List;
import java.util.stream.Collectors;

public class AgendaMapper {

    // Convierte un DTO a una entidad
    public static Agendas agendaMapperDtoToEntity(AgendaDto agendaDto) {
        return Agendas.builder()
                .id(agendaDto.getDni())
                .name(agendaDto.getName())
                .apellido(agendaDto.getApellido())
                .edad(agendaDto.getEdad())
                .telefono(agendaDto.getTelefono())
                .build();
    }

    // Convierte una entidad a un DTO
    public static AgendaDto agendaMapperEntityToDto(Agendas agenda) {
        return AgendaDto.builder()

                .dni(agenda.getId())
                .name(agenda.getName())
                .apellido(agenda.getApellido())
                .edad(agenda.getEdad())
                .telefono(agenda.getTelefono())
                .build();
    }

    // Convierte una lista de DTOs a una lista de entidades
    public static List<Agendas> agendaListMapperDtoToEntity(List<AgendaDto> agendaDtoList) {
        return agendaDtoList.stream()
                .map(AgendaMapper::agendaMapperDtoToEntity)
                .collect(Collectors.toList());
    }

    // Convierte una lista de entidades a una lista de DTOs
    public static List<AgendaDto> agendaListMapperEntityToDto(List<Agendas> agendaList) {
        return agendaList.stream()
                .map(AgendaMapper::agendaMapperEntityToDto)
                .collect(Collectors.toList());
    }
}
