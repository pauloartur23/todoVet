package br.edu.ufersa.todoVet.features.prontuario.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProntuarioCreateDTO(
        @NotNull(message = "O identificador do funcionário veterinário é obrigatório.")
        @Positive(message = "ID do veterinário inválido.")
        Long veterinarioId,

        @NotBlank(message = "A descrição do atendimento é obrigatória.")
        String descricao,

        String prescricao
) {}