package br.edu.ufersa.todoVet.features.auth;

import jakarta.persistence.Column;

public record Senha(
        @Column(name = "senha", nullable = false)
        String segredo) {
    public Senha{
        if(segredo==null || segredo.isBlank())
            throw new IllegalArgumentException("A senha é obrigatória!");
        if (segredo.length()<6)
            throw new IllegalArgumentException("A senha deve possuir 6 dígitos ou mais!");
    }
}
