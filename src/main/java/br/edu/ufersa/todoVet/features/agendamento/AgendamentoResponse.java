package br.edu.ufersa.todoVet.features.agendamento;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoResponse(
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