package br.edu.ufersa.todoVet.features.vacina;

import java.time.LocalDate;

public record VacinaPatch(
        LocalDate proximaDose
) {
}