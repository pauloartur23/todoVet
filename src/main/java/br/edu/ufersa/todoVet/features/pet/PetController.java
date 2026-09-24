package br.edu.ufersa.todoVet.features.pet;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pets")
public class PetController {

    @GetMapping
    public ResponseEntity<List<PetResponseDTO>> listarTodos() {
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetResponseDTO> buscarPorId(@PathVariable Long id) {
        return null;
    }

    @PostMapping
    public ResponseEntity<PetResponseDTO> criar(@RequestBody @Valid PetRequestDTO novoPet) {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid PetRequestDTO petAtualizado) {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return null;
    }
}
