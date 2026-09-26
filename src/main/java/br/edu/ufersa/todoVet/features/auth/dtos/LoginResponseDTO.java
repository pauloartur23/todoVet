package br.edu.ufersa.todoVet.features.auth.dtos;

public record LoginResponseDTO(
        String token,
        String nome
        //TipoAcesso tipoAcesso
) {
}
