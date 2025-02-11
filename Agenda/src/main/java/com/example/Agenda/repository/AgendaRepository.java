package com.example.Agenda.repository;

import com.example.Agenda.model.Agendas;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AgendaRepository extends MongoRepository<Agendas,String> {
    List<Agendas>  findAll();
    Optional<Agendas> getTutorialById();
}
