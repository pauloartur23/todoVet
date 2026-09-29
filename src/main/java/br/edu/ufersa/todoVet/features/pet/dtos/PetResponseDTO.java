package br.edu.ufersa.todoVet.features.pet.dtos;

import br.edu.ufersa.todoVet.features.pet.Pet;
import java.time.LocalDate;

public record PetResponseDTO(
        Long id,
        Long clienteId,
        String nome,
        String especie,
        String raca,
        LocalDate dataNascimento
) {
    public static PetResponseDTO fromEntity(Pet pet) {
        return new PetResponseDTO(
                pet.getId(),
                pet.getCliente().getId(),
                pet.getNome(),
                pet.getEspecie(),
                pet.getRaca(),
                pet.getDataNascimento()
        );
    }
}