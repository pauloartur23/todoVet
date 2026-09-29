package br.edu.ufersa.todoVet.features.funcionario.dtos;

import br.edu.ufersa.todoVet.features.funcionario.Cargo;

public record FuncionarioResponseDTO(
        Long id,
        String nome,
        String email,
        String telefone,
        Cargo cargo

) {
}
