package br.edu.ufersa.todoVet.features.prontuario.dto;

import br.edu.ufersa.todoVet.features.prontuario.Prontuario;
import java.time.LocalDateTime;

public record ProntuarioResponseDTO(
        Long id,
        Long petId,
        Long veterinarioId,
        LocalDateTime dataRegistro,
        String descricao,
        String prescricao
) {
    public static ProntuarioResponseDTO fromEntity(Prontuario p) {
        return new ProntuarioResponseDTO(
                p.getId(),
                p.getPet().getId(),
                p.getVeterinario().getId(),
                p.getDataRegistro(),
                p.getDescricao(),
                p.getPrescricao()
        );
    }
}