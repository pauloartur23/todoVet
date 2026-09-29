package br.edu.ufersa.todoVet.features.vacina;


import br.edu.ufersa.todoVet.features.vacina.dtos.VacinaCreateDTO;
import br.edu.ufersa.todoVet.features.vacina.dtos.VacinaPatchDTO;
import br.edu.ufersa.todoVet.features.vacina.dtos.VacinaResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pets/{petId}/vacinas")
public class VacinaController {

    private final VacinaApplicationService applicationService;

    public VacinaController(VacinaApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<VacinaResponseDTO>> listarPorPet(@PathVariable Long petId) {
        return ResponseEntity.ok(applicationService.listarPorPet(petId));
    }

    @GetMapping("/{vacinaId}")
    public ResponseEntity<VacinaResponseDTO> buscarPorId(
            @PathVariable Long petId,
            @PathVariable Long vacinaId) {
        return ResponseEntity.ok(applicationService.buscarPorId(petId, vacinaId));
    }

    @PostMapping
    public ResponseEntity<VacinaResponseDTO> registrar(
            @PathVariable Long petId,
            @RequestBody @Valid VacinaCreateDTO dto,
            UriComponentsBuilder uriBuilder) {

        VacinaResponseDTO salva = applicationService.registrar(petId, dto);

        URI uri = uriBuilder
                .path("/api/v1/pets/{petId}/vacinas/{vacinaId}")
                .buildAndExpand(petId, salva.id())
                .toUri();

        return ResponseEntity.created(uri).body(salva);
    }

    @PatchMapping("/{vacinaId}")
    public ResponseEntity<VacinaResponseDTO> atualizarProximaDose(
            @PathVariable Long petId,
            @PathVariable Long vacinaId,
            @RequestBody @Valid VacinaPatchDTO dto) {
        return ResponseEntity.ok(applicationService.atualizarProximaDose(petId, vacinaId, dto));
    }

    @DeleteMapping("/{vacinaId}")
    public ResponseEntity<Void> remover(
            @PathVariable Long petId,
            @PathVariable Long vacinaId) {
        applicationService.deletar(petId, vacinaId);
        return ResponseEntity.noContent().build();
    }
}