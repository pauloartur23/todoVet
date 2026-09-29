package br.edu.ufersa.todoVet.features.cliente;

import br.edu.ufersa.todoVet.features.auth.Email;
import br.edu.ufersa.todoVet.features.pet.PetRepository;
import br.edu.ufersa.todoVet.shared.exception.ConflitoException;
import br.edu.ufersa.todoVet.shared.exception.OperacaoInvalidaException;
import org.springframework.stereotype.Service;

@Service
public class ClienteDomainService {

    private final ClienteRepository clienteRepository;
    private final PetRepository petRepository;

    public ClienteDomainService(ClienteRepository clienteRepository, PetRepository petRepository) {
        this.clienteRepository = clienteRepository;
        this.petRepository = petRepository;
    }

    public void validarEmailDisponivel(Email email) {
        if (clienteRepository.existsByEmail(email)) {
            throw new ConflitoException("E-mail já cadastrado no sistema.");
        }
    }

    public void validarEmailDisponivelParaAtualizacao(Long clienteId, Email novoEmail) {
        clienteRepository.findByEmail(novoEmail)
                .filter(clienteExistente -> !clienteExistente.getId().equals(clienteId))
                .ifPresent(clienteExistente -> {
                    throw new ConflitoException("O e-mail informado já está em uso por outro cliente.");
                });
    }

    public void validarExclusao(Long clienteId) {
        if (!petRepository.findByClienteId(clienteId).isEmpty()) {
            throw new OperacaoInvalidaException("Não é possível remover um cliente que possui pets cadastrados.");
        }
    }
}