package br.edu.ufersa.todoVet.api.dtos;

public record UsuarioResponseDTO(
        Long id,
        String nome,
        String email,
        String telefone
        //TipoAcesso tipoAcesso
) {
}
