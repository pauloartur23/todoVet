package br.edu.ufersa.todoVet.features.venda;

import br.edu.ufersa.todoVet.features.produto.Produto;
import br.edu.ufersa.todoVet.shared.exception.OperacaoInvalidaException;
import org.springframework.stereotype.Service;

@Service
public class VendaDomainService {

    public void validarEstoqueDisponivel(Produto produto, Integer quantidade) {
        if (produto.getQuantidadeEstoque() < quantidade) {
            throw new OperacaoInvalidaException(
                    "Estoque insuficiente para o produto '" + produto.getNome() +
                            "'. Disponível: " + produto.getQuantidadeEstoque() + "."
            );
        }
    }
}