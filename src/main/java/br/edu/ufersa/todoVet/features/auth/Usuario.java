package br.edu.ufersa.todoVet.features.auth;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "tb_usuario")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(nullable = false)
    protected String nome;

    @Embedded
    protected Email email;

    @Embedded
    protected Senha password;

    @Column(nullable = false)
    protected String telefone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    protected UserRole role;

    protected Usuario() {
        // construtor vazio exigido pelo JPA/Hibernate
    }

    protected Usuario(String nome, Email email, Senha password, String telefone, UserRole role) {
        this.nome = nome;
        this.email = Objects.requireNonNull(email, "O e-mail é obrigatório e não pode ser nulo.");
        this.password = password;
        this.telefone = telefone;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_USER")
            ); }
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        // Retorna a String contida dentro do record Senha
        return this.password != null ? this.password.segredo() : null;
    }

    @Override
    public String getUsername() {
        // Retorna a String contida dentro do record Email
        return this.email != null ? this.email.endereco() : null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId() {return id;}
    public String getNome() {return nome;}
    public Email getEmail() {return email;}
    public String getTelefone() {return telefone;}
    public UserRole getRole(){return role;}

    public void atualizarPerfil(String nome, String telefone) {
        this.nome = nome;
        this.telefone = telefone;
    }

    public void atualizarEmail(Email novoEmail) {
        this.email = novoEmail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Usuario usuario)) return false;
        return id != null && id.equals(usuario.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
