package br.edu.ufersa.todoVet.features.prontuario;

import br.edu.ufersa.todoVet.features.funcionario.Funcionario;
import br.edu.ufersa.todoVet.shared.exception.OperacaoInvalidaException;
import org.springframework.stereotype.Service;

@Service
public class ProntuarioDomainService {

    public void validarResponsavel(Funcionario funcionario) {
        if (funcionario.getCargo() == null ||
                !funcionario.getCargo().toLowerCase().contains("veterin")) {
            throw new OperacaoInvalidaException("Apenas funcionários do corpo veterinário podem emitir prontuários.");
        }
    }
}