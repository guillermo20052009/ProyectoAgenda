package com.example.Agenda.controller.impl;

import com.example.Agenda.controller.AgendaApi;
import com.example.Agenda.model.AgendaDto;
import com.example.Agenda.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Guillermo/Proyecto")
public class AgendaController implements AgendaApi {

    @Autowired
    private AgendaService agendaService;

    // Obtener todos los contactos
    @Override
    @GetMapping("/contacts")
    public List<AgendaDto> getAllContacts() {
        return agendaService.getAllContacts();
    }

    // Obtener un contacto por ID
    @Override
    @GetMapping("/contacts/{id}")
    public Optional<AgendaDto> getContacts(@PathVariable String id) {
        return agendaService.getContacts(id);
    }


    // Guardar un contacto
    @Override
    @PostMapping("/contacts")
    public AgendaDto save(@RequestBody AgendaDto agendaDto) {
        return agendaService.save(agendaDto);
    }

    // Actualizar un contacto
    @Override
    @PutMapping("/contacts/{id}")
    public AgendaDto updateContacts(@RequestBody AgendaDto agendaDto, @PathVariable String id) {
        agendaDto.setDni(id);
        return agendaService.updateContacts(agendaDto, id);
    }

    // Eliminar un contacto por ID
    @Override
    @DeleteMapping("/contacts/{id}")
    public ResponseEntity deleteContacts(@PathVariable String id) {
        return agendaService.deleteContacts(id);
    }

    // Eliminar todos los contactos
    @Override
    @DeleteMapping("/contacts")
    public ResponseEntity deleteContacts() {
        return agendaService.deleteContacts();
    }
}
