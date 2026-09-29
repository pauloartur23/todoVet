package br.edu.ufersa.todoVet.features.vacina.dto;

import java.time.LocalDate;

public record VacinaPatchDTO(
        LocalDate proximaDose
) {
}