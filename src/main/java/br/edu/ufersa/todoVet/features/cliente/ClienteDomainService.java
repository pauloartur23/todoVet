package br.edu.ufersa.todoVet.features.cliente;

import br.edu.ufersa.todoVet.features.auth.Email;
import br.edu.ufersa.todoVet.shared.exception.ConflitoException;
import org.springframework.stereotype.Service;

/**
 * Regras de negócio de Cliente que não pertencem naturalmente à entidade,
 * como a verificação de duplicidade de e-mail no cadastro.
 */
@Service
public class ClienteDomainService {

    private final ClienteRepository clienteRepository;

    public ClienteDomainService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public void validarEmailDisponivel(Email email) {
        if (clienteRepository.existsByEmail(email)) {
            throw new ConflitoException("E-mail já cadastrado no sistema.");
        }
    }
}
// algumas coisas que precisam de outras entidades prontas para fazer
// implementar: impedir exclusão de cliente com pets cadastrados.
// Precisa do PetRepository para checar existsByClienteId(clienteId) antes de excluir.
// Se existir, lançar OperacaoInvalidaException("Não é possível remover um cliente com pets cadastrados.")

// implementar: impedir exclusão de cliente com agendamentos pendentes (futuros/não concluídos).
// Precisa do AgendamentoRepository para checar se existe agendamento futuro para o clienteId.
// Se existir, lançar OperacaoInvalidaException("Não é possível remover um cliente com agendamentos pendentes.")

// implementar: impedir exclusão de cliente com vendas/pagamentos em aberto.
// Precisa do VendaRepository (ou PagamentoRepository) para checar pendências do clienteId.
// Se existir, lançar OperacaoInvalidaException("Não é possível remover um cliente com pagamentos pendentes.")

// implementar: definir limite de pets por cliente, se o professor exigir uma regra desse tipo.
// Precisa do PetRepository para contar quantos pets o cliente já tem antes de cadastrar um novo.
// Se ultrapassar o limite, lançar OperacaoInvalidaException("Cliente atingiu o limite de pets permitido.")