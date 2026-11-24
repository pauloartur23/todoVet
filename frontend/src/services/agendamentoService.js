import { listarPets } from './petService.js';
import { listarClientes } from './clienteService.js';
import { listarFuncionarios } from './funcionarioService.js';
import { chaveData } from '../utils/datas.js';

function diasAPartirDeHoje(deslocamento) {
    const data = new Date();
    data.setDate(data.getDate() + deslocamento);
    return chaveData(data);
}

// Dados de exemplo espalhados a partir de hoje (deslocamento em dias)
let agendamentos = [
    { id: 1, petId: 1, veterinarioId: 1, data: diasAPartirDeHoje(0), hora: '09:00', servico: 'Consulta de rotina', status: 'concluído' },
    { id: 2, petId: 2, veterinarioId: 2, data: diasAPartirDeHoje(0), hora: '09:40', servico: 'Vacina V10', status: 'concluído' },
    { id: 3, petId: 3, veterinarioId: 1, data: diasAPartirDeHoje(0), hora: '10:30', servico: 'Retorno pós-cirúrgico', status: 'agendado' },
    { id: 4, petId: 5, veterinarioId: 5, data: diasAPartirDeHoje(0), hora: '14:00', servico: 'Avaliação cirúrgica', status: 'agendado' },
    { id: 5, petId: 4, veterinarioId: 2, data: diasAPartirDeHoje(1), hora: '08:30', servico: 'Exame de sangue', status: 'agendado' },
    { id: 6, petId: 6, veterinarioId: 1, data: diasAPartirDeHoje(1), hora: '11:00', servico: 'Consulta de rotina', status: 'agendado' },
    { id: 7, petId: 7, veterinarioId: 5, data: diasAPartirDeHoje(2), hora: '15:20', servico: 'Vacina antirrábica', status: 'agendado' },
    { id: 8, petId: 8, veterinarioId: 2, data: diasAPartirDeHoje(4), hora: '10:00', servico: 'Retorno', status: 'cancelado' },
    { id: 9, petId: 1, veterinarioId: 1, data: diasAPartirDeHoje(6), hora: '16:00', servico: 'Vermifugação', status: 'agendado' },
    { id: 10, petId: 3, veterinarioId: 5, data: diasAPartirDeHoje(9), hora: '09:15', servico: 'Limpeza dentária', status: 'agendado' },
    { id: 11, petId: 5, veterinarioId: 1, data: diasAPartirDeHoje(13), hora: '13:40', servico: 'Consulta de rotina', status: 'agendado' },
    { id: 12, petId: 2, veterinarioId: 2, data: diasAPartirDeHoje(18), hora: '11:30', servico: 'Vacina V10 (reforço)', status: 'agendado' },
    { id: 13, petId: 4, veterinarioId: 5, data: diasAPartirDeHoje(24), hora: '08:00', servico: 'Exame de imagem', status: 'agendado' },
    { id: 14, petId: 7, veterinarioId: 1, data: diasAPartirDeHoje(28), hora: '14:30', servico: 'Check-up anual', status: 'agendado' },
];

async function montar(lista) {
    const [pets, clientes, funcionarios] = await Promise.all([
        listarPets(),
        listarClientes(),
        listarFuncionarios(),
    ]);

    return lista
        .map((a) => {
            const pet = pets.find((p) => p.id === a.petId);
            const tutor = clientes.find((c) => c.id === pet?.clienteId);
            const vet = funcionarios.find((f) => f.id === a.veterinarioId);

            return {
                ...a,
                petNome: pet?.nome ?? '—',
                tutorNome: tutor?.nome ?? '—',
                veterinarioNome: vet?.nome ?? '—',
            };
        })
        .sort((a, b) => `${a.data} ${a.hora}`.localeCompare(`${b.data} ${b.hora}`));
}

export async function listarAgendamentos() {
    return montar(agendamentos);
}

export async function criarAgendamento(dados) {
    if (dados.data < chaveData(new Date())) {
        throw new Error('Não é possível agendar em uma data passada.');
    }
    const petId = Number(dados.petId);
    const veterinarioId = Number(dados.veterinarioId);

    const conflito = agendamentos.some(
        (a) =>
            a.veterinarioId === veterinarioId &&
            a.data === dados.data &&
            a.hora === dados.hora &&
            a.status !== 'cancelado'
    );
    if (conflito) {
        throw new Error('Este veterinário já tem um agendamento nesse dia e horário.');
    }

    const proximoId = agendamentos.length > 0 ? Math.max(...agendamentos.map((a) => a.id)) + 1 : 1;
    const novo = {
        id: proximoId,
        petId,
        veterinarioId,
        data: dados.data,
        hora: dados.hora,
        servico: dados.servico,
        status: 'agendado',
    };
    agendamentos = [...agendamentos, novo];

    const [completo] = await montar([novo]);
    return completo;
}

async function mudarStatus(id, novoStatus, acao) {
    const ag = agendamentos.find((a) => a.id === id);
    if (!ag) {
        throw new Error('Agendamento não encontrado.');
    }
    if (ag.status !== 'agendado') {
        throw new Error(`Só é possível ${acao} agendamentos com status Agendado.`);
    }
    agendamentos = agendamentos.map((a) =>
        a.id === id ? { ...a, status: novoStatus } : a
    );
}

export async function cancelarAgendamento(id) {
    await mudarStatus(id, 'cancelado', 'cancelar');
}

export async function concluirAgendamento(id) {
    await mudarStatus(id, 'concluido', 'concluir');
}
