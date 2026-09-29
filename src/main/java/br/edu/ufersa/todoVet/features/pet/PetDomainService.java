package br.edu.ufersa.todoVet.features.pet;

import br.edu.ufersa.todoVet.shared.exception.ConflitoException;
import org.springframework.stereotype.Service;

@Service
public class PetDomainService {

    private final PetRepository petRepository;

    public PetDomainService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public void validarUnicidade(Long clienteId, String nome, String especie) {
        if (petRepository.existsByClienteIdAndNomeIgnoreCaseAndEspecieIgnoreCase(clienteId, nome.trim(), especie.trim())) {
            throw new ConflitoException(
                    "O cliente já possui um pet com o nome '" + nome + "' e espécie '" + especie + "'."
            );
        }
    }
}