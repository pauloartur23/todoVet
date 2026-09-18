package br.edu.ufersa.todoVet.features.pagamento;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    List<Pagamento> findByAgendamentoId(Long agendamentoId);
}