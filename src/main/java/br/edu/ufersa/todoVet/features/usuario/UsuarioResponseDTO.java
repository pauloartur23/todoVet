package br.edu.ufersa.todoVet.features.usuario;

public record UsuarioResponseDTO(
        Long id,
        String nome,
        String email,
        String telefone
        //TipoAcesso tipoAcesso
) {
}
