package br.edu.ufersa.todoVet.api.dtos.pet;

import java.time.LocalDate;

public record PetResponse(
        Long id,
        Long tutorId,
        String nome,
        String especie,
        String raca,
        LocalDate dataNascimento
) {}