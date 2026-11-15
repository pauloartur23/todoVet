let vacinas = [
    { id: 1, pet: 'Thor', vacina: 'V10', aplicacao: '2025-11-10', proximaDose: '2026-11-10', veterinario: 'Dra. Ana' },
    { id: 2, pet: 'Mel', vacina: 'Antirrábica', aplicacao: '2025-12-01', proximaDose: '2026-12-01', veterinario: 'Dr. Paulo' },
    { id: 3, pet: 'Bolt', vacina: 'V8', aplicacao: '2026-09-20', proximaDose: '2027-09-20', veterinario: 'Dra. Ana' },
    { id: 4, pet: 'Luna', vacina: 'Giárdia', aplicacao: '2026-02-10', proximaDose: '2026-10-10', veterinario: 'Dr. Paulo' },
    { id: 5, pet: 'Nina', vacina: 'Gripe canina', aplicacao: '2026-10-30', proximaDose: '2027-10-30', veterinario: 'Dra. Ana' },
    { id: 6, pet: 'Rex', vacina: 'Antirrábica', aplicacao: '2025-12-10', proximaDose: '2026-12-10', veterinario: 'Dr. Paulo' },
];

export async function listarVacinas() {
    return [...vacinas];
}

export async function cadastrarVacina(dados) {
    const nova = { ...dados, id: Date.now() };
    vacinas = [...vacinas, nova];
    return nova;
}