import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { listarVacinas, cadastrarVacina } from '../../services/vacinaService.js';
import '../Tela.css';

const formVazio = {
    pet: '',
    vacina: '',
    aplicacao: '',
    proximaDose: '',
    veterinario: '',
};

const rotulos = { vencida: 'Vencida', avencer: 'A vencer', emdia: 'Em dia' };

function situacao(v) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const proxima = new Date(v.proximaDose + 'T00:00:00');
    const dias = Math.round((proxima - hoje) / 86400000);

    if (dias < 0) return 'vencida';
    if (dias <= 30) return 'avencer';
    return 'emdia';
}

function dataBR(iso) {
    const [ano, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${ano}`;
}

function Vacinas() {
    const [vacinas, setVacinas] = useState([]);
    const [form, setForm] = useState(formVazio);
    const [filtro, setFiltro] = useState('todos');
    const [busca, setBusca] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);

    useEffect(() => {
        listarVacinas().then((lista) => setVacinas(lista));
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const nova = await cadastrarVacina(form);
        setVacinas([...vacinas, nova]);
        setForm(formVazio);
        setMostrarForm(false);
    }

    const grupos = [
        { chave: 'todos', titulo: 'Todas', lista: vacinas },
        { chave: 'vencida', titulo: 'Vencidas', lista: vacinas.filter((v) => situacao(v) === 'vencida') },
        { chave: 'avencer', titulo: 'A vencer', lista: vacinas.filter((v) => situacao(v) === 'avencer') },
    ];

    const termo = busca.toLowerCase();
    const visiveis = vacinas
        .filter((v) => filtro === 'todos' || situacao(v) === filtro)
        .filter((v) => v.pet.toLowerCase().includes(termo) || v.vacina.toLowerCase().includes(termo));

    return (
        <>
            <div className="tela-cabecalho">
                <div>
                    <h1>Vacinas</h1>
                    <p className="tela-subtitulo">Controle de vacinação dos pets da clínica</p>
                </div>
                <button className="tela-botao" onClick={() => setMostrarForm(!mostrarForm)}>
                    <Plus size={18} />
                    Nova vacina
                </button>
            </div>

            {mostrarForm && (
                <form className="tela-form" onSubmit={handleSubmit}>
                    <div className="tela-campo">
                        <label htmlFor="pet">Pet</label>
                        <input id="pet" name="pet" value={form.pet} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="vacina">Vacina</label>
                        <input id="vacina" name="vacina" value={form.vacina} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="aplicacao">Data de aplicação</label>
                        <input id="aplicacao" name="aplicacao" type="date" value={form.aplicacao} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="proximaDose">Próxima dose</label>
                        <input id="proximaDose" name="proximaDose" type="date" value={form.proximaDose} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="veterinario">Veterinário</label>
                        <input id="veterinario" name="veterinario" value={form.veterinario} onChange={handleChange} required />
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
                        <p className="tela-filtro-valor">{g.lista.length} vacinas</p>
                    </button>
                ))}
            </div>

            <div className="tela-busca">
                <Search size={18} />
                <input
                    placeholder="Pet ou vacina"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <div className="tela-tabela-caixa">
                <table className="tela-tabela">
                    <thead>
                    <tr>
                        <th>Pet</th>
                        <th>Vacina</th>
                        <th>Aplicação</th>
                        <th>Próxima dose</th>
                        <th>Veterinário</th>
                        <th>Situação</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visiveis.map((v) => (
                        <tr key={v.id}>
                            <td>{v.pet}</td>
                            <td>{v.vacina}</td>
                            <td>{dataBR(v.aplicacao)}</td>
                            <td>{dataBR(v.proximaDose)}</td>
                            <td>{v.veterinario}</td>
                            <td>
                                <span className={`selo selo-${situacao(v)}`}>{rotulos[situacao(v)]}</span>
                            </td>
                        </tr>
                    ))}
                    {visiveis.length === 0 && (
                        <tr>
                            <td colSpan={6} className="tela-vazio">Nenhuma vacina encontrada</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Vacinas;