package br.edu.ufersa.todoVet.api.dtos.prontuario;

import java.time.LocalDateTime;

public record ProntuarioResponse(
        Long id,
        Long petId,
        Long veterinarioId,
        LocalDateTime dataRegistro,
        String descricao,
        String prescricao
) {}