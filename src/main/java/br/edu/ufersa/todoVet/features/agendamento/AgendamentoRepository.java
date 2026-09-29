package br.edu.ufersa.todoVet.features.agendamento;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByData(LocalDate data);
    List<Agendamento> findByPetId(Long petId);
    boolean existsByVeterinarioIdAndDataAndHora(Long veterinarioId, LocalDate data, LocalTime hora);
    boolean existsByVeterinarioIdAndStatus(Long veterinarioId, Agendamento.Status status);
}