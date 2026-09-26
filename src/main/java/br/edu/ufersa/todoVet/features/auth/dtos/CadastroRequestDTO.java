package br.edu.ufersa.todoVet.features.auth.dtos;

import br.edu.ufersa.todoVet.features.auth.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CadastroRequestDTO(
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Email inválido")
        String email,

        @NotBlank(message = "Senha é obrigatória")
        @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
        String senha,

        @NotBlank(message = "Telefone é obrigatório")
        String telefone

        //@NotNull(message = "Tipo de acesso é obrigatório")
        //TipoAcesso tipoAcesso
) {
}
