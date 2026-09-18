package br.edu.ufersa.todoVet.features.produto;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByNomeContainingIgnoreCase(String nome);
}