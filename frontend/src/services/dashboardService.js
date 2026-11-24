import { listarAgendamentos } from './agendamentoService.js';
import { chaveData } from '../utils/datas.js';

const dados = {
    indicadores: [
        { chave: 'consultas', titulo: 'Consultas hoje', valor: '8', detalhe: '+2 em relação a ontem', tendencia: 'alta' },
        { chave: 'faturamento', titulo: 'Faturamento do dia', valor: 'R$ 1.240,00', detalhe: '+12% em relação a ontem', tendencia: 'alta' },
        { chave: 'pets', titulo: 'Pets cadastrados', valor: '124', detalhe: '+3 nesta semana', tendencia: 'alta' },
        { chave: 'vacinas', titulo: 'Vacinas pendentes', valor: '5', detalhe: '2 já vencidas', tendencia: 'atencao' },
    ],

    consultasSemana: [
        { rotulo: 'Dom', valor: 0 },
        { rotulo: 'Seg', valor: 12 },
        { rotulo: 'Ter', valor: 9 },
        { rotulo: 'Qua', valor: 14 },
        { rotulo: 'Qui', valor: 11 },
        { rotulo: 'Sex', valor: 8 },
        { rotulo: 'Sáb', valor: 5 },
    ],

    alertas: [
        { chave: 'estoque', texto: '2 produtos precisam de reposição', caminho: '/produtos' },
        { chave: 'vacinas', texto: '2 vacinas com a próxima dose vencida', caminho: '/vacinas' },
        { chave: 'pagamentos', texto: '2 pagamentos em atraso', caminho: '/pagamentos' },
    ],

    proximosAgendamentos: [
        { id: 1, hora: '09:00', pet: 'Thor', tutor: 'Maria Souza', servico: 'Consulta de rotina', status: 'confirmado' },
        { id: 2, hora: '09:40', pet: 'Mel', tutor: 'João Lima', servico: 'Vacina V10', status: 'andamento' },
        { id: 3, hora: '10:30', pet: 'Bolt', tutor: 'Ana Costa', servico: 'Retorno', status: 'aguardando' },
        { id: 4, hora: '11:15', pet: 'Luna', tutor: 'Carlos Dias', servico: 'Exame de sangue', status: 'confirmado' },
        { id: 5, hora: '14:00', pet: 'Nina', tutor: 'Paula Nunes', servico: 'Avaliação cirúrgica', status: 'confirmado' },
    ],
};

export async function obterResumo() {
    const hoje = chaveData(new Date());
    const doDia = (await listarAgendamentos()).filter(
        (a) => a.data === hoje && a.status !== 'cancelado'
    );

    const concluidas = doDia.filter((a) => a.status === 'concluido').length;
    const pendentes = doDia.length - concluidas;

    const indicadores = dados.indicadores.map((i) =>
        i.chave === 'consultas'
            ? {
                ...i,
                valor: String(doDia.length),
                detalhe: `${concluidas} concluídas · ${pendentes} a atender`,
            }
            : i
    );

    const proximosAgendamentos = doDia
        .filter((a) => a.status === 'agendado')
        .map((a) => ({
            id: a.id,
            hora: a.hora,
            pet: a.petNome,
            tutor: a.tutorNome,
            servico: a.servico,
            status: a.status,
        }));

    return { ...dados, indicadores, proximosAgendamentos };
}