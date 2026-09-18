package br.edu.ufersa.todoVet.domain.repositories;

import br.edu.ufersa.todoVet.domain.entities.Prontuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProntuarioRepository extends JpaRepository<Prontuario, Long> {
    List<Prontuario> findByPetIdOrderByDataRegistroDesc(Long petId);
    Optional<Prontuario> findByIdAndPetId(Long id, Long petId);
}