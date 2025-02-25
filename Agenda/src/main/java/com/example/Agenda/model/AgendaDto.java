package com.example.Agenda.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
@Builder
public class AgendaDto {
    @Id
    private String dni;
    private String name;
    private String apellido;
    private int edad;
    private String telefono;
    private String tutoriales[];
}
