package br.edu.ufersa.todoVet.features.produto;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "tb_produtos")
class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(length = 500)
    private String descricao;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(name = "quantidade_estoque", nullable = false)
    private Integer quantidadeEstoque;

    protected Produto() {}

    private Produto(Builder builder) {
        this.nome = builder.nome;
        this.descricao = builder.descricao;
        this.preco = builder.preco;
        this.quantidadeEstoque = builder.quantidadeEstoque;
    }

    public void atualizar(String nome, String descricao, BigDecimal preco, Integer quantidadeEstoque) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("O nome do produto é obrigatório.");
        }
        if (preco == null || preco.signum() < 0) {
            throw new IllegalArgumentException("O preço não pode ser negativo.");
        }
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public void baixarEstoque(int quantidade) {
        if (quantidade <= 0) {
            throw new IllegalArgumentException("A quantidade a baixar deve ser positiva.");
        }
        if (this.quantidadeEstoque < quantidade) {
            throw new IllegalStateException("Estoque insuficiente para o produto '" + nome + "'.");
        }
        this.quantidadeEstoque -= quantidade;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getDescricao() { return descricao; }
    public BigDecimal getPreco() { return preco; }
    public Integer getQuantidadeEstoque() { return quantidadeEstoque; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Produto produto)) return false;
        return id != null && id.equals(produto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nome);
    }

    static class Builder {
        private final String nome;
        private String descricao;
        private BigDecimal preco = BigDecimal.ZERO;
        private Integer quantidadeEstoque = 0;

        Builder(String nome) {
            if (nome == null || nome.isBlank()) {
                throw new IllegalArgumentException("O nome do produto é obrigatório.");
            }
            this.nome = nome;
        }

        Builder comDescricao(String descricao) { this.descricao = descricao; return this; }
        Builder comPreco(BigDecimal preco) { this.preco = preco; return this; }
        Builder comQuantidadeEstoque(Integer quantidade) { this.quantidadeEstoque = quantidade; return this; }

        Produto build() {
            if (preco == null || preco.signum() < 0) {
                throw new IllegalArgumentException("O preço não pode ser negativo.");
            }
            return new Produto(this);
        }
    }
}