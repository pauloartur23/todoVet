import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { listarClientes } from '../../services/clienteService.js';
import {
    listarPets,
    cadastrarPet,
    atualizarPet,
    excluirPet,
} from '../../services/petService.js';
import ModalDetalhes from '../../UI/ModalDetalhes.jsx';
import ModalConfirmacao from '../../UI/ModalConfirmacao.jsx';
import '../Tela.css';
import './Pets.css';

const formVazio = {
    nome: '',
    especie: '',
    raca: '',
    dataNascimento: '',
    clienteId: '',
};

function formatarData(dataIso) {
    if (!dataIso) return 'Não informada';
    const [ano, mes, dia] = dataIso.split('-');
    return `${dia}/${mes}/${ano}`;
}

function normalizar(texto) {
    return (texto || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Agrupa a espécie (texto livre) nos cards de filtro
function grupoDaEspecie(especie) {
    const e = normalizar(especie);
    if (e.includes('cachorro') || e === 'cao') return 'cachorros';
    if (e.includes('gato') || e.includes('gata')) return 'gatos';
    return 'outros';
}

function calcularIdade(dataIso) {
    const [ano, mes, dia] = dataIso.split('-').map(Number);
    const hoje = new Date();
    let meses = (hoje.getFullYear() - ano) * 12 + (hoje.getMonth() + 1 - mes);
    if (hoje.getDate() < dia) meses -= 1;

    if (meses < 0) return '';
    if (meses < 1) return 'menos de 1 mês';
    if (meses < 12) return meses === 1 ? '1 mês' : `${meses} meses`;
    const anos = Math.floor(meses / 12);
    return anos === 1 ? '1 ano' : `${anos} anos`;
}

function formatarNascimento(dataIso) {
    if (!dataIso) return 'Não informada';
    const idade = calcularIdade(dataIso);
    return idade ? `${formatarData(dataIso)} (${idade})` : formatarData(dataIso);
}

// Data de hoje no fuso local. Não usar toISOString(): à noite no Brasil ele já devolve o dia seguinte
function hojeIso() {
    const h = new Date();
    const mes = String(h.getMonth() + 1).padStart(2, '0');
    const dia = String(h.getDate()).padStart(2, '0');
    return `${h.getFullYear()}-${mes}-${dia}`;
}

function Pets() {
    const [pets, setPets] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [form, setForm] = useState(formVazio);
    const [filtro, setFiltro] = useState('todos');
    const [busca, setBusca] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [erro, setErro] = useState('');
    const [petDetalhe, setPetDetalhe] = useState(null);
    const [petParaExcluir, setPetParaExcluir] = useState(null);

    useEffect(() => {
        Promise.all([listarPets(), listarClientes()]).then(([listaPets, listaClientes]) => {
            setPets(listaPets);
            setClientes(listaClientes);
        });
    }, []);

    function donoDe(pet) {
        return clientes.find((c) => c.id === pet.clienteId);
    }

    function nomeDoDono(pet) {
        return donoDe(pet)?.nome || '';
    }

    function descricaoDoDono(pet) {
        const dono = donoDe(pet);
        return dono ? `${dono.nome} · ${dono.telefone}` : 'Não informado';
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function fecharForm() {
        setForm(formVazio);
        setEditandoId(null);
        setMostrarForm(false);
    }

    function abrirNovo() {
        setErro('');
        setForm(formVazio);
        setEditandoId(null);
        setMostrarForm(true);
    }

    function alternarForm() {
        if (mostrarForm) {
            fecharForm();
        } else {
            abrirNovo();
        }
    }

    function iniciarEdicao(pet) {
        setErro('');
        setForm({
            nome: pet.nome,
            especie: pet.especie,
            raca: pet.raca || '',
            dataNascimento: pet.dataNascimento || '',
            clienteId: pet.clienteId ?? '',
        });
        setEditandoId(pet.id);
        setMostrarForm(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');

        const payload = {
            nome: form.nome,
            especie: form.especie,
            raca: form.raca || null,
            dataNascimento: form.dataNascimento || null,
            clienteId: Number(form.clienteId),
        };

        try {
            if (editandoId) {
                const atualizado = await atualizarPet(editandoId, payload);
                setPets(pets.map((p) => (p.id === editandoId ? atualizado : p)));
            } else {
                const novo = await cadastrarPet(payload);
                setPets([...pets, novo]);
            }
            fecharForm();
        } catch (err) {
            setErro(err.message);
        }
    }

    function pedirExclusao(pet) {
        setErro('');
        setPetParaExcluir(pet);
    }

    async function confirmarExclusao() {
        const pet = petParaExcluir;
        setPetParaExcluir(null);
        try {
            await excluirPet(pet.id);
            setPets(pets.filter((p) => p.id !== pet.id));
        } catch (err) {
            setErro(err.message);
        }
    }

    function editarDoDetalhe() {
        const pet = petDetalhe;
        setPetDetalhe(null);
        iniciarEdicao(pet);
    }

    function excluirDoDetalhe() {
        const pet = petDetalhe;
        setPetDetalhe(null);
        pedirExclusao(pet);
    }

    const grupos = [
        { chave: 'todos', titulo: 'Todos', lista: pets },
        { chave: 'cachorros', titulo: 'Cachorros', lista: pets.filter((p) => grupoDaEspecie(p.especie) === 'cachorros') },
        { chave: 'gatos', titulo: 'Gatos', lista: pets.filter((p) => grupoDaEspecie(p.especie) === 'gatos') },
        { chave: 'outros', titulo: 'Outros', lista: pets.filter((p) => grupoDaEspecie(p.especie) === 'outros') },
    ];

    const termo = busca.toLowerCase();
    const visiveis = grupos
        .find((g) => g.chave === filtro)
        .lista.filter(
            (p) =>
                p.nome.toLowerCase().includes(termo) ||
                (p.raca && p.raca.toLowerCase().includes(termo)) ||
                nomeDoDono(p).toLowerCase().includes(termo)
        );

    return (
        <>
            <div className="tela-cabecalho">
                <div>
                    <h1>Pets</h1>
                    <p className="tela-subtitulo">Cadastro de pets e vinculação aos donos</p>
                </div>
                <button className="tela-botao" onClick={alternarForm}>
                    <Plus size={18} />
                    Novo pet
                </button>
            </div>

            {erro && <p className="tela-erro">{erro}</p>}

            {mostrarForm && (
                <form className="tela-form" onSubmit={handleSubmit}>
                    <div className="tela-campo">
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="especie">Espécie</label>
                        <input
                            id="especie"
                            name="especie"
                            list="especies"
                            value={form.especie}
                            onChange={handleChange}
                            disabled={editandoId !== null}
                            required
                        />
                        <datalist id="especies">
                            <option value="Cachorro" />
                            <option value="Gato" />
                            <option value="Coelho" />
                            <option value="Ave" />
                            <option value="Hamster" />
                        </datalist>
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="raca">Raça</label>
                        <input
                            id="raca"
                            name="raca"
                            value={form.raca}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="dataNascimento">Data de nascimento</label>
                        <input
                            id="dataNascimento"
                            name="dataNascimento"
                            type="date"
                            max={hojeIso()}
                            value={form.dataNascimento}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="clienteId">Dono</label>
                        <select
                            id="clienteId"
                            name="clienteId"
                            value={form.clienteId}
                            onChange={handleChange}
                            disabled={editandoId !== null}
                            required
                        >
                            <option value="">Selecione um cliente</option>
                            {clientes.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="tela-botao">
                        {editandoId ? 'Salvar alterações' : 'Salvar'}
                    </button>
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
                            {g.lista.length} {g.lista.length === 1 ? 'pet' : 'pets'}
                        </p>
                    </button>
                ))}
            </div>

            <div className="tela-busca">
                <Search size={18} />
                <input
                    placeholder="Nome, raça ou dono"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <div className="tela-tabela-caixa">
                <table className="tela-tabela">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Espécie</th>
                        <th>Raça</th>
                        <th>Nascimento</th>
                        <th>Dono</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visiveis.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>{p.especie}</td>
                            <td>{p.raca || '—'}</td>
                            <td className="pet-nascimento">
                                {p.dataNascimento ? formatarNascimento(p.dataNascimento) : '—'}
                            </td>
                            <td>{nomeDoDono(p) || '—'}</td>
                            <td>
                                <button className="tela-botao-pequeno" onClick={() => setPetDetalhe(p)}>
                                    Detalhes
                                </button>
                            </td>
                        </tr>
                    ))}
                    {visiveis.length === 0 && (
                        <tr>
                            <td colSpan={5} className="tela-vazio">Nenhum pet encontrado</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {petDetalhe && (
                <ModalDetalhes
                    titulo="Detalhes do pet"
                    campos={[
                        { rotulo: 'Nome', valor: petDetalhe.nome },
                        { rotulo: 'Espécie', valor: petDetalhe.especie },
                        { rotulo: 'Raça', valor: petDetalhe.raca || 'Não informada' },
                        { rotulo: 'Data de nascimento', valor: formatarNascimento(petDetalhe.dataNascimento) },
                        { rotulo: 'Dono', valor: descricaoDoDono(petDetalhe) },
                    ]}
                    onEditar={editarDoDetalhe}
                    onExcluir={excluirDoDetalhe}
                    onFechar={() => setPetDetalhe(null)}
                />
            )}

            <ModalConfirmacao
                aberto={petParaExcluir !== null}
                onConfirmar={confirmarExclusao}
                onCancelar={() => setPetParaExcluir(null)}
            />
        </>
    );
}

export default Pets;