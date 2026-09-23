package br.edu.ufersa.todoVet.features.funcionario;

public record FuncionarioResponseDTO(
        Long id,
        String nome,
        String email,
        String telefone
        //TipoAcesso tipoAcesso
) {
}
