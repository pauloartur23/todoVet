package br.edu.ufersa.todoVet.features.pet;

import br.edu.ufersa.todoVet.features.pet.dto.PetCreate;
import br.edu.ufersa.todoVet.features.pet.dto.PetResponse;
import br.edu.ufersa.todoVet.features.pet.dto.PetUpdate;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pets")
public class PetController {

    private final PetApplicationService applicationService;

    public PetController(PetApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<PetResponse>> listarTodos() {
        return ResponseEntity.ok(applicationService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<PetResponse> criar(@RequestBody @Valid PetCreate novoPet) {
        PetResponse response = applicationService.criar(novoPet);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetResponse> atualizar(@PathVariable Long id, @RequestBody @Valid PetUpdate petAtualizado) {
        return ResponseEntity.ok(applicationService.atualizar(id, petAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        applicationService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}