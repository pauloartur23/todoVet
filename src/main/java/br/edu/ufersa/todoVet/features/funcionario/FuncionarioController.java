package br.edu.ufersa.todoVet.features.funcionario;

import br.edu.ufersa.todoVet.features.funcionario.dtos.FuncionarioUpdateDTO;
import br.edu.ufersa.todoVet.features.funcionario.dtos.FuncionarioResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/funcionarios")
public class FuncionarioController {
    private final FuncionarioApplicationService applicationService;

    public FuncionarioController(FuncionarioApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<FuncionarioResponseDTO>> listarTodos() {
        return ResponseEntity.ok(applicationService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FuncionarioResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid FuncionarioUpdateDTO usuarioAtualizado) {
        return ResponseEntity.ok(applicationService.atualizar(id, usuarioAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        applicationService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<FuncionarioResponseDTO>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(applicationService.buscarPorNome(nome));
    }
}