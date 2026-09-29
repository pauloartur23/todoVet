package br.edu.ufersa.todoVet.features.venda;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record VendaRequestDTO(
        @NotNull(message = "O ID do cliente é obrigatório.")
        @Positive(message = "ID do cliente inválido.")
        Long clienteId,

        @NotNull(message = "O ID do produto é obrigatório.")
        @Positive(message = "ID do produto inválido.")
        Long produtoId,

        @NotNull(message = "A quantidade é obrigatória.")
        @Positive(message = "A quantidade deve ser maior que zero.")
        Integer quantidade
) {}