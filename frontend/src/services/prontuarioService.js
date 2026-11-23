import { listarPets } from './petService.js';
import { listarFuncionarios } from './funcionarioService.js';

// Espelha Prontuario.java: cada registro pertence a um pet e a um veterinário (Funcionario).
// A API real só expõe GET (listar/buscar) e POST (registrar) — não há edição nem exclusão.
let prontuarios = [
    {
        id: 1,
        petId: 1,
        veterinarioId: 1,
        dataRegistro: '2026-11-10T09:30:00',
        descricao: 'Consulta de rotina. O pet apresentou bom estado geral, sem alterações.',
        prescricao: 'Nenhuma medicação necessária.',
    },
    {
        id: 2,
        petId: 3,
        veterinarioId: 5,
        dataRegistro: '2026-11-15T14:00:00',
        descricao: 'Pet apresentou vômitos e apatia nas últimas 24h. Suspeita de gastrite.',
        prescricao: 'Omeprazol 10mg, 1x ao dia por 5 dias. Retorno caso haja piora.',
    },
    {
        id: 3,
        petId: 8,
        veterinarioId: 2,
        dataRegistro: '2026-11-20T11:15:00',
        descricao: 'Avaliação pós-cirúrgica (castração). Cicatrização dentro do esperado.',
        prescricao: 'Manter colar elisabetano por mais 5 dias.',
    },
];

function resolver(prontuario, pets, funcionarios) {
    const pet = pets.find((p) => p.id === prontuario.petId);
    const veterinario = funcionarios.find((f) => f.id === prontuario.veterinarioId);
    return {
        ...prontuario,
        petNome: pet?.nome || 'Pet não encontrado',
        veterinarioNome: veterinario?.nome || 'Veterinário não encontrado',
    };
}

export async function listarProntuarios() {
    const [pets, funcionarios] = await Promise.all([listarPets(), listarFuncionarios()]);
    return prontuarios
        .map((p) => resolver(p, pets, funcionarios))
        .sort((a, b) => new Date(b.dataRegistro) - new Date(a.dataRegistro));
}

export async function registrarProntuario(dados) {
    const [pets, funcionarios] = await Promise.all([listarPets(), listarFuncionarios()]);

    const pet = pets.find((p) => p.id === Number(dados.petId));
    if (!pet) {
        throw new Error('O pet é obrigatório para registrar o prontuário.');
    }

    const veterinario = funcionarios.find((f) => f.id === Number(dados.veterinarioId));
    if (!veterinario) {
        throw new Error('O identificador do funcionário veterinário é obrigatório.');
    }

    if (!dados.descricao || !dados.descricao.trim()) {
        throw new Error('A descrição do atendimento é obrigatória.');
    }

    const novo = {
        id: Date.now(),
        petId: pet.id,
        veterinarioId: veterinario.id,
        dataRegistro: new Date().toISOString(),
        descricao: dados.descricao.trim(),
        prescricao: dados.prescricao?.trim() || '',
    };

    prontuarios = [...prontuarios, novo];
    return resolver(novo, pets, funcionarios);
}