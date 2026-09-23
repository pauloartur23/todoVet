package br.edu.ufersa.todoVet.shared;

import jakarta.persistence.Embeddable;

@Embeddable
public record Email(String endereco) {
    public Email{
        if(endereco == null || !endereco.contains("@"))
            throw new IllegalArgumentException("O endereço de email é inválido!");
    }
}
