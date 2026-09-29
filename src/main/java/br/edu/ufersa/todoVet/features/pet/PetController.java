package br.edu.ufersa.todoVet.features.pet;

import br.edu.ufersa.todoVet.features.pet.dto.PetCreateDTO;
import br.edu.ufersa.todoVet.features.pet.dto.PetResponseDTO;
import br.edu.ufersa.todoVet.features.pet.dto.PetUpdateDTO;
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
    public ResponseEntity<List<PetResponseDTO>> listarTodos() {
        return ResponseEntity.ok(applicationService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<PetResponseDTO> criar(@RequestBody @Valid PetCreateDTO novoPet) {
        PetResponseDTO response = applicationService.criar(novoPet);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid PetUpdateDTO petAtualizado) {
        return ResponseEntity.ok(applicationService.atualizar(id, petAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        applicationService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}