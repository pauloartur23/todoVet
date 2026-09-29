package br.edu.ufersa.todoVet.features.cliente;

import br.edu.ufersa.todoVet.features.auth.Email;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findByNomeContainingIgnoreCase(String nome);
    Optional<Cliente> findByEmail(Email email);
    boolean existsByEmail(Email email);
}