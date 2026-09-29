package br.edu.ufersa.todoVet.features.funcionario.dtos;

import br.edu.ufersa.todoVet.features.funcionario.Cargo;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record FuncionarioUpdateDTO(
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @NotBlank(message = "Telefone é obrigatório")
        String telefone,

         @NotBlank(message = "Cargo é obrigatório")
        Cargo cargo
) {
}