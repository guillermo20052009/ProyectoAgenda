package com.example.Agenda.service.impl;

import com.example.Agenda.model.Agendas;
import com.example.Agenda.model.AgendaDto;
import com.example.Agenda.repository.AgendaRepository;
import com.example.Agenda.service.AgendaService;
import com.example.Agenda.util.AgendaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AgendaServiceImpl implements AgendaService {

    @Autowired
    private AgendaRepository agendaRepository;

    @Override
    public List<AgendaDto> getAllContacts() {
        List<Agendas> agendaList = agendaRepository.findAll();
        return agendaList.stream()
                .map(AgendaMapper::agendaMapperEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<AgendaDto> getContacts(String id) {
        Optional<Agendas> agendaOptional = agendaRepository.findById(id);
        return agendaOptional.map(AgendaMapper::agendaMapperEntityToDto);
    }


    @Override
    public AgendaDto save(AgendaDto agendaDto) {
        Agendas agenda = AgendaMapper.agendaMapperDtoToEntity(agendaDto);
        Agendas savedAgendaEntity = agendaRepository.save(agenda);
        return AgendaMapper.agendaMapperEntityToDto(savedAgendaEntity);
    }

    @Override
    public AgendaDto updateContacts(AgendaDto agendaDto, String id) {
        Optional<Agendas> existingAgendaOptional = agendaRepository.findById(id);

        if (existingAgendaOptional.isPresent()) {
            Agendas existingAgenda = existingAgendaOptional.get();
            existingAgenda.setName(agendaDto.getName());
            existingAgenda.setId(agendaDto.getDni());
            existingAgenda.setTelefono(agendaDto.getTelefono());
            existingAgenda.setApellido(agendaDto.getApellido());
            existingAgenda.setApellido(agendaDto.getApellido());
            existingAgenda.setTutoriales(agendaDto.getTutoriales());

            Agendas updatedAgenda = agendaRepository.save(existingAgenda);
            return AgendaMapper.agendaMapperEntityToDto(updatedAgenda);
        } else {
            return null;
        }
    }

    @Override
    public ResponseEntity deleteContacts(String id) {
        try {
            Optional<Agendas> existingAgendaOptional = agendaRepository.findById(id);
            if (existingAgendaOptional.isPresent()) {
                agendaRepository.deleteById(id);
                return ResponseEntity.ok("Contacto eliminado exitosamente");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contacto no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el contacto");
        }
    }

    @Override
    public ResponseEntity deleteContacts() {
        agendaRepository.deleteAll();
        return ResponseEntity.ok().body("Todos los contactos eliminados exitosamente");
    }
}
