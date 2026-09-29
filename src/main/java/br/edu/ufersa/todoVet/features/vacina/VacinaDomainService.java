package br.edu.ufersa.todoVet.features.vacina;

import org.springframework.stereotype.Service;

@Service
public class VacinaDomainService {

    public void validarExclusao(Vacina vacina) {
        // Atualmente não existe uma regra de negócio
        // que impeça a exclusão de uma vacina.
    }
}