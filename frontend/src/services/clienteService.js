import { listarPets } from './petService.js';

let clientes = [
    { id: 1, nome: 'Helena Barbosa', email: 'helena.barbosa@gmail.com', telefone: '(84) 99812-3345', endereco: 'Rua das Acácias, 120 - Centro' },
    { id: 2, nome: 'Carlos Eduardo Lima', email: 'carlos.lima@outlook.com', telefone: '(84) 99654-2218', endereco: 'Av. Brasil, 845 - Alto de São Manoel' },
    { id: 3, nome: 'Fernanda Souza', email: 'fernanda.souza@gmail.com', telefone: '(84) 98877-5042', endereco: 'Rua Padre Cícero, 33 - Santo Antônio' },
    { id: 4, nome: 'Ricardo Pereira', email: 'ricardo.pereira@hotmail.com', telefone: '(84) 99120-7731', endereco: 'Travessa das Flores, 7 - Bom Jardim' },
    { id: 5, nome: 'Juliana Matos', email: 'juliana.matos@gmail.com', telefone: '(84) 99503-1186', endereco: 'Rua Coronel Gurgel, 410 - Centro' },
    { id: 6, nome: 'Antônio Ferreira', email: 'antonio.ferreira@outlook.com', telefone: '(84) 98734-9902', endereco: 'Rua do Sol, 58 - Nova Betânia' },
    { id: 7, nome: 'Patrícia Rocha', email: 'patricia.rocha@gmail.com', telefone: '(84) 99266-4457', endereco: 'Av. Rio Branco, 1290 - Doze Anos' },
    { id: 8, nome: 'Marcos Vinícius Dantas', email: 'marcos.dantas@hotmail.com', telefone: '(84) 99381-6620', endereco: 'Rua Seis, 214 - Abolição' },
];

export async function listarClientes() {
    return [...clientes];
}

export async function cadastrarCliente(dados) {
    const emailEmUso = clientes.some(
        (c) => c.email.toLowerCase() === dados.email.toLowerCase()
    );
    if (emailEmUso) {
        throw new Error('E-mail já cadastrado no sistema.');
    }

    const novo = {
        id: Date.now(),
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        endereco: dados.endereco,
    };
    clientes = [...clientes, novo];
    return novo;
}

export async function atualizarCliente(id, dados) {
    const existente = clientes.find((c) => c.id === id);
    if (!existente) {
        throw new Error('Cliente não encontrado para o ID: ' + id);
    }

    // Pode manter o próprio e-mail, mas não usar o de outro cliente
    const emailEmUsoPorOutro = clientes.some(
        (c) => c.id !== id && c.email.toLowerCase() === dados.email.toLowerCase()
    );
    if (emailEmUsoPorOutro) {
        throw new Error('O e-mail informado já está em uso por outro cliente.');
    }

    const atualizado = {
        ...existente,
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        endereco: dados.endereco,
    };
    clientes = clientes.map((c) => (c.id === id ? atualizado : c));
    return atualizado;
}

export async function excluirCliente(id) {
    if (!clientes.some((c) => c.id === id)) {
        throw new Error('Cliente não encontrado para o ID: ' + id);
    }

    // Como no backend: cliente com pets cadastrados não pode ser removido
    const pets = await listarPets();
    if (pets.some((p) => p.clienteId === id)) {
        throw new Error('Não é possível remover um cliente que possui pets cadastrados.');
    }

    clientes = clientes.filter((c) => c.id !== id);
}