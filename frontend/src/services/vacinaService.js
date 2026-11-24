import { listarFuncionarios } from './funcionarioService.js';

let vacinas = [
    { id: 1, pet: 'Thor', vacina: 'V10', aplicacao: '2025-11-10', proximaDose: '2026-11-10', veterinario: 'Marina Albuquerque' },
    { id: 2, pet: 'Mel', vacina: 'Antirrábica', aplicacao: '2025-12-01', proximaDose: '2026-12-01', veterinario: 'Rafael Nogueira' },
    { id: 3, pet: 'Bolt', vacina: 'V8', aplicacao: '2026-09-20', proximaDose: '2027-09-20', veterinario: 'Letícia Medeiros' },
    { id: 4, pet: 'Luna', vacina: 'Giárdia', aplicacao: '2026-02-10', proximaDose: '2026-10-10', veterinario: 'Rafael Nogueira' },
    { id: 5, pet: 'Nina', vacina: 'Gripe canina', aplicacao: '2026-10-30', proximaDose: '2027-10-30', veterinario: 'Marina Albuquerque' },
    { id: 6, pet: 'Rex', vacina: 'Antirrábica', aplicacao: '2025-12-10', proximaDose: '2026-12-10', veterinario: 'Letícia Medeiros' },
];

export async function listarVacinas() {
    return [...vacinas];
}

export async function cadastrarVacina(dados) {
    const funcionarios = await listarFuncionarios();
    const vetExiste = funcionarios.some(
        (f) => f.cargo === 'VETERINARIO' && f.nome === dados.veterinario
    );

    if (!vetExiste) {
        throw new Error('Selecione um veterinário válido cadastrado no sistema.');
    }

    const nova = { ...dados, id: Date.now() };
    vacinas = [...vacinas, nova];
    return nova;
}