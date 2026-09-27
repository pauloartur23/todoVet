package br.edu.ufersa.todoVet.features.funcionario;

import br.edu.ufersa.todoVet.features.auth.Email;
import br.edu.ufersa.todoVet.features.auth.Senha;
import br.edu.ufersa.todoVet.features.auth.UserRole;
import br.edu.ufersa.todoVet.features.auth.Usuario;
import jakarta.persistence.*;

@Entity
@Table(name = "tb_funcionarios")
public class Funcionario extends Usuario {

    @Column(name = "cargo", nullable = false)
    private String cargo;

    protected Funcionario() {
        super();
    }

    public Funcionario(String nome, Email email, Senha senha, String telefone, String cargo) {
        super(nome, email, senha, telefone, UserRole.USER);
        this.cargo = cargo;
    }

    public String getCargo() {
        return cargo;
    }

    public void atualizarCargo(String cargo) {
        this.cargo = cargo;
    }
}
