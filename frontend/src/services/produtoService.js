let produtos = [
    { id: 1, nome: 'Ração Premium 10kg', codigo: '101', categoria: 'Alimentação', preco: 189.9, estoque: 14, estoqueMinimo: 5 },
    { id: 2, nome: 'Antipulgas Comprimido', codigo: '102', categoria: 'Medicamento', preco: 79.5, estoque: 3, estoqueMinimo: 10 },
    { id: 3, nome: 'Coleira Antiparasitária', codigo: '103', categoria: 'Acessório', preco: 54.0, estoque: 9, estoqueMinimo: 4 },
    { id: 4, nome: 'Shampoo Dermatológico', codigo: '104', categoria: 'Higiene', preco: 42.0, estoque: 60, estoqueMinimo: 8 },
    { id: 5, nome: 'Seringa 5ml', codigo: '105', categoria: 'Material', preco: 1.5, estoque: 2, estoqueMinimo: 50 },
    { id: 6, nome: 'Petisco Dental', codigo: '106', categoria: 'Alimentação', preco: 24.9, estoque: 40, estoqueMinimo: 10 },
];

export async function listarProdutos() {
    return [...produtos];
}

export async function cadastrarProduto(dados) {
    const novo = {
        ...dados,
        id: Date.now(),
        preco: Number(dados.preco),
        estoque: Number(dados.estoque),
        estoqueMinimo: Number(dados.estoqueMinimo),
    };
    produtos = [...produtos, novo];
    return novo;
}