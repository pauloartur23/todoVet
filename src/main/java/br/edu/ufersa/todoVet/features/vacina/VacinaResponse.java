package br.edu.ufersa.todoVet.features.vacina;

import java.time.LocalDate;

public record VacinaResponse(
        Long id,
        Long petId,
        String nome,
        LocalDate dataAplicacao,
        LocalDate proximaDose,
        String lote,
        String veterinarioResponsavel
) {
    public static VacinaResponse fromEntity(Vacina vacina) {
        return new VacinaResponse(
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