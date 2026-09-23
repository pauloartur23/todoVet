package br.edu.ufersa.todoVet.features.auth;

import br.edu.ufersa.todoVet.features.funcionario.FuncionarioResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO credenciais) {
        return null;
    }

    @PostMapping("/registrar")
    public ResponseEntity<FuncionarioResponseDTO> registrar(@RequestBody @Valid CadastroRequestDTO novoUsuario) {
        return null;
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return null;
    }
}
