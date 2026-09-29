package br.edu.ufersa.todoVet.features.agendamento.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoResponseDTO(
        Long id,
        Long petId,
        String petNome,
        Long veterinarioId,
        String veterinarioNome,
        LocalDate data,
        LocalTime hora,
        String motivo,
        String status
) {}