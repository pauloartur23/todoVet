package br.edu.ufersa.todoVet.features.pagamento;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PagamentoResponse(
        Long id,
        Long agendamentoId,
        BigDecimal valor,
        FormaPagamento formaPagamento,
        StatusPagamento status,
        LocalDateTime dataPagamento
) {
    public static PagamentoResponse fromEntity(Pagamento pagamento) {
        return new PagamentoResponse(
                pagamento.getId(),
                pagamento.getAgendamentoId(),
                pagamento.getValor(),
                pagamento.getFormaPagamento(),
                pagamento.getStatus(),
                pagamento.getDataPagamento()
        );
    }
}