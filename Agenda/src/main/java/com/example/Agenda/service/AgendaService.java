package com.example.Agenda.service;

import com.example.Agenda.model.AgendaDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface AgendaService {
    List<AgendaDto> getAllContacts();
    Optional<AgendaDto> getContacts(String id);
    AgendaDto save(AgendaDto Contact);
    AgendaDto updateContacts(AgendaDto contact, String id);
    ResponseEntity deleteContacts(String id);
    ResponseEntity deleteContacts();
}
