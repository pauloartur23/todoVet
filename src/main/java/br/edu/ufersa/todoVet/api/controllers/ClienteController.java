package br.edu.ufersa.todoVet.api.controllers;

import br.edu.ufersa.todoVet.api.dtos.ClienteRequestDTO;
import br.edu.ufersa.todoVet.api.dtos.ClienteResponseDTO;
import br.edu.ufersa.todoVet.api.dtos.PetResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clientes")
public class ClienteController {

    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> listarTodos() {
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> buscarPorId(@PathVariable Long id) {
        return null;
    }

    @PostMapping
    public ResponseEntity<ClienteResponseDTO> criar(@RequestBody @Valid ClienteRequestDTO novoCliente) {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid ClienteRequestDTO clienteAtualizado) {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return null;
    }

    // Recurso aninhado - RESTful: pets pertencem ao cliente
    @GetMapping("/{id}/pets")
    public ResponseEntity<List<PetResponseDTO>> listarPets(@PathVariable Long id) {
        return null;
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ClienteResponseDTO>> buscarPorNome(@RequestParam String nome) {
        return null;
    }
}
