package br.edu.ufersa.todoVet.features.funcionario;

import br.edu.ufersa.todoVet.features.funcionario.dtos.FuncionarioResponseDTO;
import br.edu.ufersa.todoVet.features.funcionario.dtos.FuncionarioUpdateDTO;
import br.edu.ufersa.todoVet.shared.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class FuncionarioApplicationService {
    private final FuncionarioRepository funcionarioRepository;
    private final FuncionarioDomainService funcionarioDomainService;

    public FuncionarioApplicationService(FuncionarioRepository funcionarioRepository,
                                         FuncionarioDomainService funcionarioDomainService) {
        this.funcionarioRepository = funcionarioRepository;
        this.funcionarioDomainService = funcionarioDomainService;
    }

    @Transactional(readOnly = true)
    public List<FuncionarioResponseDTO> listarTodos() {
        return funcionarioRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public FuncionarioResponseDTO buscarPorId(Long id) {
        return funcionarioRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Funcionário não encontrado para o ID: " + id));
    }

    @Transactional(readOnly = true)
    public List<FuncionarioResponseDTO> buscarPorNome(String nome) {
        return funcionarioRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public FuncionarioResponseDTO atualizar(Long id, FuncionarioUpdateDTO dto) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Funcionário não encontrado para o ID: " + id));

        funcionario.atualizarCargo(dto.cargo());
        funcionario.atualizarPerfil(dto.nome(), dto.telefone());
        return toResponse(funcionario);
    }

    @Transactional
    public void deletar(Long id) {
        if (!funcionarioRepository.existsById(id)) {
            throw new EntidadeNaoEncontradaException("Funcionário não encontrado para o ID: " + id);
        }
        funcionarioDomainService.validarExclusao(id);
        funcionarioRepository.deleteById(id);
    }

    private FuncionarioResponseDTO toResponse(Funcionario f) {
        return new FuncionarioResponseDTO(
                f.getId(),
                f.getNome(),
                f.getEmail().endereco(),
                f.getTelefone(),
                f.getCargo()
        );
    }
}
