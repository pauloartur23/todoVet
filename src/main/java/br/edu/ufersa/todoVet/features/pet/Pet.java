package br.edu.ufersa.todoVet.features.pet;

import br.edu.ufersa.todoVet.features.cliente.Cliente;
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
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    protected Pet() {}

    public Pet(Cliente cliente, String nome, String especie, String raca, LocalDate dataNascimento) {
        this.cliente = Objects.requireNonNull(cliente, "O cliente/tutor é obrigatório.");
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
    public Cliente getCliente() { return cliente; }
}