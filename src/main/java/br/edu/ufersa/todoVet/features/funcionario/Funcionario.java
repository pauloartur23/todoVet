package br.edu.ufersa.todoVet.features.funcionario;

import br.edu.ufersa.todoVet.features.auth.Email;
import br.edu.ufersa.todoVet.features.auth.Senha;
import br.edu.ufersa.todoVet.features.auth.UserRole;
import br.edu.ufersa.todoVet.features.auth.Usuario;
import jakarta.persistence.*;

@Entity
@Table(name = "tb_funcionarios")
public class Funcionario extends Usuario {

    @Enumerated(EnumType.STRING)
    @Column(name = "cargo", nullable = false)
    private Cargo cargo;

    protected Funcionario() {
        super();
    }

    public Funcionario(String nome, Email email, Senha senha, String telefone, Cargo cargo) {
        super(nome, email, senha, telefone, UserRole.USER);
        this.cargo = cargo;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void atualizarCargo(Cargo cargo) {
        this.cargo = cargo;
    }
}
