package br.edu.ufersa.todoVet.api.dtos.prontuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProntuarioCreate(
        @NotNull(message = "O identificador do veterinário é obrigatório.")
        Long veterinarioId,

        @NotBlank(message = "A descrição do atendimento é obrigatória.")
        String descricao,

        String prescricao
) {}