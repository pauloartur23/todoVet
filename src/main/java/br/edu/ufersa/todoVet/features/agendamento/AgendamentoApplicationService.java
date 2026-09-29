package br.edu.ufersa.todoVet.features.agendamento;

import br.edu.ufersa.todoVet.features.agendamento.AgendamentoCreate;
import br.edu.ufersa.todoVet.features.agendamento.AgendamentoResponse;
import br.edu.ufersa.todoVet.features.funcionario.Funcionario;
import br.edu.ufersa.todoVet.features.funcionario.FuncionarioRepository;
import br.edu.ufersa.todoVet.features.pet.Pet;
import br.edu.ufersa.todoVet.features.pet.PetRepository;
import br.edu.ufersa.todoVet.shared.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class AgendamentoApplicationService {

    private final AgendamentoRepository agendamentoRepository;
    private final PetRepository petRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final AgendamentoDomainService agendamentoDomainService;

    public AgendamentoApplicationService(AgendamentoRepository agendamentoRepository,
                                         PetRepository petRepository,
                                         FuncionarioRepository funcionarioRepository,
                                         AgendamentoDomainService agendamentoDomainService) {
        this.agendamentoRepository = agendamentoRepository;
        this.petRepository = petRepository;
        this.funcionarioRepository = funcionarioRepository;
        this.agendamentoDomainService = agendamentoDomainService;
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> listarPorData(LocalDate data) {
        List<Agendamento> agendamentos = data != null
                ? agendamentoRepository.findByData(data)
                : agendamentoRepository.findAll();
        return agendamentos.stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public AgendamentoResponse buscarPorId(Long id) {
        return agendamentoRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Agendamento não encontrado para o ID: " + id));
    }

    @Transactional
    public AgendamentoResponse agendar(AgendamentoCreate dto) {
        Pet pet = petRepository.findById(dto.petId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Pet não encontrado para o ID: " + dto.petId()));

        Funcionario veterinario = funcionarioRepository.findById(dto.veterinarioId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Veterinário não encontrado para o ID: " + dto.veterinarioId()));

        agendamentoDomainService.validarDisponibilidadeVeterinario(dto.veterinarioId(), dto.data(), dto.hora());

        Agendamento agendamento = new Agendamento(pet, veterinario, dto.data(), dto.hora(), dto.motivo());
        return toResponse(agendamentoRepository.save(agendamento));
    }

    @Transactional
    public void cancelar(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Agendamento não encontrado para o ID: " + id));
        agendamento.cancelar();
    }

    private AgendamentoResponse toResponse(Agendamento a) {
        return new AgendamentoResponse(
                a.getId(),
                a.getPet().getId(),
                a.getPet().getNome(),
                a.getVeterinario().getId(),
                a.getVeterinario().getNome(),
                a.getData(),
                a.getHora(),
                a.getMotivo(),
                a.getStatus().name()
        );
    }
}