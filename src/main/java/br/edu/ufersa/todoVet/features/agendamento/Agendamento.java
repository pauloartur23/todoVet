package br.edu.ufersa.todoVet.features.agendamento;

import br.edu.ufersa.todoVet.features.funcionario.Funcionario;
import br.edu.ufersa.todoVet.features.pet.Pet;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

@Entity
@Table(name = "tb_agendamentos")
public class Agendamento {

    public enum Status { AGENDADO, CONCLUIDO, CANCELADO }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_pet", nullable = false)
    private Pet pet;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_veterinario", nullable = false)
    private Funcionario veterinario;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private LocalTime hora;

    @Column(nullable = false, length = 200)
    private String motivo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    protected Agendamento() {}

    public Agendamento(Pet pet, Funcionario veterinario, LocalDate data, LocalTime hora, String motivo) {
        this.pet = Objects.requireNonNull(pet, "O pet é obrigatório.");
        this.veterinario = Objects.requireNonNull(veterinario, "O veterinário responsável é obrigatório.");
        if (data == null || data.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("A data do agendamento deve ser futura.");
        }
        this.data = data;
        this.hora = Objects.requireNonNull(hora, "O horário é obrigatório.");
        this.motivo = Objects.requireNonNull(motivo, "O motivo é obrigatório.");
        this.status = Status.AGENDADO;
    }

    public void cancelar() {
        if (this.status == Status.CONCLUIDO)
            throw new IllegalStateException("Não é possível cancelar um agendamento já concluído.");
        this.status = Status.CANCELADO;
    }

    public void concluir() {
        if (this.status == Status.CANCELADO)
            throw new IllegalStateException("Não é possível concluir um agendamento cancelado.");
        this.status = Status.CONCLUIDO;
    }

    public Long getId() { return id; }
    public Pet getPet() { return pet; }
    public Funcionario getVeterinario() { return veterinario; }
    public LocalDate getData() { return data; }
    public LocalTime getHora() { return hora; }
    public String getMotivo() { return motivo; }
    public Status getStatus() { return status; }
}