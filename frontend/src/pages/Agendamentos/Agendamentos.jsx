import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { listarPets } from '../../services/petService.js';
import { listarFuncionarios } from '../../services/funcionarioService.js';
import {
    listarAgendamentos,
    criarAgendamento,
    cancelarAgendamento,
    chaveData,
} from '../../services/agendamentoService.js';
import CalendarioMes from '../../UI/CalendarioMes.jsx';
import ModalConfirmacao from '../../UI/ModalConfirmacao.jsx';
import '../Tela.css';
import './Agendamentos.css';

const rotulosStatus = {
    confirmado: 'Confirmado',
    andamento: 'Em atendimento',
    aguardando: 'Aguardando',
};

function hojeChave() {
    return chaveData(new Date());
}

function somarDias(chave, dias) {
    const [ano, mes, dia] = chave.split('-').map(Number);
    return chaveData(new Date(ano, mes - 1, dia + dias));
}

function dataPorExtenso(chave, opcoes) {
    const [ano, mes, dia] = chave.split('-').map(Number);
    return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', opcoes);
}

const formVazio = {
    petId: '',
    veterinarioId: '',
    data: '',
    hora: '',
    servico: '',
};

function ItemAgendamento({ a, onCancelar }) {
    return (
        <li className="agenda-item">
            <span className="agenda-hora">{a.hora}</span>

            <div className="agenda-info">
                <p className="agenda-pet">
                    {a.petNome} <span className="agenda-tutor">· {a.tutorNome}</span>
                </p>
                <p className="agenda-servico">
                    {a.servico} · {a.veterinarioNome}
                </p>
            </div>

            <span className={`agenda-selo agenda-selo-${a.status}`}>{rotulosStatus[a.status]}</span>

            <button className="tela-botao-pequeno" onClick={() => onCancelar(a)}>
                Cancelar
            </button>
        </li>
    );
}

function Agendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [pets, setPets] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [aba, setAba] = useState('dia');
    const [diaSelecionado, setDiaSelecionado] = useState(hojeChave);
    const [form, setForm] = useState(formVazio);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [erro, setErro] = useState('');
    const [paraCancelar, setParaCancelar] = useState(null);

    useEffect(() => {
        Promise.all([listarAgendamentos(), listarPets(), listarFuncionarios()]).then(
            ([listaAgendamentos, listaPets, listaFuncionarios]) => {
                setAgendamentos(listaAgendamentos);
                setPets(listaPets);
                setVeterinarios(listaFuncionarios.filter((f) => f.cargo === 'VETERINARIO'));
            }
        );
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function alternarForm() {
        if (mostrarForm) {
            setForm(formVazio);
            setMostrarForm(false);
        } else {
            setErro('');
            setForm({ ...formVazio, data: diaSelecionado });
            setMostrarForm(true);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        try {
            const novo = await criarAgendamento(form);
            setAgendamentos(
                [...agendamentos, novo].sort((a, b) =>
                    `${a.data} ${a.hora}`.localeCompare(`${b.data} ${b.hora}`)
                )
            );
            setDiaSelecionado(novo.data);
            setAba('dia');
            setForm(formVazio);
            setMostrarForm(false);
        } catch (err) {
            setErro(err.message);
        }
    }

    async function confirmarCancelamento() {
        try {
            await cancelarAgendamento(paraCancelar.id);
            setAgendamentos(agendamentos.filter((a) => a.id !== paraCancelar.id));
        } catch (err) {
            setErro(err.message);
        }
        setParaCancelar(null);
    }

    const hoje = hojeChave();
    const limite7 = somarDias(hoje, 6);
    const limite30 = somarDias(hoje, 29);

    const doDia = agendamentos.filter((a) => a.data === diaSelecionado);
    const proximos7 = agendamentos.filter((a) => a.data >= hoje && a.data <= limite7);
    const proximos30 = agendamentos.filter((a) => a.data >= hoje && a.data <= limite30);

    const abas = [
        { chave: 'dia', titulo: 'Do dia', lista: doDia },
        { chave: '7dias', titulo: 'Próximos 7 dias', lista: proximos7 },
        { chave: '30dias', titulo: 'Próximos 30 dias', lista: proximos30 },
    ];

    const contagem = agendamentos.reduce((acc, a) => {
        acc[a.data] = (acc[a.data] || 0) + 1;
        return acc;
    }, {});

    // Agrupa a lista de 7/30 dias por data
    const listaPeriodo = aba === '7dias' ? proximos7 : proximos30;
    const porData = listaPeriodo.reduce((acc, a) => {
        (acc[a.data] = acc[a.data] || []).push(a);
        return acc;
    }, {});
    const datasPeriodo = Object.keys(porData).sort();

    const tituloDia =
        diaSelecionado === hoje
            ? 'Hoje'
            : dataPorExtenso(diaSelecionado, { weekday: 'long' });

    return (
        <>
            <div className="tela-cabecalho">
                <div>
                    <h1>Agendamentos</h1>
                    <p className="tela-subtitulo">Acompanhe e organize os atendimentos agendados</p>
                </div>
                <button className="tela-botao" onClick={alternarForm}>
                    <Plus size={18} />
                    Novo agendamento
                </button>
            </div>

            {erro && <p className="tela-erro">{erro}</p>}

            {mostrarForm && (
                <form className="tela-form" onSubmit={handleSubmit}>
                    <div className="tela-campo">
                        <label htmlFor="petId">Pet</label>
                        <select id="petId" name="petId" value={form.petId} onChange={handleChange} required>
                            <option value="">Selecione um pet</option>
                            {pets.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="veterinarioId">Veterinário</label>
                        <select
                            id="veterinarioId"
                            name="veterinarioId"
                            value={form.veterinarioId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione um veterinário</option>
                            {veterinarios.map((v) => (
                                <option key={v.id} value={v.id}>
                                    {v.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="data">Data</label>
                        <input
                            id="data"
                            name="data"
                            type="date"
                            min={hoje}
                            value={form.data}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="hora">Horário</label>
                        <input
                            id="hora"
                            name="hora"
                            type="time"
                            value={form.hora}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="servico">Motivo / serviço</label>
                        <input
                            id="servico"
                            name="servico"
                            value={form.servico}
                            onChange={handleChange}
                            placeholder="Ex.: Consulta de rotina"
                            required
                        />
                    </div>

                    <button type="submit" className="tela-botao">Agendar</button>
                </form>
            )}

            <div className="tela-filtros" role="tablist">
                {abas.map((t) => (
                    <button
                        key={t.chave}
                        role="tab"
                        aria-selected={aba === t.chave}
                        className={`tela-filtro tela-filtro-hoje ${aba === t.chave ? 'ativo' : ''}`}
                        onClick={() => setAba(t.chave)}
                    >
                        <p className="tela-filtro-titulo">{t.titulo}</p>
                        <p className="tela-filtro-qtd">
                            {t.lista.length} {t.lista.length === 1 ? 'agendamento' : 'agendamentos'}
                        </p>
                    </button>
                ))}
            </div>

            {aba === 'dia' && (
                <div className="agendamentos-grade">
                    <section className="dashboard-painel agendamentos-calendario">
                        <h2>Calendário</h2>
                        <p className="dashboard-painel-sub">Escolha um dia para ver a agenda</p>
                        <CalendarioMes
                            selecionado={diaSelecionado}
                            onSelecionar={setDiaSelecionado}
                            contagem={contagem}
                        />
                    </section>

                    <section className="dashboard-painel">
                        <h2 className="agendamentos-dia-titulo">{tituloDia}</h2>
                        <p className="dashboard-painel-sub">
                            {dataPorExtenso(diaSelecionado, { day: 'numeric', month: 'long', year: 'numeric' })}
                            {' · '}
                            {doDia.length} {doDia.length === 1 ? 'agendamento' : 'agendamentos'}
                        </p>

                        {doDia.length === 0 ? (
                            <p className="tela-vazio agendamentos-vazio">Nenhum agendamento para este dia</p>
                        ) : (
                            <ul className="agenda-lista">
                                {doDia.map((a) => (
                                    <ItemAgendamento key={a.id} a={a} onCancelar={setParaCancelar} />
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            )}

            {aba !== 'dia' && (
                <section className="dashboard-painel">
                    <h2>{aba === '7dias' ? 'Próximos 7 dias' : 'Próximos 30 dias'}</h2>
                    <p className="dashboard-painel-sub">Agendamentos organizados por data</p>

                    {datasPeriodo.length === 0 && (
                        <p className="tela-vazio agendamentos-vazio">Nenhum agendamento neste período</p>
                    )}

                    {datasPeriodo.map((data) => (
                        <div key={data} className="agendamentos-grupo">
                            <h3 className="agendamentos-grupo-titulo">
                                {data === hoje
                                    ? 'Hoje · '
                                    : data === somarDias(hoje, 1)
                                        ? 'Amanhã · '
                                        : ''}
                                {dataPorExtenso(data, { weekday: 'long', day: 'numeric', month: 'long' })}
                            </h3>
                            <ul className="agenda-lista">
                                {porData[data].map((a) => (
                                    <ItemAgendamento key={a.id} a={a} onCancelar={setParaCancelar} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            <ModalConfirmacao
                aberto={paraCancelar !== null}
                titulo="Cancelar agendamento"
                mensagem={
                    paraCancelar
                        ? `Cancelar o agendamento de ${paraCancelar.petNome} em ${dataPorExtenso(paraCancelar.data, { day: '2-digit', month: '2-digit' })} às ${paraCancelar.hora}?`
                        : ''
                }
                textoConfirmar="Cancelar agendamento"
                textoCancelar="Voltar"
                onConfirmar={confirmarCancelamento}
                onCancelar={() => setParaCancelar(null)}
            />
        </>
    );
}

export default Agendamentos;
