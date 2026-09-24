package br.edu.ufersa.todoVet.features.venda;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "tb_vendas")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cliente_id", nullable = false)
    private Long clienteId;

    @Column(name = "produto_id", nullable = false)
    private Long produtoId;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valorTotal;

    @Column(nullable = false)
    private LocalDate data;

    protected Venda() {}

    public Venda(Long clienteId, Long produtoId, Integer quantidade, BigDecimal precoUnitario) {
        this.clienteId = Objects.requireNonNull(clienteId, "O cliente é obrigatório.");
        this.produtoId = Objects.requireNonNull(produtoId, "O produto é obrigatório.");
        if (quantidade == null || quantidade <= 0) {
            throw new IllegalArgumentException("A quantidade deve ser maior que zero.");
        }
        if (precoUnitario == null || precoUnitario.signum() < 0) {
            throw new IllegalArgumentException("O preço unitário não pode ser negativo.");
        }
        this.quantidade = quantidade;
        this.valorTotal = precoUnitario.multiply(BigDecimal.valueOf(quantidade));
        this.data = LocalDate.now();
    }

    public Long getId() { return id; }
    public Long getClienteId() { return clienteId; }
    public Long getProdutoId() { return produtoId; }
    public Integer getQuantidade() { return quantidade; }
    public BigDecimal getValorTotal() { return valorTotal; }
    public LocalDate getData() { return data; }
}