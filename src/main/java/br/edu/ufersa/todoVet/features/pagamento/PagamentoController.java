package br.edu.ufersa.todoVet.features.pagamento;


import br.edu.ufersa.todoVet.features.pagamento.dtos.PagamentoCreateDTO;
import br.edu.ufersa.todoVet.features.pagamento.dtos.PagamentoResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/agendamentos/{agendamentoId}/pagamentos")
public class PagamentoController {

    private final PagamentoApplicationService applicationService;

    public PagamentoController(PagamentoApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<PagamentoResponseDTO>> listarPorAgendamento(
            @PathVariable Long agendamentoId) {
        return ResponseEntity.ok(applicationService.listarPorAgendamento(agendamentoId));
    }

    @GetMapping("/{pagamentoId}")
    public ResponseEntity<PagamentoResponseDTO> buscarPorId(
            @PathVariable Long agendamentoId,
            @PathVariable Long pagamentoId) {
        return ResponseEntity.ok(applicationService.buscarPorId(agendamentoId, pagamentoId));
    }

    @PostMapping
    public ResponseEntity<PagamentoResponseDTO> registrar(
            @PathVariable Long agendamentoId,
            @RequestBody @Valid PagamentoCreateDTO dto,
            UriComponentsBuilder uriBuilder) {

        PagamentoResponseDTO salvo = applicationService.registrar(agendamentoId, dto);

        URI uri = uriBuilder
                .path("/api/v1/agendamentos/{agendamentoId}/pagamentos/{pagamentoId}")
                .buildAndExpand(agendamentoId, salvo.id())
                .toUri();

        return ResponseEntity.created(uri).body(salvo);
    }

    @DeleteMapping("/{pagamentoId}")
    public ResponseEntity<Void> estornar(
            @PathVariable Long agendamentoId,
            @PathVariable Long pagamentoId) {
        applicationService.estornar(agendamentoId, pagamentoId);
        return ResponseEntity.noContent().build();
    }
}