import { listarClientes } from './clienteService.js';
import { listarProdutos } from './produtoService.js';

// Espelha Venda.java + VendaDomainService: a venda guarda só os IDs e calcula o
// valorTotal a partir do preço do produto no momento da venda. A API real só
// expõe GET (listar/buscar/por cliente) e POST (registrar) — sem edição nem exclusão.
let vendas = [
    { id: 1, clienteId: 1, produtoId: 1, quantidade: 2, valorTotal: 379.8, data: '2026-11-08' },
    { id: 2, clienteId: 3, produtoId: 4, quantidade: 1, valorTotal: 42.0, data: '2026-11-12' },
    { id: 3, clienteId: 5, produtoId: 6, quantidade: 3, valorTotal: 74.7, data: '2026-11-18' },
];

function resolver(venda, clientes, produtos) {
    const cliente = clientes.find((c) => c.id === venda.clienteId);
    const produto = produtos.find((p) => p.id === venda.produtoId);
    return {
        ...venda,
        clienteNome: cliente?.nome || 'Cliente não encontrado',
        produtoNome: produto?.nome || 'Produto não encontrado',
    };
}

export async function listarVendas() {
    const [clientes, produtos] = await Promise.all([listarClientes(), listarProdutos()]);
    return vendas
        .map((v) => resolver(v, clientes, produtos))
        .sort((a, b) => new Date(b.data) - new Date(a.data));
}

export async function registrarVenda(dados) {
    const [clientes, produtos] = await Promise.all([listarClientes(), listarProdutos()]);

    const cliente = clientes.find((c) => c.id === Number(dados.clienteId));
    if (!cliente) {
        throw new Error('O ID do cliente é obrigatório.');
    }

    const produto = produtos.find((p) => p.id === Number(dados.produtoId));
    if (!produto) {
        throw new Error('O ID do produto é obrigatório.');
    }

    const quantidade = Number(dados.quantidade);
    if (!quantidade || quantidade <= 0) {
        throw new Error('A quantidade deve ser maior que zero.');
    }

    // Como na VendaDomainService: não deixa vender mais do que há em estoque
    if (quantidade > produto.estoque) {
        throw new Error(`Estoque insuficiente. Disponível: ${produto.estoque} unidade(s).`);
    }

    const novo = {
        id: Date.now(),
        clienteId: cliente.id,
        produtoId: produto.id,
        quantidade,
        valorTotal: Number((produto.preco * quantidade).toFixed(2)),
        data: new Date().toISOString().slice(0, 10),
    };

    vendas = [...vendas, novo];
    return resolver(novo, clientes, produtos);
}