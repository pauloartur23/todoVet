package br.edu.ufersa.todoVet.features.pet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record PetCreateDTO(
        @NotNull(message = "O ID do cliente/tutor é obrigatório.")
        @Positive(message = "ID do cliente inválido.")
        Long clienteId,

        @NotBlank(message = "O nome do pet é obrigatório.")
        @Size(min = 2, max = 80, message = "O nome deve ter entre 2 e 80 caracteres.")
        String nome,

        @NotBlank(message = "A espécie é obrigatória.")
        @Size(max = 60, message = "A espécie deve ter no máximo 60 caracteres.")
        String especie,

        @Size(max = 60, message = "A raça deve ter no máximo 60 caracteres.")
        String raca,

        @PastOrPresent(message = "A data de nascimento não pode ser no futuro.")
        LocalDate dataNascimento
) {}