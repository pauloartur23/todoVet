package br.edu.ufersa.todoVet.features.prontuario;

import br.edu.ufersa.todoVet.features.funcionario.Funcionario;
import br.edu.ufersa.todoVet.features.funcionario.FuncionarioRepository;
import br.edu.ufersa.todoVet.features.pet.Pet;
import br.edu.ufersa.todoVet.features.pet.PetRepository;
import br.edu.ufersa.todoVet.features.prontuario.dto.ProntuarioCreateDTO;
import br.edu.ufersa.todoVet.features.prontuario.dto.ProntuarioResponseDTO;
import br.edu.ufersa.todoVet.shared.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProntuarioApplicationService {

    private final ProntuarioRepository prontuarioRepository;
    private final PetRepository petRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final ProntuarioDomainService domainService;

    public ProntuarioApplicationService(ProntuarioRepository prontuarioRepository,
                                        PetRepository petRepository,
                                        FuncionarioRepository funcionarioRepository,
                                        ProntuarioDomainService domainService) {
        this.prontuarioRepository = prontuarioRepository;
        this.petRepository = petRepository;
        this.funcionarioRepository = funcionarioRepository;
        this.domainService = domainService;
    }

    @Transactional(readOnly = true)
    public List<ProntuarioResponseDTO> listarPorPet(Long petId) {
        if (!petRepository.existsById(petId)) {
            throw new EntidadeNaoEncontradaException("Pet não encontrado para o ID: " + petId);
        }
        return prontuarioRepository.findByPetIdOrderByDataRegistroDesc(petId)
                .stream()
                .map(ProntuarioResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProntuarioResponseDTO buscarPorId(Long petId, Long prontuarioId) {
        return prontuarioRepository.findByIdAndPetId(prontuarioId, petId)
                .map(ProntuarioResponseDTO::fromEntity)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Prontuário ID " + prontuarioId + " não encontrado para o Pet ID " + petId));
    }

    @Transactional
    public ProntuarioResponseDTO registrar(Long petId, ProntuarioCreateDTO dto) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Pet não encontrado para o ID: " + petId));

        Funcionario funcionario = funcionarioRepository.findById(dto.veterinarioId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Funcionário não encontrado para o ID: " + dto.veterinarioId()));

        domainService.validarResponsavel(funcionario);

        Prontuario prontuario = new Prontuario(pet, funcionario, dto.descricao(), dto.prescricao());
        return ProntuarioResponseDTO.fromEntity(prontuarioRepository.save(prontuario));
    }
}