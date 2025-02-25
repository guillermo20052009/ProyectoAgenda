package com.example.Agenda.model;

import lombok.*;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@Builder
public class Agendas {
    @Id
    private String id;
    private String name;
    private String apellido;
    private int edad;
    private String telefono;
    private String tutoriales[];

}

