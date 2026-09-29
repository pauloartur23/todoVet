package br.edu.ufersa.todoVet.features.venda;

import java.math.BigDecimal;
import java.time.LocalDate;

public record VendaResponseDTO(
        Long id,
        Long clienteId,
        String clienteNome,
        Long produtoId,
        String produtoNome,
        Integer quantidade,
        BigDecimal valorTotal,
        LocalDate data
) {}