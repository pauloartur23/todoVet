import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { listarPets } from '../../services/petService.js';
import { listarFuncionarios } from '../../services/funcionarioService.js';
import { listarProntuarios, registrarProntuario } from '../../services/prontuarioService.js';
import ModalDetalhes from '../../UI/ModalDetalhes.jsx';
import '../Tela.css';

const formVazio = {
    petId: '',
    veterinarioId: '',
    descricao: '',
    prescricao: '',
};

function dataHoraBR(iso) {
    const data = new Date(iso);
    return data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function ehHoje(iso) {
    const hoje = new Date();
    const data = new Date(iso);
    return (
        data.getDate() === hoje.getDate() &&
        data.getMonth() === hoje.getMonth() &&
        data.getFullYear() === hoje.getFullYear()
    );
}

function truncar(texto, tamanho = 60) {
    if (!texto) return '—';
    return texto.length > tamanho ? `${texto.slice(0, tamanho)}…` : texto;
}

function Prontuarios() {
    const [prontuarios, setProntuarios] = useState([]);
    const [pets, setPets] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [form, setForm] = useState(formVazio);
    const [filtro, setFiltro] = useState('todos');
    const [busca, setBusca] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);
    const [erro, setErro] = useState('');
    const [detalhe, setDetalhe] = useState(null);

    useEffect(() => {
        Promise.all([listarProntuarios(), listarPets(), listarFuncionarios()]).then(
            ([listaProntuarios, listaPets, listaFuncionarios]) => {
                setProntuarios(listaProntuarios);
                setPets(listaPets);
                setVeterinarios(listaFuncionarios.filter((f) => f.cargo === 'VETERINARIO'));
            }
        );
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function abrirNovo() {
        setErro('');
        setForm(formVazio);
        setMostrarForm(true);
    }

    function alternarForm() {
        if (mostrarForm) {
            setForm(formVazio);
            setMostrarForm(false);
        } else {
            abrirNovo();
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        try {
            const novo = await registrarProntuario(form);
            setProntuarios([novo, ...prontuarios]);
            setForm(formVazio);
            setMostrarForm(false);
        } catch (err) {
            setErro(err.message);
        }
    }

    const grupos = [
        { chave: 'todos', titulo: 'Todos', lista: prontuarios },
        { chave: 'hoje', titulo: 'De hoje', lista: prontuarios.filter((p) => ehHoje(p.dataRegistro)) },
    ];

    const termo = busca.toLowerCase();
    const visiveis = grupos
        .find((g) => g.chave === filtro)
        .lista.filter(
            (p) =>
                p.petNome.toLowerCase().includes(termo) ||
                p.veterinarioNome.toLowerCase().includes(termo)
        );

    return (
        <>
            <div className="tela-cabecalho">
                <div>
                    <h1>Prontuários</h1>
                    <p className="tela-subtitulo">Registros de atendimento dos pets</p>
                </div>
                <button className="tela-botao" onClick={alternarForm}>
                    <Plus size={18} />
                    Novo prontuário
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

                    <div className="tela-campo tela-campo-largo">
                        <label htmlFor="descricao">Descrição do atendimento</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            rows={3}
                            value={form.descricao}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="tela-campo tela-campo-largo">
                        <label htmlFor="prescricao">Prescrição (opcional)</label>
                        <textarea
                            id="prescricao"
                            name="prescricao"
                            rows={2}
                            value={form.prescricao}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="tela-botao">Salvar</button>
                </form>
            )}

            <div className="tela-filtros">
                {grupos.map((g) => (
                    <button
                        key={g.chave}
                        className={`tela-filtro tela-filtro-${g.chave} ${filtro === g.chave ? 'ativo' : ''}`}
                        onClick={() => setFiltro(g.chave)}
                    >
                        <p className="tela-filtro-titulo">{g.titulo}</p>
                        <p className="tela-filtro-qtd">
                            {g.lista.length} {g.lista.length === 1 ? 'registro' : 'registros'}
                        </p>
                    </button>
                ))}
            </div>

            <div className="tela-busca">
                <Search size={18} />
                <input
                    placeholder="Pet ou veterinário"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <div className="tela-tabela-caixa">
                <table className="tela-tabela">
                    <thead>
                    <tr>
                        <th>Pet</th>
                        <th>Veterinário</th>
                        <th>Data/Hora</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visiveis.map((p) => (
                        <tr key={p.id}>
                            <td>{p.petNome}</td>
                            <td>{p.veterinarioNome}</td>
                            <td>{dataHoraBR(p.dataRegistro)}</td>
                            <td>{truncar(p.descricao)}</td>
                            <td>
                                <button className="tela-botao-pequeno" onClick={() => setDetalhe(p)}>
                                    Detalhes
                                </button>
                            </td>
                        </tr>
                    ))}
                    {visiveis.length === 0 && (
                        <tr>
                            <td colSpan={5} className="tela-vazio">Nenhum prontuário encontrado</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {detalhe && (
                <ModalDetalhes
                    titulo="Detalhes do prontuário"
                    campos={[
                        { rotulo: 'Pet', valor: detalhe.petNome },
                        { rotulo: 'Veterinário', valor: detalhe.veterinarioNome },
                        { rotulo: 'Data/Hora', valor: dataHoraBR(detalhe.dataRegistro) },
                        { rotulo: 'Descrição', valor: detalhe.descricao },
                        { rotulo: 'Prescrição', valor: detalhe.prescricao || 'Nenhuma prescrição registrada' },
                    ]}
                    onFechar={() => setDetalhe(null)}
                />
            )}
        </>
    );
}

export default Prontuarios;