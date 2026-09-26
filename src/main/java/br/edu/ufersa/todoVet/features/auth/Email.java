package br.edu.ufersa.todoVet.features.auth;

import jakarta.persistence.*;

@Embeddable
public record Email(
        @Column(name = "email", nullable = false, unique = true)
        String endereco
) {
    public Email{
        if(endereco == null || !endereco.contains("@"))
            throw new IllegalArgumentException("O endereço de email é inválido!");
    }
}
