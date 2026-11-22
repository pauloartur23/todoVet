let funcionarios = [
    { id: 1, nome: 'Marina Albuquerque', email: 'marina.albuquerque@todovet.com', telefone: '(84) 99871-2034', cargo: 'VETERINARIO' },
    { id: 2, nome: 'Rafael Nogueira', email: 'rafael.nogueira@todovet.com', telefone: '(84) 99654-7781', cargo: 'VETERINARIO' },
    { id: 3, nome: 'Camila Duarte', email: 'camila.duarte@todovet.com', telefone: '(84) 98812-4410', cargo: 'RECEPCAO' },
    { id: 4, nome: 'Bruno Cavalcanti', email: 'bruno.cavalcanti@todovet.com', telefone: '(84) 99103-5526', cargo: 'RECEPCAO' },
    { id: 5, nome: 'Letícia Medeiros', email: 'leticia.medeiros@todovet.com', telefone: '(84) 99447-3098', cargo: 'VETERINARIO' },
];

// Simula funcionários com agendamento pendente (o backend recusa a exclusão com 422)
const idsComAgendamentoPendente = [2];

export async function listarFuncionarios() {
    return [...funcionarios];
}

export async function cadastrarFuncionario(dados) {
    const emailEmUso = funcionarios.some(
        (f) => f.email.toLowerCase() === dados.email.toLowerCase()
    );
    if (emailEmUso) {
        throw new Error('E-mail já cadastrado no sistema.');
    }

    // A senha (dados.password) não é guardada nem devolvida, como na API real
    const novo = {
        id: Date.now(),
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        cargo: dados.cargo,
    };
    funcionarios = [...funcionarios, novo];
    return novo;
}

export async function atualizarFuncionario(id, dados) {
    const existente = funcionarios.find((f) => f.id === id);
    if (!existente) {
        throw new Error('Funcionário não encontrado.');
    }

    // O e-mail não muda: a API só aceita nome, telefone e cargo
    const atualizado = {
        ...existente,
        nome: dados.nome,
        telefone: dados.telefone,
        cargo: dados.cargo,
    };
    funcionarios = funcionarios.map((f) => (f.id === id ? atualizado : f));
    return atualizado;
}

export async function excluirFuncionario(id) {
    if (!funcionarios.some((f) => f.id === id)) {
        throw new Error('Funcionário não encontrado.');
    }
    if (idsComAgendamentoPendente.includes(id)) {
        throw new Error('Não é possível remover um funcionário com agendamentos pendentes.');
    }
    funcionarios = funcionarios.filter((f) => f.id !== id);
}