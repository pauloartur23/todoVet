package br.edu.ufersa.todoVet.features.cliente;

import br.edu.ufersa.todoVet.features.auth.Email;
import br.edu.ufersa.todoVet.features.cliente.dtos.ClienteRequestDTO;
import br.edu.ufersa.todoVet.features.cliente.dtos.ClienteResponseDTO;
import br.edu.ufersa.todoVet.features.pet.PetApplicationService;
import br.edu.ufersa.todoVet.features.pet.dto.PetResponseDTO;
import br.edu.ufersa.todoVet.shared.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClienteApplicationService {

    private final ClienteRepository clienteRepository;
    private final ClienteDomainService clienteDomainService;
    private final PetApplicationService petApplicationService;

    public ClienteApplicationService(ClienteRepository clienteRepository,
                                     ClienteDomainService clienteDomainService,
                                     PetApplicationService petApplicationService) {
        this.clienteRepository = clienteRepository;
        this.clienteDomainService = clienteDomainService;
        this.petApplicationService = petApplicationService;
    }

    @Transactional(readOnly = true)
    public List<ClienteResponseDTO> listarTodos() {
        return clienteRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ClienteResponseDTO buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Cliente não encontrado para o ID: " + id));
    }

    @Transactional(readOnly = true)
    public List<ClienteResponseDTO> buscarPorNome(String nome) {
        return clienteRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ClienteResponseDTO criar(ClienteRequestDTO dto) {
        Email email = new Email(dto.email());
        clienteDomainService.validarEmailDisponivel(email);

        Cliente cliente = new Cliente(dto.nome(), email, dto.telefone(), dto.endereco());
        Cliente salvo = clienteRepository.save(cliente);
        return toResponse(salvo);
    }

    @Transactional
    public ClienteResponseDTO atualizar(Long id, ClienteRequestDTO dto) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Cliente não encontrado para o ID: " + id));

        Email novoEmail = new Email(dto.email());
        clienteDomainService.validarEmailDisponivelParaAtualizacao(id, novoEmail);

        cliente.atualizarDadosCadastrais(dto.nome(), novoEmail, dto.telefone(), dto.endereco());
        return toResponse(cliente);
    }

    @Transactional
    public void deletar(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new EntidadeNaoEncontradaException("Cliente não encontrado para o ID: " + id);
        }
        clienteDomainService.validarExclusao(id);
        clienteRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<PetResponseDTO> listarPetsDoCliente(Long clienteId) {
        if (!clienteRepository.existsById(clienteId)) {
            throw new EntidadeNaoEncontradaException("Cliente não encontrado para o ID: " + clienteId);
        }
        return petApplicationService.listarPorCliente(clienteId);
    }

    private ClienteResponseDTO toResponse(Cliente c) {
        return new ClienteResponseDTO(
                c.getId(),
                c.getNome(),
                c.getEmail() != null ? c.getEmail().endereco() : null,
                c.getTelefone(),
                c.getEndereco()
        );
    }
}