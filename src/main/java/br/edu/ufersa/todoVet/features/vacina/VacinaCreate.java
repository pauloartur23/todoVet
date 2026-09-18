package br.edu.ufersa.todoVet.features.vacina;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record VacinaCreate(
        @NotBlank(message = "O nome da vacina é obrigatório.")
        String nome,

        @NotNull(message = "A data de aplicação é obrigatória.")
        LocalDate dataAplicacao,

        LocalDate proximaDose,
        String lote,
        String veterinarioResponsavel
) {
}