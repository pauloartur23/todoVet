package br.edu.ufersa.todoVet.features.vacina.dtos;

import java.time.LocalDate;

public record VacinaPatchDTO(
        LocalDate proximaDose
) {
}