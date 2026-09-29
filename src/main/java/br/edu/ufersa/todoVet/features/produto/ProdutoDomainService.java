package br.edu.ufersa.todoVet.features.produto;

import br.edu.ufersa.todoVet.features.venda.VendaRepository;
import br.edu.ufersa.todoVet.shared.exception.OperacaoInvalidaException;
import org.springframework.stereotype.Service;

@Service
public class ProdutoDomainService {

    private final VendaRepository vendaRepository;

    public ProdutoDomainService(VendaRepository vendaRepository) {
        this.vendaRepository = vendaRepository;
    }

    public void validarExclusao(Long produtoId) {

        boolean possuiVenda = vendaRepository.findAll()
                .stream()
                .anyMatch(venda -> venda.getProdutoId().equals(produtoId));

        if (possuiVenda) {
            throw new OperacaoInvalidaException(
                    "Não é possível remover um produto que possui vendas registradas."
            );
        }
    }
}