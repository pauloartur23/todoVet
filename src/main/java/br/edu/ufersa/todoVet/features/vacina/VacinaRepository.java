package br.edu.ufersa.todoVet.features.vacina;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

interface VacinaRepository extends JpaRepository<Vacina, Long> {
    List<Vacina> findByPetId(Long petId);
}