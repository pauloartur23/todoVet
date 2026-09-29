package br.edu.ufersa.todoVet.features.agendamento;

import br.edu.ufersa.todoVet.features.agendamento.AgendamentoCreate;
import br.edu.ufersa.todoVet.features.agendamento.AgendamentoResponse;
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

    private final AgendamentoApplicationService applicationService;

    public AgendamentoController(AgendamentoApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<AgendamentoResponse>> listarPorData(
            @RequestParam(required = false) LocalDate data) {
        return ResponseEntity.ok(applicationService.listarPorData(data));
    }

    @GetMapping("/{agendamentoId}")
    public ResponseEntity<AgendamentoResponse> buscarPorId(@PathVariable Long agendamentoId) {
        return ResponseEntity.ok(applicationService.buscarPorId(agendamentoId));
    }

    @PostMapping
    public ResponseEntity<AgendamentoResponse> agendar(@RequestBody @Valid AgendamentoCreate dto,
                                                       UriComponentsBuilder uriBuilder) {
        AgendamentoResponse response = applicationService.agendar(dto);
        URI uri = uriBuilder.path("/api/v1/agendamentos/{agendamentoId}").buildAndExpand(response.id()).toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @DeleteMapping("/{agendamentoId}")
    public ResponseEntity<Void> cancelar(@PathVariable Long agendamentoId) {
        applicationService.cancelar(agendamentoId);
        return ResponseEntity.noContent().build();
    }
}