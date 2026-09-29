package br.edu.ufersa.todoVet.features.produto;


import br.edu.ufersa.todoVet.features.produto.dtos.ProdutoCreateDTO;
import br.edu.ufersa.todoVet.features.produto.dtos.ProdutoResponseDTO;
import br.edu.ufersa.todoVet.features.produto.dtos.ProdutoUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/produtos")
public class ProdutoController {

    private final ProdutoApplicationService applicationService;

    public ProdutoController(ProdutoApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listar(
            @RequestParam(required = false) String nome) {
        if (nome != null && !nome.isBlank()) {
            return ResponseEntity.ok(applicationService.buscarPorNome(nome));
        }
        return ResponseEntity.ok(applicationService.listarTodos());
    }

    @GetMapping("/{produtoId}")
    public ResponseEntity<ProdutoResponseDTO> buscarPorId(@PathVariable Long produtoId) {
        return ResponseEntity.ok(applicationService.buscarPorId(produtoId));
    }

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> criar(
            @RequestBody @Valid ProdutoCreateDTO dto,
            UriComponentsBuilder uriBuilder) {

        ProdutoResponseDTO salvo = applicationService.criar(dto);

        URI uri = uriBuilder
                .path("/api/v1/produtos/{produtoId}")
                .buildAndExpand(salvo.id())
                .toUri();

        return ResponseEntity.created(uri).body(salvo);
    }

    @PutMapping("/{produtoId}")
    public ResponseEntity<ProdutoResponseDTO> atualizar(
            @PathVariable Long produtoId,
            @RequestBody @Valid ProdutoUpdateDTO dto) {
        return ResponseEntity.ok(applicationService.atualizar(produtoId, dto));
    }

    @DeleteMapping("/{produtoId}")
    public ResponseEntity<Void> remover(@PathVariable Long produtoId) {
        applicationService.deletar(produtoId);
        return ResponseEntity.noContent().build();
    }
}