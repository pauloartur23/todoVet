
package br.edu.ufersa.todoVet.features.produto;


import br.edu.ufersa.todoVet.features.produto.dto.ProdutoCreateDTO;
import br.edu.ufersa.todoVet.features.produto.dto.ProdutoResponseDTO;
import br.edu.ufersa.todoVet.features.produto.dto.ProdutoUpdateDTO;
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
    public ResponseEntity<List<ProdutoResponseDTO>> listar(
            @RequestParam(required = false) String nome) {
        return null;
    }

    @GetMapping("/{produtoId}")
    public ResponseEntity<ProdutoResponseDTO> buscarPorId(@PathVariable Long produtoId) {
        return null;
    }

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> criar(
            @RequestBody @Valid ProdutoCreateDTO dto,
            UriComponentsBuilder uriBuilder) {

        URI uri = uriBuilder
                .path("/api/v1/produtos/{produtoId}")
                .buildAndExpand(1L)
                .toUri();

        return ResponseEntity.created(uri).body(null);
    }

    @PutMapping("/{produtoId}")
    public ResponseEntity<ProdutoResponseDTO> atualizar(
            @PathVariable Long produtoId,
            @RequestBody @Valid ProdutoUpdateDTO dto) {
        return null;
    }

    @DeleteMapping("/{produtoId}")
    public ResponseEntity<Void> remover(@PathVariable Long produtoId) {
        return ResponseEntity.noContent().build();
    }
}