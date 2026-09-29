package br.edu.ufersa.todoVet.features.funcionario;

import br.edu.ufersa.todoVet.features.agendamento.Agendamento;
import br.edu.ufersa.todoVet.features.agendamento.AgendamentoRepository;
import br.edu.ufersa.todoVet.shared.exception.OperacaoInvalidaException;
import org.springframework.stereotype.Service;

@Service
public class FuncionarioDomainService {
    private final AgendamentoRepository agendamentoRepository;

    public FuncionarioDomainService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    public void validarExclusao(Long funcionarioId) {
        if (agendamentoRepository.existsByVeterinarioIdAndStatus(funcionarioId, Agendamento.Status.AGENDADO)) {
            throw new OperacaoInvalidaException("Não é possível remover um funcionário com agendamentos pendentes.");
        }
    }
}
