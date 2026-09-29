package br.edu.ufersa.todoVet.features.pet.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record PetUpdateDTO(
        @NotBlank(message = "O nome do pet é obrigatório.")
        @Size(min = 2, max = 80, message = "O nome deve ter entre 2 e 80 caracteres.")
        String nome,

        @Size(max = 60, message = "A raça deve ter no máximo 60 caracteres.")
        String raca,

        @PastOrPresent(message = "A data de nascimento não pode ser no futuro.")
        LocalDate dataNascimento
) {}