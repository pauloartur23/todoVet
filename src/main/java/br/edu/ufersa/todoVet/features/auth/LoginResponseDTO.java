package br.edu.ufersa.todoVet.features.auth;

public record LoginResponseDTO(
        String token,
        String nome
        //TipoAcesso tipoAcesso
) {
}
