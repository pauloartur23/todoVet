
package br.edu.ufersa.todoVet.api.controllers;

import br.edu.ufersa.todoVet.api.dtos.produto.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/produtos")
public class ProdutoController {

    @GetMapping
    public ResponseEntity<List<ProdutoResponse>> listar(
            @RequestParam(required = false) String nome) {
        return null;
    }

    @GetMapping("/{produtoId}")
    public ResponseEntity<ProdutoResponse> buscarPorId(@PathVariable Long produtoId) {
        return null;
    }

    @PostMapping
    public ResponseEntity<ProdutoResponse> criar(
            @RequestBody @Valid ProdutoCreate dto,
            UriComponentsBuilder uriBuilder) {

        URI uri = uriBuilder
                .path("/api/v1/produtos/{produtoId}")
                .buildAndExpand(1L)
                .toUri();

        return ResponseEntity.created(uri).body(null);
    }

    @PutMapping("/{produtoId}")
    public ResponseEntity<ProdutoResponse> atualizar(
            @PathVariable Long produtoId,
            @RequestBody @Valid ProdutoUpdate dto) {
        return null;
    }

    @DeleteMapping("/{produtoId}")
    public ResponseEntity<Void> remover(@PathVariable Long produtoId) {
        return ResponseEntity.noContent().build();
    }
}