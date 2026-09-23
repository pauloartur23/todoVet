package br.edu.ufersa.todoVet.features.pet;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "tb_pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String nome;

    @Column(nullable = false, length = 60)
    private String especie;

    @Column(length = 60)
    private String raca;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_tutor", nullable = false)
    private Tutor tutor;

    protected Pet() {}

    public Pet(Tutor tutor, String nome, String especie, String raca, LocalDate dataNascimento) {
        this.tutor = Objects.requireNonNull(tutor, "O tutor é obrigatório para registrar um pet.");
        this.nome = Objects.requireNonNull(nome, "O nome do pet é obrigatório.");
        this.especie = Objects.requireNonNull(especie, "A espécie é obrigatória.");
        this.raca = raca;
        this.dataNascimento = dataNascimento;
    }

    public void atualizar(String nome, String raca, LocalDate dataNascimento) {
        if (nome != null && !nome.isBlank()) this.nome = nome;
        this.raca = raca;
        this.dataNascimento = dataNascimento;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEspecie() { return especie; }
    public String getRaca() { return raca; }
    public LocalDate getDataNascimento() { return dataNascimento; }
    public Tutor getTutor() { return tutor; }
}