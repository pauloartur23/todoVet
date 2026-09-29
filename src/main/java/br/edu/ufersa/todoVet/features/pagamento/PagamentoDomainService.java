package br.edu.ufersa.todoVet.features.pagamento;

import br.edu.ufersa.todoVet.shared.exception.OperacaoInvalidaException;
import org.springframework.stereotype.Service;

@Service
public class PagamentoDomainService {

    public void validarEstorno(Pagamento pagamento) {
        if (pagamento.getStatus() == StatusPagamento.ESTORNADO) {
            throw new OperacaoInvalidaException(
                    "Este pagamento já foi estornado."
            );
        }
    }
}