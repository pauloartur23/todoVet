import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { listarProdutos, cadastrarProduto } from '../services/produtoService.js';
import './Tela.css';

const formVazio = {
    nome: '',
    codigo: '',
    categoria: '',
    preco: '',
    estoque: '',
    estoqueMinimo: '',
};

const rotulos = { repor: 'Repor', excesso: 'Em excesso', normal: 'Normal' };

function situacao(produto) {
    if (produto.estoque <= produto.estoqueMinimo) return 'repor';
    if (produto.estoque > produto.estoqueMinimo * 3) return 'excesso';
    return 'normal';
}

function dinheiro(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function valorTotal(lista) {
    return lista.reduce((soma, p) => soma + p.preco * p.estoque, 0);
}

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [form, setForm] = useState(formVazio);
    const [filtro, setFiltro] = useState('todos');
    const [busca, setBusca] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);

    useEffect(() => {
        listarProdutos().then((lista) => setProdutos(lista));
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const novo = await cadastrarProduto(form);
        setProdutos([...produtos, novo]);
        setForm(formVazio);
        setMostrarForm(false);
    }

    const grupos = [
        { chave: 'todos', titulo: 'Todos', lista: produtos },
        { chave: 'repor', titulo: 'Repor', lista: produtos.filter((p) => situacao(p) === 'repor') },
        { chave: 'excesso', titulo: 'Em excesso', lista: produtos.filter((p) => situacao(p) === 'excesso') },
    ];

    const termo = busca.toLowerCase();
    const visiveis = produtos
        .filter((p) => filtro === 'todos' || situacao(p) === filtro)
        .filter((p) => p.nome.toLowerCase().includes(termo) || p.codigo.includes(termo));

    return (
        <>
            <div className="tela-cabecalho">
                <div>
                    <h1>Produtos</h1>
                    <p className="tela-subtitulo">Estoque e cadastro de produtos da clínica</p>
                </div>
                <button className="tela-botao" onClick={() => setMostrarForm(!mostrarForm)}>
                    <Plus size={18} />
                    Novo produto
                </button>
            </div>

            {mostrarForm && (
                <form className="tela-form" onSubmit={handleSubmit}>
                    <div className="tela-campo">
                        <label htmlFor="nome">Nome</label>
                        <input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="codigo">Código</label>
                        <input id="codigo" name="codigo" value={form.codigo} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="categoria">Categoria</label>
                        <input id="categoria" name="categoria" value={form.categoria} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="preco">Preço (R$)</label>
                        <input id="preco" name="preco" type="number" step="0.01" min="0" value={form.preco} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="estoque">Estoque</label>
                        <input id="estoque" name="estoque" type="number" min="0" value={form.estoque} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="estoqueMinimo">Estoque mínimo</label>
                        <input id="estoqueMinimo" name="estoqueMinimo" type="number" min="0" value={form.estoqueMinimo} onChange={handleChange} required />
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
                        <p className="tela-filtro-valor">{dinheiro(valorTotal(g.lista))}</p>
                        <p className="tela-filtro-qtd">{g.lista.length} produtos</p>
                    </button>
                ))}
            </div>

            <div className="tela-busca">
                <Search size={18} />
                <input
                    placeholder="Nome ou código"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <div className="tela-tabela-caixa">
                <table className="tela-tabela">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Código</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                        <th>Preço</th>
                        <th>Situação</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visiveis.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>{p.codigo}</td>
                            <td>{p.categoria}</td>
                            <td>{p.estoque}</td>
                            <td>{dinheiro(p.preco)}</td>
                            <td>
                                <span className={`selo selo-${situacao(p)}`}>{rotulos[situacao(p)]}</span>
                            </td>
                        </tr>
                    ))}
                    {visiveis.length === 0 && (
                        <tr>
                            <td colSpan={6} className="tela-vazio">Nenhum produto encontrado</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Produtos;