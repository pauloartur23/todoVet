let pagamentos = [
    { id: 1, cliente: 'Maria Souza', descricao: 'Consulta - Thor', valor: 120.0, forma: 'PIX', vencimento: '2026-11-05', pago: false },
    { id: 2, cliente: 'João Lima', descricao: 'Vacina V10 - Mel', valor: 95.0, forma: 'Cartão de crédito', vencimento: '2026-10-28', pago: false },
    { id: 3, cliente: 'Ana Costa', descricao: 'Banho e tosa - Bolt', valor: 70.0, forma: 'Dinheiro', vencimento: '2026-11-20', pago: false },
    { id: 4, cliente: 'Carlos Dias', descricao: 'Cirurgia - Luna', valor: 850.0, forma: 'Boleto', vencimento: '2026-11-30', pago: false },
    { id: 5, cliente: 'Paula Nunes', descricao: 'Exame de sangue - Nina', valor: 180.0, forma: 'PIX', vencimento: '2026-11-01', pago: true },
    { id: 6, cliente: 'Rui Alves', descricao: 'Ração Premium 10kg', valor: 189.9, forma: 'Cartão de débito', vencimento: '2026-11-10', pago: true },
];

export async function listarPagamentos() {
    return [...pagamentos];
}

export async function cadastrarPagamento(dados) {
    const novo = { ...dados, id: Date.now(), valor: Number(dados.valor), pago: false };
    pagamentos = [...pagamentos, novo];
    return novo;
}

export async function marcarComoPago(id) {
    pagamentos = pagamentos.map((p) => (p.id === id ? { ...p, pago: true } : p));
}