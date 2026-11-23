let pets = [
    { id: 1, clienteId: 1, nome: 'Thor', especie: 'Cachorro', raca: 'Labrador', dataNascimento: '2019-03-12' },
    { id: 2, clienteId: 1, nome: 'Mel', especie: 'Gato', raca: 'Siamês', dataNascimento: '2021-07-04' },
    { id: 3, clienteId: 2, nome: 'Luna', especie: 'Gato', raca: 'SRD', dataNascimento: '2020-11-23' },
    { id: 4, clienteId: 3, nome: 'Bidu', especie: 'Cachorro', raca: 'Poodle', dataNascimento: '2018-05-30' },
    { id: 5, clienteId: 3, nome: 'Nina', especie: 'Cachorro', raca: 'Shih Tzu', dataNascimento: '2022-01-15' },
    { id: 6, clienteId: 3, nome: 'Fred', especie: 'Coelho', raca: 'SRD', dataNascimento: '2023-02-09' },
    { id: 7, clienteId: 5, nome: 'Simba', especie: 'Gato', raca: 'Persa', dataNascimento: '2020-09-18' },
    { id: 8, clienteId: 7, nome: 'Rex', especie: 'Cachorro', raca: 'Golden Retriever', dataNascimento: '2017-12-01' },
];

export async function listarPets() {
    return [...pets];
}

export async function cadastrarPet(dados) {
    const jaExiste = pets.some(
        (p) =>
            p.clienteId === Number(dados.clienteId) &&
            p.nome.trim().toLowerCase() === dados.nome.trim().toLowerCase() &&
            p.especie.trim().toLowerCase() === dados.especie.trim().toLowerCase()
    );
    if (jaExiste) {
        throw new Error('Este cliente já possui um pet com esse nome e espécie.');
    }
    const proximoId = pets.length > 0 ? Math.max(...pets.map((p) => p.id)) + 1 : 1;
    const novoPet = {
        id: proximoId,
        nome: dados.nome,
        especie: dados.especie,
        raca: dados.raca || '',
        dataNascimento: dados.dataNascimento || '',
        clienteId: Number(dados.clienteId),
    };
    pets = [...pets, novoPet];
    return novoPet;
}

export async function atualizarPet(id, dados) {
    const existente = pets.find((p) => p.id === id);
    if (!existente) {
        throw new Error('Pet não encontrado.');
    }

    // Como na API: só nome, raça e data de nascimento mudam; espécie e dono ficam como estão
    const atualizado = {
        ...existente,
        nome: dados.nome,
        raca: dados.raca || '',
        dataNascimento: dados.dataNascimento || '',
    };
    pets = pets.map((p) => (p.id === id ? atualizado : p));
    return atualizado;
}

export async function excluirPet(id) {
    const existe = pets.some((p) => p.id === id);
    if (!existe) {
        throw new Error('Pet não encontrado.');
    }
    pets = pets.filter((p) => p.id !== id);
}