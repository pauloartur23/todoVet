let produtos = [
    { id: 1, nome: 'Ração Premium 10kg', categoria: 'Alimentação', preco: 189.9, estoque: 14 },
    { id: 2, nome: 'Antipulgas Comprimido', categoria: 'Medicamento', preco: 79.5, estoque: 30 },
    { id: 3, nome: 'Coleira Antiparasitária', categoria: 'Acessório', preco: 54.0, estoque: 9 },
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
    };
    produtos = [...produtos, novo];
    return novo;
}