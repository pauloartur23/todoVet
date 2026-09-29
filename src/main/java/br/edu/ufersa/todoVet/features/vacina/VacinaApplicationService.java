package br.edu.ufersa.todoVet.features.vacina;

import br.edu.ufersa.todoVet.features.pet.PetRepository;
import br.edu.ufersa.todoVet.features.vacina.dtos.VacinaCreateDTO;
import br.edu.ufersa.todoVet.features.vacina.dtos.VacinaPatchDTO;
import br.edu.ufersa.todoVet.features.vacina.dtos.VacinaResponseDTO;
import br.edu.ufersa.todoVet.shared.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VacinaApplicationService {

    private final VacinaRepository vacinaRepository;
    private final PetRepository petRepository;
    private final VacinaDomainService vacinaDomainService;

    public VacinaApplicationService(
            VacinaRepository vacinaRepository,
            PetRepository petRepository,
            VacinaDomainService vacinaDomainService) {

        this.vacinaRepository = vacinaRepository;
        this.petRepository = petRepository;
        this.vacinaDomainService = vacinaDomainService;
    }

    @Transactional(readOnly = true)
    public List<VacinaResponseDTO> listarPorPet(Long petId) {

        if (!petRepository.existsById(petId)) {
            throw new EntidadeNaoEncontradaException(
                    "Pet não encontrado para o ID: " + petId
            );
        }

        return vacinaRepository.findByPetId(petId)
                .stream()
                .map(VacinaResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public VacinaResponseDTO buscarPorId(
            Long petId,
            Long vacinaId) {

        if (!petRepository.existsById(petId)) {
            throw new EntidadeNaoEncontradaException(
                    "Pet não encontrado para o ID: " + petId
            );
        }

        Vacina vacina = vacinaRepository.findById(vacinaId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                "Vacina não encontrada para o ID: " + vacinaId
                        )
                );

        if (!vacina.getPetId().equals(petId)) {
            throw new EntidadeNaoEncontradaException(
                    "Vacina não encontrada para este pet."
            );
        }

        return VacinaResponseDTO.fromEntity(vacina);
    }

    @Transactional
    public VacinaResponseDTO registrar(
            Long petId,
            VacinaCreateDTO dto) {

        if (!petRepository.existsById(petId)) {
            throw new EntidadeNaoEncontradaException(
                    "Pet não encontrado para o ID: " + petId
            );
        }

        Vacina vacina = new Vacina.Builder(
                petId,
                dto.nome()
        )
                .comDataAplicacao(dto.dataAplicacao())
                .comProximaDose(dto.proximaDose())
                .comLote(dto.lote())
                .comVeterinarioResponsavel(dto.veterinarioResponsavel())
                .build();

        Vacina salva = vacinaRepository.save(vacina);

        return VacinaResponseDTO.fromEntity(salva);
    }

    @Transactional
    public VacinaResponseDTO atualizarProximaDose(
            Long petId,
            Long vacinaId,
            VacinaPatchDTO dto) {

        if (!petRepository.existsById(petId)) {
            throw new EntidadeNaoEncontradaException(
                    "Pet não encontrado para o ID: " + petId
            );
        }

        Vacina vacina = vacinaRepository.findById(vacinaId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                "Vacina não encontrada para o ID: " + vacinaId
                        )
                );

        if (!vacina.getPetId().equals(petId)) {
            throw new EntidadeNaoEncontradaException(
                    "Vacina não encontrada para este pet."
            );
        }

        vacina.atualizarProximaDose(dto.proximaDose());

        return VacinaResponseDTO.fromEntity(vacina);
    }

    @Transactional
    public void deletar(
            Long petId,
            Long vacinaId) {

        if (!petRepository.existsById(petId)) {
            throw new EntidadeNaoEncontradaException(
                    "Pet não encontrado para o ID: " + petId
            );
        }

        Vacina vacina = vacinaRepository.findById(vacinaId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                "Vacina não encontrada para o ID: " + vacinaId
                        )
                );

        if (!vacina.getPetId().equals(petId)) {
            throw new EntidadeNaoEncontradaException(
                    "Vacina não encontrada para este pet."
            );
        }

        vacinaDomainService.validarExclusao(vacina);

        vacinaRepository.delete(vacina);
    }
}