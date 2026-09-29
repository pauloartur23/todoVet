package br.edu.ufersa.todoVet.features.vacina.dtos;

import br.edu.ufersa.todoVet.features.vacina.Vacina;

import java.time.LocalDate;

public record VacinaResponseDTO(
        Long id,
        Long petId,
        String nome,
        LocalDate dataAplicacao,
        LocalDate proximaDose,
        String lote,
        String veterinarioResponsavel
) {
    public static VacinaResponseDTO fromEntity(Vacina vacina) {
        return new VacinaResponseDTO(
                vacina.getId(),
                vacina.getPetId(),
                vacina.getNome(),
                vacina.getDataAplicacao(),
                vacina.getProximaDose(),
                vacina.getLote(),
                vacina.getVeterinarioResponsavel()
        );
    }
}