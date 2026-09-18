package br.edu.ufersa.todoVet.domain.repositories;

import br.edu.ufersa.todoVet.domain.entities.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByTutorId(Long tutorId);
    Optional<Pet> findByIdAndTutorId(Long id, Long tutorId);
}