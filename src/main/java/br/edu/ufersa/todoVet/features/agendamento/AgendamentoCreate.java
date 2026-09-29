package br.edu.ufersa.todoVet.features.agendamento;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoCreate(
        @NotNull(message = "O ID do pet é obrigatório.")
        @Positive(message = "ID do pet inválido.")
        Long petId,

        @NotNull(message = "O ID do veterinário é obrigatório.")
        @Positive(message = "ID do veterinário inválido.")
        Long veterinarioId,

        @NotNull(message = "A data é obrigatória.")
        @Future(message = "A data do agendamento deve ser futura.")
        LocalDate data,

        @NotNull(message = "O horário é obrigatório.")
        LocalTime hora,

        @NotBlank(message = "O motivo é obrigatório.")
        @Size(max = 200, message = "O motivo deve ter no máximo 200 caracteres.")
        String motivo
) {}