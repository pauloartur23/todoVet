package br.edu.ufersa.todoVet.features.cliente;

import br.edu.ufersa.todoVet.features.cliente.dtos.ClienteRequestDTO;
import br.edu.ufersa.todoVet.features.cliente.dtos.ClienteResponseDTO;
import br.edu.ufersa.todoVet.features.pet.dtos.PetResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clientes")
public class ClienteController {

    private final ClienteApplicationService applicationService;

    public ClienteController(ClienteApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> listarTodos() {
        return ResponseEntity.ok(applicationService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.buscarPorId(id));
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ClienteResponseDTO>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(applicationService.buscarPorNome(nome));
    }

    @PostMapping
    public ResponseEntity<ClienteResponseDTO> criar(@RequestBody @Valid ClienteRequestDTO novoCliente) {
        ClienteResponseDTO response = applicationService.criar(novoCliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid ClienteRequestDTO clienteAtualizado) {
        return ResponseEntity.ok(applicationService.atualizar(id, clienteAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        applicationService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/pets")
    public ResponseEntity<List<PetResponseDTO>> listarPets(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.listarPetsDoCliente(id));
    }
}