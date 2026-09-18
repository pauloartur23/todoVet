package br.edu.ufersa.todoVet.features.pagamento;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "tb_pagamentos")
class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "agendamento_id", nullable = false)
    private Long agendamentoId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "forma_pagamento", nullable = false, length = 20)
    private FormaPagamento formaPagamento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusPagamento status;

    @Column(name = "data_pagamento", nullable = false)
    private LocalDateTime dataPagamento;

    protected Pagamento() {}

    private Pagamento(Builder builder) {
        this.agendamentoId = builder.agendamentoId;
        this.valor = builder.valor;
        this.formaPagamento = builder.formaPagamento;
        this.status = StatusPagamento.CONFIRMADO;
        this.dataPagamento = builder.dataPagamento;
    }

    public void estornar() {
        if (this.status == StatusPagamento.ESTORNADO) {
            throw new IllegalStateException("Este pagamento já foi estornado.");
        }
        this.status = StatusPagamento.ESTORNADO;
    }

    public Long getId() { return id; }
    public Long getAgendamentoId() { return agendamentoId; }
    public BigDecimal getValor() { return valor; }
    public FormaPagamento getFormaPagamento() { return formaPagamento; }
    public StatusPagamento getStatus() { return status; }
    public LocalDateTime getDataPagamento() { return dataPagamento; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Pagamento that)) return false;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(agendamentoId, valor);
    }

    static class Builder {
        private final Long agendamentoId;
        private final BigDecimal valor;
        private FormaPagamento formaPagamento;
        private LocalDateTime dataPagamento = LocalDateTime.now();

        Builder(Long agendamentoId, BigDecimal valor) {
            this.agendamentoId = Objects.requireNonNull(agendamentoId, "O agendamento é obrigatório.");
            if (valor == null || valor.signum() <= 0) {
                throw new IllegalArgumentException("O valor do pagamento deve ser maior que zero.");
            }
            this.valor = valor;
        }

        Builder comFormaPagamento(FormaPagamento forma) { this.formaPagamento = forma; return this; }
        Builder comDataPagamento(LocalDateTime data) { this.dataPagamento = data; return this; }

        Pagamento build() {
            if (formaPagamento == null) {
                throw new IllegalArgumentException("A forma de pagamento é obrigatória.");
            }
            return new Pagamento(this);
        }
    }
}