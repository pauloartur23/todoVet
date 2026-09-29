package br.edu.ufersa.todoVet.features.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByClienteId(Long clienteId);
    boolean existsByClienteIdAndNomeIgnoreCaseAndEspecieIgnoreCase(Long clienteId, String nome, String especie);
    boolean existsByClienteId(Long clienteId);
}