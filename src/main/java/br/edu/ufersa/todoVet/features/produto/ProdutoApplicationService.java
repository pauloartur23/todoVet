package br.edu.ufersa.todoVet.features.produto;

import br.edu.ufersa.todoVet.features.produto.dto.ProdutoCreateDTO;
import br.edu.ufersa.todoVet.features.produto.dto.ProdutoResponseDTO;
import br.edu.ufersa.todoVet.features.produto.dto.ProdutoUpdateDTO;
import br.edu.ufersa.todoVet.shared.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProdutoApplicationService {

    private final ProdutoRepository produtoRepository;
    private final ProdutoDomainService produtoDomainService;

    public ProdutoApplicationService(
            ProdutoRepository produtoRepository,
            ProdutoDomainService produtoDomainService) {

        this.produtoRepository = produtoRepository;
        this.produtoDomainService = produtoDomainService;
    }

    @Transactional(readOnly = true)
    public List<ProdutoResponseDTO> listarTodos() {

        return produtoRepository.findAll()
                .stream()
                .map(ProdutoResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProdutoResponseDTO> buscarPorNome(String nome) {

        return produtoRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(ProdutoResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProdutoResponseDTO buscarPorId(Long id) {

        return produtoRepository.findById(id)
                .map(ProdutoResponseDTO::fromEntity)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                "Produto não encontrado para o ID: " + id
                        )
                );
    }

    @Transactional
    public ProdutoResponseDTO criar(ProdutoCreateDTO dto) {

        Produto produto = new Produto.Builder(dto.nome())
                .comDescricao(dto.descricao())
                .comPreco(dto.preco())
                .comQuantidadeEstoque(dto.quantidadeEstoque())
                .build();

        Produto salvo = produtoRepository.save(produto);

        return ProdutoResponseDTO.fromEntity(salvo);
    }

    @Transactional
    public ProdutoResponseDTO atualizar(
            Long id,
            ProdutoUpdateDTO dto) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                "Produto não encontrado para o ID: " + id
                        )
                );

        produto.atualizar(
                dto.nome(),
                dto.descricao(),
                dto.preco(),
                dto.quantidadeEstoque()
        );

        return ProdutoResponseDTO.fromEntity(produto);
    }

    @Transactional
    public void deletar(Long id) {

        if (!produtoRepository.existsById(id)) {
            throw new EntidadeNaoEncontradaException(
                    "Produto não encontrado para o ID: " + id
            );
        }

        produtoDomainService.validarExclusao(id);

        produtoRepository.deleteById(id);
    }
}