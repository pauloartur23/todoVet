package br.edu.ufersa.todoVet.features.prontuario;

import br.edu.ufersa.todoVet.features.prontuario.dtos.ProntuarioCreateDTO;
import br.edu.ufersa.todoVet.features.prontuario.dtos.ProntuarioResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pets/{petId}/prontuarios")
public class ProntuarioController {

    private final ProntuarioApplicationService applicationService;

    public ProntuarioController(ProntuarioApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<ProntuarioResponseDTO>> listarPorPet(@PathVariable Long petId) {
        return ResponseEntity.ok(applicationService.listarPorPet(petId));
    }

    @GetMapping("/{prontuarioId}")
    public ResponseEntity<ProntuarioResponseDTO> buscarPorId(@PathVariable Long petId,
                                                             @PathVariable Long prontuarioId) {
        return ResponseEntity.ok(applicationService.buscarPorId(petId, prontuarioId));
    }

    @PostMapping
    public ResponseEntity<ProntuarioResponseDTO> registrar(@PathVariable Long petId,
                                                           @RequestBody @Valid ProntuarioCreateDTO dto,
                                                           UriComponentsBuilder uriBuilder) {
        ProntuarioResponseDTO response = applicationService.registrar(petId, dto);
        URI uri = uriBuilder
                .path("/api/v1/pets/{petId}/prontuarios/{prontuarioId}")
                .buildAndExpand(petId, response.id())
                .toUri();
        return ResponseEntity.created(uri).body(response);
    }
}