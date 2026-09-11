package br.edu.ufersa.todoVet.api.controllers;

import br.edu.ufersa.todoVet.api.dtos.CadastroRequestDTO;
import br.edu.ufersa.todoVet.api.dtos.LoginRequestDTO;
import br.edu.ufersa.todoVet.api.dtos.LoginResponseDTO;
import br.edu.ufersa.todoVet.api.dtos.UsuarioResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO credenciais) {
        return null;
    }

    @PostMapping("/registrar")
    public ResponseEntity<UsuarioResponseDTO> registrar(@RequestBody @Valid CadastroRequestDTO novoUsuario) {
        return null;
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return null;
    }
}
