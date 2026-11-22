import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import {
    listarClientes,
    cadastrarCliente,
    atualizarCliente,
    excluirCliente,
} from '../../services/clienteService.js';
import { listarPets } from '../../services/petService.js';
import ModalDetalhes from '../../UI/ModalDetalhes.jsx';
import ModalConfirmacao from '../../UI/ModalConfirmacao.jsx';
import '../Tela.css';
import './Clientes.css';

const formVazio = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
};

// Nomes dos pets para a tabela: os dois primeiros e "+N" para o resto
function resumoPets(lista) {
    const nomes = lista.slice(0, 2).map((p) => p.nome).join(', ');
    return lista.length > 2 ? `${nomes} +${lista.length - 2}` : nomes;
}

// Lista de pets exibida dentro do pop-up de detalhes
function ListaPets({ pets }) {
    if (pets.length === 0) {
        return <span className="cliente-sem-pets">Nenhum pet cadastrado</span>;
    }
    return (
        <ul className="cliente-pets">
            {pets.map((p) => (
                <li key={p.id}>
                    <span>{p.nome}</span>
                    <span className="cliente-pet-info">
                        {[p.especie, p.raca].filter(Boolean).join(' · ')}
                    </span>
                </li>
            ))}
        </ul>
    );
}

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [pets, setPets] = useState([]);
    const [form, setForm] = useState(formVazio);
    const [filtro, setFiltro] = useState('todos');
    const [busca, setBusca] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [erro, setErro] = useState('');
    const [clienteDetalhe, setClienteDetalhe] = useState(null);
    const [clienteParaExcluir, setClienteParaExcluir] = useState(null);

    useEffect(() => {
        Promise.all([listarClientes(), listarPets()]).then(([listaClientes, listaPets]) => {
            setClientes(listaClientes);
            setPets(listaPets);
        });
    }, []);

    function petsDo(cliente) {
        return pets.filter((p) => p.clienteId === cliente.id);
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

    function iniciarEdicao(cliente) {
        setErro('');
        setForm({
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            endereco: cliente.endereco,
        });
        setEditandoId(cliente.id);
        setMostrarForm(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        try {
            if (editandoId) {
                const atualizado = await atualizarCliente(editandoId, form);
                setClientes(clientes.map((c) => (c.id === editandoId ? atualizado : c)));
            } else {
                const novo = await cadastrarCliente(form);
                setClientes([...clientes, novo]);
            }
            fecharForm();
        } catch (err) {
            setErro(err.message);
        }
    }

    function pedirExclusao(cliente) {
        setErro('');
        setClienteParaExcluir(cliente);
    }

    async function confirmarExclusao() {
        const cliente = clienteParaExcluir;
        setClienteParaExcluir(null);
        try {
            await excluirCliente(cliente.id);
            setClientes(clientes.filter((c) => c.id !== cliente.id));
        } catch (err) {
            setErro(err.message);
        }
    }

    // Botões do pop-up de detalhes: fecham o pop-up e seguem para a ação
    function editarDoDetalhe() {
        const cliente = clienteDetalhe;
        setClienteDetalhe(null);
        iniciarEdicao(cliente);
    }

    function excluirDoDetalhe() {
        const cliente = clienteDetalhe;
        setClienteDetalhe(null);
        pedirExclusao(cliente);
    }

    const idsComPets = new Set(pets.map((p) => p.clienteId));

    const grupos = [
        { chave: 'todos', titulo: 'Todos', lista: clientes },
        { chave: 'compets', titulo: 'Com pets', lista: clientes.filter((c) => idsComPets.has(c.id)) },
        { chave: 'sempets', titulo: 'Sem pets', lista: clientes.filter((c) => !idsComPets.has(c.id)) },
    ];

    const termo = busca.toLowerCase();
    const visiveis = grupos
        .find((g) => g.chave === filtro)
        .lista.filter(
            (c) => c.nome.toLowerCase().includes(termo) || c.email.toLowerCase().includes(termo)
        );

    return (
        <>
            <div className="tela-cabecalho">
                <div>
                    <h1>Clientes</h1>
                    <p className="tela-subtitulo">Cadastro de clientes e dos pets de cada um</p>
                </div>
                <button className="tela-botao" onClick={alternarForm}>
                    <Plus size={18} />
                    Novo cliente
                </button>
            </div>

            {erro && <p className="tela-erro">{erro}</p>}

            {mostrarForm && (
                <form className="tela-form" onSubmit={handleSubmit}>
                    <div className="tela-campo">
                        <label htmlFor="nome">Nome</label>
                        <input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="email">E-mail</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="telefone">Telefone</label>
                        <input id="telefone" name="telefone" type="tel" value={form.telefone} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="endereco">Endereço</label>
                        <input id="endereco" name="endereco" value={form.endereco} onChange={handleChange} required />
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
                            {g.lista.length} {g.lista.length === 1 ? 'cliente' : 'clientes'}
                        </p>
                    </button>
                ))}
            </div>

            <div className="tela-busca">
                <Search size={18} />
                <input
                    placeholder="Nome ou e-mail"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <div className="tela-tabela-caixa">
                <table className="tela-tabela">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Pets</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visiveis.map((c) => {
                        const petsDoCliente = petsDo(c);
                        return (
                            <tr key={c.id}>
                                <td>{c.nome}</td>
                                <td>{c.email}</td>
                                <td>{c.telefone}</td>
                                <td>
                                    {petsDoCliente.length === 0 ? (
                                        <span className="cliente-sem-pets">—</span>
                                    ) : (
                                        resumoPets(petsDoCliente)
                                    )}
                                </td>
                                <td>
                                    <button className="tela-botao-pequeno" onClick={() => setClienteDetalhe(c)}>
                                        Detalhes
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {visiveis.length === 0 && (
                        <tr>
                            <td colSpan={5} className="tela-vazio">Nenhum cliente encontrado</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {clienteDetalhe && (
                <ModalDetalhes
                    titulo="Detalhes do cliente"
                    campos={[
                        { rotulo: 'Nome', valor: clienteDetalhe.nome },
                        { rotulo: 'E-mail', valor: clienteDetalhe.email },
                        { rotulo: 'Telefone', valor: clienteDetalhe.telefone },
                        { rotulo: 'Endereço', valor: clienteDetalhe.endereco },
                        { rotulo: 'Pets', valor: <ListaPets pets={petsDo(clienteDetalhe)} /> },
                    ]}
                    onEditar={editarDoDetalhe}
                    onExcluir={excluirDoDetalhe}
                    onFechar={() => setClienteDetalhe(null)}
                />
            )}

            <ModalConfirmacao
                aberto={clienteParaExcluir !== null}
                onConfirmar={confirmarExclusao}
                onCancelar={() => setClienteParaExcluir(null)}
            />
        </>
    );
}

export default Clientes;