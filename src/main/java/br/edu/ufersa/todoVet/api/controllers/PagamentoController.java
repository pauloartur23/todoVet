// src/main/java/br/edu/ufersa/todoVet/api/controllers/PagamentoController.java
package br.edu.ufersa.todoVet.api.controllers;

import br.edu.ufersa.todoVet.api.dtos.pagamento.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/agendamentos/{agendamentoId}/pagamentos")
public class PagamentoController {

    @GetMapping
    public ResponseEntity<List<PagamentoResponse>> listarPorAgendamento(
            @PathVariable Long agendamentoId) {
        return null;
    }

    @GetMapping("/{pagamentoId}")
    public ResponseEntity<PagamentoResponse> buscarPorId(
            @PathVariable Long agendamentoId,
            @PathVariable Long pagamentoId) {
        return null;
    }

    @PostMapping
    public ResponseEntity<PagamentoResponse> registrar(
            @PathVariable Long agendamentoId,
            @RequestBody @Valid PagamentoCreate dto,
            UriComponentsBuilder uriBuilder) {

        URI uri = uriBuilder
                .path("/api/v1/agendamentos/{agendamentoId}/pagamentos/{pagamentoId}")
                .buildAndExpand(agendamentoId, 1L)
                .toUri();

        return ResponseEntity.created(uri).body(null);
    }

    @DeleteMapping("/{pagamentoId}")
    public ResponseEntity<Void> estornar(
            @PathVariable Long agendamentoId,
            @PathVariable Long pagamentoId) {
        return ResponseEntity.noContent().build();
    }
}