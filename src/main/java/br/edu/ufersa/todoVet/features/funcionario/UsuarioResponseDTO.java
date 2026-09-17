package br.edu.ufersa.todoVet.features.funcionario;

public record UsuarioResponseDTO(
        Long id,
        String nome,
        String email,
        String telefone
        //TipoAcesso tipoAcesso
) {
}
