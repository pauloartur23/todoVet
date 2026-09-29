package br.edu.ufersa.todoVet.features.pagamento.dto;

import br.edu.ufersa.todoVet.features.pagamento.FormaPagamento;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public record PagamentoCreateDTO(
        @NotNull(message = "O valor é obrigatório.")
        @Positive(message = "O valor deve ser maior que zero.")
        BigDecimal valor,

        @NotNull(message = "A forma de pagamento é obrigatória.")
        FormaPagamento formaPagamento
) {
}