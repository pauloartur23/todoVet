package br.edu.ufersa.todoVet.api.dtos.pet;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record PetUpdate(
        @NotBlank(message = "O nome do pet é obrigatório.")
        @Size(min = 2, max = 80, message = "O nome deve ter entre 2 e 80 caracteres.")
        String nome,

        String raca,

        @PastOrPresent(message = "A data de nascimento não pode ser no futuro.")
        LocalDate dataNascimento
) {}