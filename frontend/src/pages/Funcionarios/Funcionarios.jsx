import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import {
    listarFuncionarios,
    cadastrarFuncionario,
    atualizarFuncionario,
    excluirFuncionario,
} from '../../services/funcionarioService.js';
import '../Tela.css';
import ModalConfirmacao from '../../UI/ModalConfirmacao.jsx';

const formVazio = {
    nome: '',
    email: '',
    password: '',
    telefone: '',
    cargo: '',
};

const rotulos = { recepcao: 'Recepção', veterinario: 'Veterinário' };

function chaveCargo(funcionario) {
    return funcionario.cargo.toLowerCase();
}

function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [form, setForm] = useState(formVazio);
    const [filtro, setFiltro] = useState('todos');
    const [busca, setBusca] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [erro, setErro] = useState('');
    const [funcionarioParaExcluir, setFuncionarioParaExcluir] = useState(null);

    useEffect(() => {
        listarFuncionarios().then((lista) => setFuncionarios(lista));
    }, []);

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

    function iniciarEdicao(funcionario) {
        setErro('');
        setForm({
            ...formVazio,
            nome: funcionario.nome,
            email: funcionario.email,
            telefone: funcionario.telefone,
            cargo: funcionario.cargo,
        });
        setEditandoId(funcionario.id);
        setMostrarForm(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');
        try {
            if (editandoId) {
                const atualizado = await atualizarFuncionario(editandoId, {
                    nome: form.nome,
                    telefone: form.telefone,
                    cargo: form.cargo,
                });
                setFuncionarios(funcionarios.map((f) => (f.id === editandoId ? atualizado : f)));
            } else {
                const novo = await cadastrarFuncionario(form);
                setFuncionarios([...funcionarios, novo]);
            }
            fecharForm();
        } catch (err) {
            setErro(err.message);
        }
    }

    function pedirExclusao(funcionario) {
        setErro('');
        setFuncionarioParaExcluir(funcionario);
    }

    async function confirmarExclusao() {
        const funcionario = funcionarioParaExcluir;
        setFuncionarioParaExcluir(null);
        try {
            await excluirFuncionario(funcionario.id);
            setFuncionarios(funcionarios.filter((f) => f.id !== funcionario.id));
        } catch (err) {
            setErro(err.message);
        }
    }

    const grupos = [
        { chave: 'todos', titulo: 'Todos', lista: funcionarios },
        { chave: 'recepcao', titulo: 'Recepção', lista: funcionarios.filter((f) => chaveCargo(f) === 'recepcao') },
        { chave: 'veterinario', titulo: 'Veterinário', lista: funcionarios.filter((f) => chaveCargo(f) === 'veterinario') },
    ];

    const termo = busca.toLowerCase();
    const visiveis = funcionarios
        .filter((f) => filtro === 'todos' || chaveCargo(f) === filtro)
        .filter((f) => f.nome.toLowerCase().includes(termo) || f.email.toLowerCase().includes(termo));

    return (
        <>
            <div className="tela-cabecalho">
                <div>
                    <h1>Funcionários</h1>
                    <p className="tela-subtitulo">Lista e cadastro de funcionários da clínica</p>
                </div>
                <button className="tela-botao" onClick={alternarForm}>
                    <Plus size={18} />
                    Novo funcionário
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
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            disabled={editandoId !== null}
                            required
                        />
                    </div>

                    {editandoId === null && (
                        <div className="tela-campo">
                            <label htmlFor="password">Senha</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                minLength={6}
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="tela-campo">
                        <label htmlFor="telefone">Telefone</label>
                        <input id="telefone" name="telefone" type="tel" value={form.telefone} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="cargo">Cargo</label>
                        <select id="cargo" name="cargo" value={form.cargo} onChange={handleChange} required>
                            <option value="">Selecione</option>
                            <option value="RECEPCAO">Recepção</option>
                            <option value="VETERINARIO">Veterinário</option>
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
                            {g.lista.length} {g.lista.length === 1 ? 'funcionário' : 'funcionários'}
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
                        <th>Cargo</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visiveis.map((f) => (
                        <tr key={f.id}>
                            <td>{f.nome}</td>
                            <td>{f.email}</td>
                            <td>{f.telefone}</td>
                            <td>
                                <span className={`selo selo-${chaveCargo(f)}`}>{rotulos[chaveCargo(f)]}</span>
                            </td>
                            <td>
                                <div className="tela-acoes">
                                    <button className="tela-botao-pequeno" onClick={() => iniciarEdicao(f)}>
                                        Editar
                                    </button>
                                    <button className="tela-botao-perigo" onClick={() => pedirExclusao(f)}>
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {visiveis.length === 0 && (
                        <tr>
                            <td colSpan={5} className="tela-vazio">Nenhum funcionário encontrado</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <ModalConfirmacao
                aberto={funcionarioParaExcluir !== null}
                onConfirmar={confirmarExclusao}
                onCancelar={() => setFuncionarioParaExcluir(null)}
            />
        </>
    );
}

export default Funcionarios;