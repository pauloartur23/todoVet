package br.edu.ufersa.todoVet.features.venda;

import br.edu.ufersa.todoVet.features.venda.dtos.VendaRequestDTO;
import br.edu.ufersa.todoVet.features.venda.dtos.VendaResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/vendas")
public class VendaController {

    private final VendaApplicationService applicationService;

    public VendaController(VendaApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<VendaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(applicationService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<VendaResponseDTO> registrar(@RequestBody @Valid VendaRequestDTO novaVenda,
                                                      UriComponentsBuilder uriBuilder) {
        VendaResponseDTO response = applicationService.registrar(novaVenda);
        URI uri = uriBuilder.path("/api/v1/vendas/{id}").buildAndExpand(response.id()).toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @GetMapping("/clientes/{clienteId}")
    public ResponseEntity<List<VendaResponseDTO>> listarPorCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(applicationService.listarPorCliente(clienteId));
    }
}