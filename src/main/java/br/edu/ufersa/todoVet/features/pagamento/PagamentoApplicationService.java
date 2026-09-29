package br.edu.ufersa.todoVet.features.pagamento;

import br.edu.ufersa.todoVet.features.agendamento.AgendamentoRepository;
import br.edu.ufersa.todoVet.features.pagamento.dtos.PagamentoCreateDTO;
import br.edu.ufersa.todoVet.features.pagamento.dtos.PagamentoResponseDTO;
import br.edu.ufersa.todoVet.shared.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PagamentoApplicationService {

    private final PagamentoRepository pagamentoRepository;
    private final AgendamentoRepository agendamentoRepository;
    private final PagamentoDomainService pagamentoDomainService;

    public PagamentoApplicationService(
            PagamentoRepository pagamentoRepository,
            AgendamentoRepository agendamentoRepository,
            PagamentoDomainService pagamentoDomainService) {

        this.pagamentoRepository = pagamentoRepository;
        this.agendamentoRepository = agendamentoRepository;
        this.pagamentoDomainService = pagamentoDomainService;
    }

    @Transactional(readOnly = true)
    public List<PagamentoResponseDTO> listarPorAgendamento(Long agendamentoId) {

        if (!agendamentoRepository.existsById(agendamentoId)) {
            throw new EntidadeNaoEncontradaException(
                    "Agendamento não encontrado para o ID: " + agendamentoId
            );
        }

        return pagamentoRepository.findByAgendamentoId(agendamentoId)
                .stream()
                .map(PagamentoResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public PagamentoResponseDTO buscarPorId(
            Long agendamentoId,
            Long pagamentoId) {

        if (!agendamentoRepository.existsById(agendamentoId)) {
            throw new EntidadeNaoEncontradaException(
                    "Agendamento não encontrado para o ID: " + agendamentoId
            );
        }

        Pagamento pagamento = pagamentoRepository.findById(pagamentoId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                "Pagamento não encontrado para o ID: " + pagamentoId
                        )
                );

        if (!pagamento.getAgendamentoId().equals(agendamentoId)) {
            throw new EntidadeNaoEncontradaException(
                    "Pagamento não encontrado para este agendamento."
            );
        }

        return PagamentoResponseDTO.fromEntity(pagamento);
    }

    @Transactional
    public PagamentoResponseDTO registrar(
            Long agendamentoId,
            PagamentoCreateDTO dto) {

        if (!agendamentoRepository.existsById(agendamentoId)) {
            throw new EntidadeNaoEncontradaException(
                    "Agendamento não encontrado para o ID: " + agendamentoId
            );
        }

        Pagamento pagamento = new Pagamento.Builder(
                agendamentoId,
                dto.valor()
        )
                .comFormaPagamento(dto.formaPagamento())
                .build();

        Pagamento salvo = pagamentoRepository.save(pagamento);

        return PagamentoResponseDTO.fromEntity(salvo);
    }

    @Transactional
    public void estornar(
            Long agendamentoId,
            Long pagamentoId) {

        if (!agendamentoRepository.existsById(agendamentoId)) {
            throw new EntidadeNaoEncontradaException(
                    "Agendamento não encontrado para o ID: " + agendamentoId
            );
        }

        Pagamento pagamento = pagamentoRepository.findById(pagamentoId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                "Pagamento não encontrado para o ID: " + pagamentoId
                        )
                );

        if (!pagamento.getAgendamentoId().equals(agendamentoId)) {
            throw new EntidadeNaoEncontradaException(
                    "Pagamento não encontrado para este agendamento."
            );
        }

        pagamentoDomainService.validarEstorno(pagamento);
        pagamento.estornar();
    }
}