package br.edu.ufersa.todoVet.features.cliente.dtos;

public record ClienteResponseDTO(
        Long id,
        String nome,
        String email,
        String telefone,
        String endereco
) {}
