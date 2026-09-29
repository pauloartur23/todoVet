package br.edu.ufersa.todoVet.features.pet.dto;

import br.edu.ufersa.todoVet.features.pet.Pet;
import java.time.LocalDate;

public record PetResponse(
        Long id,
        Long clienteId,
        String nome,
        String especie,
        String raca,
        LocalDate dataNascimento
) {
    public static PetResponse fromEntity(Pet pet) {
        return new PetResponse(
                pet.getId(),
                pet.getCliente().getId(),
                pet.getNome(),
                pet.getEspecie(),
                pet.getRaca(),
                pet.getDataNascimento()
        );
    }
}