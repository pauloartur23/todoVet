package br.edu.ufersa.todoVet.features.vacina;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "tb_vacinas")
class Vacina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pet_id", nullable = false)
    private Long petId;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "data_aplicacao", nullable = false)
    private LocalDate dataAplicacao;

    @Column(name = "proxima_dose")
    private LocalDate proximaDose;

    @Column(length = 60)
    private String lote;

    @Column(name = "veterinario_responsavel", length = 120)
    private String veterinarioResponsavel;

    protected Vacina() {}

    private Vacina(Builder builder) {
        this.petId = builder.petId;
        this.nome = builder.nome;
        this.dataAplicacao = builder.dataAplicacao;
        this.proximaDose = builder.proximaDose;
        this.lote = builder.lote;
        this.veterinarioResponsavel = builder.veterinarioResponsavel;
    }

    public void atualizarProximaDose(LocalDate novaData) {
        if (novaData != null && novaData.isBefore(this.dataAplicacao)) {
            throw new IllegalArgumentException("A próxima dose não pode ser anterior à data de aplicação.");
        }
        this.proximaDose = novaData;
    }

    public Long getId() { return id; }
    public Long getPetId() { return petId; }
    public String getNome() { return nome; }
    public LocalDate getDataAplicacao() { return dataAplicacao; }
    public LocalDate getProximaDose() { return proximaDose; }
    public String getLote() { return lote; }
    public String getVeterinarioResponsavel() { return veterinarioResponsavel; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Vacina vacina)) return false;
        return id != null && id.equals(vacina.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(petId, nome);
    }

    static class Builder {
        private final Long petId;
        private final String nome;
        private LocalDate dataAplicacao = LocalDate.now();
        private LocalDate proximaDose;
        private String lote;
        private String veterinarioResponsavel;

        Builder(Long petId, String nome) {
            this.petId = Objects.requireNonNull(petId, "O pet é obrigatório.");
            if (nome == null || nome.isBlank()) {
                throw new IllegalArgumentException("O nome da vacina é obrigatório.");
            }
            this.nome = nome;
        }

        Builder comDataAplicacao(LocalDate data) { this.dataAplicacao = data; return this; }
        Builder comProximaDose(LocalDate data) { this.proximaDose = data; return this; }
        Builder comLote(String lote) { this.lote = lote; return this; }
        Builder comVeterinarioResponsavel(String nome) { this.veterinarioResponsavel = nome; return this; }

        Vacina build() {
            if (proximaDose != null && proximaDose.isBefore(dataAplicacao)) {
                throw new IllegalArgumentException("A próxima dose não pode ser anterior à data de aplicação.");
            }
            return new Vacina(this);
        }
    }
}