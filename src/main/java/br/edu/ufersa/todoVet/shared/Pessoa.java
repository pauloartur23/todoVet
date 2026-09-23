package br.edu.ufersa.todoVet.shared;

import jakarta.persistence.*;

@MappedSuperclass
public abstract class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(nullable = false)
    protected String nome;

    @Embedded
    @AttributeOverride(name = "valor", column = @Column(name = "email", nullable = false, unique = true))
    protected Email email;

    @Column(nullable = false)
    protected String senha;

    @Column(nullable = false)
    protected String telefone;

    protected Pessoa() {
        // construtor vazio exigido pelo JPA/Hibernate
    }

    protected Pessoa(String nome, Email email, String senha, String telefone) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
    }

    public Long getId() {return id;}
    public String getNome() {return nome;}
    public Email getEmail() {return email;}
    public String getSenha() {return senha;}
    public String getTelefone() {return telefone;}

    public void atualizarDadosBasicos(String nome, String telefone) {
        this.nome = nome;
        this.telefone = telefone;
    }

    public void atualizarEmail(Email novoEmail) {
        this.email = novoEmail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Pessoa pessoa)) return false;
        return id != null && id.equals(pessoa.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
