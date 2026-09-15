package br.edu.ufersa.todoVet.features.prontuario;

import br.edu.ufersa.todoVet.features.auth.dtos.prontuario.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pets/{petId}/prontuarios")
public class ProntuarioController {

    @GetMapping
    public ResponseEntity<List<ProntuarioResponse>> listarPorPet(@PathVariable Long petId) {
        return null;
    }

    @GetMapping("/{prontuarioId}")
    public ResponseEntity<ProntuarioResponse> buscarPorId(
            @PathVariable Long petId,
            @PathVariable Long prontuarioId) {
        return null;
    }

    @PostMapping
    public ResponseEntity<ProntuarioResponse> registrar(
            @PathVariable Long petId,
            @RequestBody @Valid ProntuarioCreate dto,
            UriComponentsBuilder uriBuilder) {

        URI uri = uriBuilder
                .path("/api/v1/pets/{petId}/prontuarios/{prontuarioId}")
                .buildAndExpand(petId, 1L)
                .toUri();

        return ResponseEntity.created(uri).body(null);
    }
}