package br.edu.ufersa.todoVet.features.funcionario;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    List<Funcionario> findByCargoIgnoreCase(String cargo);
    List<Funcionario> findByNomeContainingIgnoreCase(String nome);;
}