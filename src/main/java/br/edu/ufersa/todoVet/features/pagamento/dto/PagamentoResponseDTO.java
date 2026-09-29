package br.edu.ufersa.todoVet.features.pagamento.dto;

import br.edu.ufersa.todoVet.features.pagamento.FormaPagamento;
import br.edu.ufersa.todoVet.features.pagamento.Pagamento;
import br.edu.ufersa.todoVet.features.pagamento.StatusPagamento;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PagamentoResponseDTO(
        Long id,
        Long agendamentoId,
        BigDecimal valor,
        FormaPagamento formaPagamento,
        StatusPagamento status,
        LocalDateTime dataPagamento
) {
    public static PagamentoResponseDTO fromEntity(Pagamento pagamento) {
        return new PagamentoResponseDTO(
                pagamento.getId(),
                pagamento.getAgendamentoId(),
                pagamento.getValor(),
                pagamento.getFormaPagamento(),
                pagamento.getStatus(),
                pagamento.getDataPagamento()
        );
    }
}