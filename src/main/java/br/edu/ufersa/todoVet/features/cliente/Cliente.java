package br.edu.ufersa.todoVet.features.cliente;

import br.edu.ufersa.todoVet.features.auth.Email;
import br.edu.ufersa.todoVet.features.auth.Usuario;
import jakarta.persistence.*;

@Entity
@Table(name = "tb_clientes")
public class Cliente extends Usuario {

    @Column
    private String endereco;

    protected Cliente() {
        super();
    }

    public Cliente(String nome, Email email, String senha, String telefone, String endereco) {
        super(nome, email, senha, telefone);
        this.endereco = endereco;
    }

    public String getEndereco() {
        return endereco;
    }

    public void atualizarEndereco(String endereco) {
        this.endereco = endereco;
    }
}
