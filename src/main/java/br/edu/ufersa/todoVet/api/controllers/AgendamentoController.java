package br.edu.ufersa.todoVet.api.controllers;

import br.edu.ufersa.todoVet.api.dtos.agendamento.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/agendamentos")
public class AgendamentoController {

    @GetMapping
    public ResponseEntity<List<AgendamentoResponse>> listarPorData(
            @RequestParam(required = false) LocalDate data) {
        return null;
    }

    @GetMapping("/{agendamentoId}")
    public ResponseEntity<AgendamentoResponse> buscarPorId(@PathVariable Long agendamentoId) {
        return null;
    }

    @PostMapping
    public ResponseEntity<AgendamentoResponse> agendar(
            @RequestBody @Valid AgendamentoCreate dto,
            UriComponentsBuilder uriBuilder) {

        URI uri = uriBuilder
                .path("/api/v1/agendamentos/{agendamentoId}")
                .buildAndExpand(1L)
                .toUri();

        return ResponseEntity.created(uri).body(null);
    }

    @DeleteMapping("/{agendamentoId}")
    public ResponseEntity<Void> cancelar(@PathVariable Long agendamentoId) {
        return ResponseEntity.noContent().build();
    }
}