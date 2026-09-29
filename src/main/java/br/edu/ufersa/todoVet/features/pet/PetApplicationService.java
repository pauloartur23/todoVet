package br.edu.ufersa.todoVet.features.pet;

import br.edu.ufersa.todoVet.features.cliente.Cliente;
import br.edu.ufersa.todoVet.features.cliente.ClienteRepository;
import br.edu.ufersa.todoVet.features.pet.dto.PetCreate;
import br.edu.ufersa.todoVet.features.pet.dto.PetResponse;
import br.edu.ufersa.todoVet.features.pet.dto.PetUpdate;
import br.edu.ufersa.todoVet.shared.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PetApplicationService {

    private final PetRepository petRepository;
    private final ClienteRepository clienteRepository;
    private final PetDomainService petDomainService;

    public PetApplicationService(PetRepository petRepository,
                                 ClienteRepository clienteRepository,
                                 PetDomainService petDomainService) {
        this.petRepository = petRepository;
        this.clienteRepository = clienteRepository;
        this.petDomainService = petDomainService;
    }

    @Transactional(readOnly = true)
    public List<PetResponse> listarTodos() {
        return petRepository.findAll().stream().map(PetResponse::fromEntity).toList();
    }

    @Transactional(readOnly = true)
    public PetResponse buscarPorId(Long id) {
        return petRepository.findById(id)
                .map(PetResponse::fromEntity)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Pet não encontrado para o ID: " + id));
    }

    @Transactional
    public PetResponse criar(PetCreate dto) {
        petDomainService.validarUnicidade(dto.clienteId(), dto.nome(), dto.especie());

        Cliente cliente = clienteRepository.findById(dto.clienteId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Cliente não encontrado para o ID: " + dto.clienteId()));

        Pet pet = new Pet(cliente, dto.nome(), dto.especie(), dto.raca(), dto.dataNascimento());
        return PetResponse.fromEntity(petRepository.save(pet));
    }

    @Transactional
    public PetResponse atualizar(Long id, PetUpdate dto) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Pet não encontrado para o ID: " + id));

        pet.atualizar(dto.nome(), dto.raca(), dto.dataNascimento());
        return PetResponse.fromEntity(pet);
    }

    @Transactional
    public void deletar(Long id) {
        if (!petRepository.existsById(id)) {
            throw new EntidadeNaoEncontradaException("Pet não encontrado para o ID: " + id);
        }
        petRepository.deleteById(id);
    }
}