package br.edu.ufersa.todoVet.domain.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "tb_prontuarios")
public class Prontuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_pet", nullable = false)
    private Pet pet;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_veterinario", nullable = false)
    private Veterinario veterinario;

    @Column(nullable = false)
    private LocalDateTime dataRegistro;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @Column(columnDefinition = "TEXT")
    private String prescricao;

    protected Prontuario() {}

    public Prontuario(Pet pet, Veterinario veterinario, String descricao, String prescricao) {
        this.pet = Objects.requireNonNull(pet, "O pet é obrigatório para registrar prontuário.");
        this.veterinario = Objects.requireNonNull(veterinario, "O veterinário é obrigatório.");
        this.descricao = Objects.requireNonNull(descricao, "A descrição do atendimento é obrigatória.");
        this.prescricao = prescricao;
        this.dataRegistro = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public Pet getPet() { return pet; }
    public Veterinario getVeterinario() { return veterinario; }
    public LocalDateTime getDataRegistro() { return dataRegistro; }
    public String getDescricao() { return descricao; }
    public String getPrescricao() { return prescricao; }
}