package br.edu.ufersa.todoVet.api.dtos;

public record LoginResponseDTO(
        String token,
        String nome
        //TipoAcesso tipoAcesso
) {
}
