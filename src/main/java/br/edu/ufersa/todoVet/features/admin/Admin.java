package br.edu.ufersa.todoVet.features.admin;

import br.edu.ufersa.todoVet.features.auth.Email;
import br.edu.ufersa.todoVet.features.auth.Senha;
import br.edu.ufersa.todoVet.features.auth.UserRole;
import br.edu.ufersa.todoVet.features.auth.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_admin")
public class Admin extends Usuario {
    protected Admin() {}

    public Admin(String nome, Email email, Senha senha, String telefone) {
        super(nome, email, senha, telefone, UserRole.ADMIN);
    }
}
