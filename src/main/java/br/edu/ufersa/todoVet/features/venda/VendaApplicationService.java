package br.edu.ufersa.todoVet.features.venda;

import br.edu.ufersa.todoVet.features.cliente.Cliente;
import br.edu.ufersa.todoVet.features.cliente.ClienteRepository;
import br.edu.ufersa.todoVet.features.produto.Produto;
import br.edu.ufersa.todoVet.features.produto.ProdutoRepository;
import br.edu.ufersa.todoVet.features.venda.dtos.VendaRequestDTO;
import br.edu.ufersa.todoVet.features.venda.dtos.VendaResponseDTO;
import br.edu.ufersa.todoVet.shared.exception.EntidadeNaoEncontradaException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VendaApplicationService {

    private final VendaRepository vendaRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;
    private final VendaDomainService vendaDomainService;

    public VendaApplicationService(VendaRepository vendaRepository,
                                   ClienteRepository clienteRepository,
                                   ProdutoRepository produtoRepository,
                                   VendaDomainService vendaDomainService) {
        this.vendaRepository = vendaRepository;
        this.clienteRepository = clienteRepository;
        this.produtoRepository = produtoRepository;
        this.vendaDomainService = vendaDomainService;
    }

    @Transactional(readOnly = true)
    public List<VendaResponseDTO> listarTodas() {
        return vendaRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public VendaResponseDTO buscarPorId(Long id) {
        return vendaRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Venda não encontrada para o ID: " + id));
    }

    @Transactional(readOnly = true)
    public List<VendaResponseDTO> listarPorCliente(Long clienteId) {
        if (!clienteRepository.existsById(clienteId)) {
            throw new EntidadeNaoEncontradaException("Cliente não encontrado para o ID: " + clienteId);
        }
        return vendaRepository.findByClienteId(clienteId).stream().map(this::toResponse).toList();
    }

    @Transactional
    public VendaResponseDTO registrar(VendaRequestDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.clienteId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Cliente não encontrado para o ID: " + dto.clienteId()));

        Produto produto = produtoRepository.findById(dto.produtoId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Produto não encontrado para o ID: " + dto.produtoId()));

        vendaDomainService.validarEstoqueDisponivel(produto, dto.quantidade());
        produto.baixarEstoque(dto.quantidade());

        Venda venda = new Venda(cliente.getId(), produto.getId(), dto.quantidade(), produto.getPreco());
        Venda salva = vendaRepository.save(venda);

        return toResponse(salva, cliente, produto);
    }

    private VendaResponseDTO toResponse(Venda venda) {
        Cliente cliente = clienteRepository.findById(venda.getClienteId()).orElse(null);
        Produto produto = produtoRepository.findById(venda.getProdutoId()).orElse(null);
        return toResponse(venda, cliente, produto);
    }

    private VendaResponseDTO toResponse(Venda venda, Cliente cliente, Produto produto) {
        return new VendaResponseDTO(
                venda.getId(),
                venda.getClienteId(),
                cliente != null ? cliente.getNome() : null,
                venda.getProdutoId(),
                produto != null ? produto.getNome() : null,
                venda.getQuantidade(),
                venda.getValorTotal(),
                venda.getData()
        );
    }
}