
package br.edu.ufersa.todoVet.features.vacina;


import br.edu.ufersa.todoVet.features.vacina.dto.VacinaCreateDTO;
import br.edu.ufersa.todoVet.features.vacina.dto.VacinaPatchDTO;
import br.edu.ufersa.todoVet.features.vacina.dto.VacinaResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pets/{petId}/vacinas")
public class VacinaController {

    @GetMapping
    public ResponseEntity<List<VacinaResponseDTO>> listarPorPet(@PathVariable Long petId) {
        return null;
    }

    @GetMapping("/{vacinaId}")
    public ResponseEntity<VacinaResponseDTO> buscarPorId(
            @PathVariable Long petId,
            @PathVariable Long vacinaId) {
        return null;
    }

    @PostMapping
    public ResponseEntity<VacinaResponseDTO> registrar(
            @PathVariable Long petId,
            @RequestBody @Valid VacinaCreateDTO dto,
            UriComponentsBuilder uriBuilder) {

        URI uri = uriBuilder
                .path("/api/v1/pets/{petId}/vacinas/{vacinaId}")
                .buildAndExpand(petId, 1L)
                .toUri();

        return ResponseEntity.created(uri).body(null);
    }

    @PatchMapping("/{vacinaId}")
    public ResponseEntity<VacinaResponseDTO> atualizarProximaDose(
            @PathVariable Long petId,
            @PathVariable Long vacinaId,
            @RequestBody @Valid VacinaPatchDTO dto) {
        return null;
    }

    @DeleteMapping("/{vacinaId}")
    public ResponseEntity<Void> remover(
            @PathVariable Long petId,
            @PathVariable Long vacinaId) {
        return ResponseEntity.noContent().build();
    }
}