package br.edu.ufersa.todoVet.features.pet.dto;

import java.time.LocalDate;

public record PetResponseDTO(
        Long id,
        Long clienteId,
        String nome,
        String especie,
        String raca,
        LocalDate dataNascimento
) {}