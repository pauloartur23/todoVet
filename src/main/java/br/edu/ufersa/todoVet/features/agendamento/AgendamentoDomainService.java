package br.edu.ufersa.todoVet.features.agendamento;

import br.edu.ufersa.todoVet.shared.exception.ConflitoException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class AgendamentoDomainService {

    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoDomainService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    public void validarDisponibilidadeVeterinario(Long veterinarioId, LocalDate data, LocalTime hora) {
        if (agendamentoRepository.existsByVeterinarioIdAndDataAndHora(veterinarioId, data, hora)) {
            throw new ConflitoException("O veterinário já possui um agendamento para esse dia e horário.");
        }
    }
}