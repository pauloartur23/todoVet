import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import {
    listarPagamentos,
    cadastrarPagamento,
    marcarComoPago,
} from '../../services/pagamentoService.js';
import '../Tela.css';

const formVazio = {
    cliente: '',
    descricao: '',
    valor: '',
    forma: 'PIX',
    vencimento: '',
};

const formas = ['PIX', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro', 'Boleto'];

const rotulos = { pago: 'Pago', pendente: 'Pendente', atrasado: 'Atrasado' };

function situacao(p) {
    if (p.pago) return 'pago';

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const vence = new Date(p.vencimento + 'T00:00:00');

    return vence < hoje ? 'atrasado' : 'pendente';
}

function dinheiro(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function dataBR(iso) {
    const [ano, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${ano}`;
}

function total(lista) {
    return lista.reduce((soma, p) => soma + p.valor, 0);
}

function Pagamentos() {
    const [pagamentos, setPagamentos] = useState([]);
    const [form, setForm] = useState(formVazio);
    const [filtro, setFiltro] = useState('todos');
    const [busca, setBusca] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);

    useEffect(() => {
        listarPagamentos().then((lista) => setPagamentos(lista));
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const novo = await cadastrarPagamento(form);
        setPagamentos([...pagamentos, novo]);
        setForm(formVazio);
        setMostrarForm(false);
    }

    async function receber(id) {
        await marcarComoPago(id);
        setPagamentos(pagamentos.map((p) => (p.id === id ? { ...p, pago: true } : p)));
    }

    const grupos = [
        { chave: 'todos', titulo: 'Todos', lista: pagamentos },
        { chave: 'pendente', titulo: 'Pendentes', lista: pagamentos.filter((p) => situacao(p) === 'pendente') },
        { chave: 'atrasado', titulo: 'Atrasados', lista: pagamentos.filter((p) => situacao(p) === 'atrasado') },
    ];

    const termo = busca.toLowerCase();
    const visiveis = pagamentos
        .filter((p) => filtro === 'todos' || situacao(p) === filtro)
        .filter((p) => p.cliente.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo));

    return (
        <>
            <div className="tela-cabecalho">
                <div>
                    <h1>Pagamentos</h1>
                    <p className="tela-subtitulo">Cobranças e recebimentos da clínica</p>
                </div>
                <button className="tela-botao" onClick={() => setMostrarForm(!mostrarForm)}>
                    <Plus size={18} />
                    Novo pagamento
                </button>
            </div>

            {mostrarForm && (
                <form className="tela-form" onSubmit={handleSubmit}>
                    <div className="tela-campo">
                        <label htmlFor="cliente">Cliente</label>
                        <input id="cliente" name="cliente" value={form.cliente} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="descricao">Descrição</label>
                        <input id="descricao" name="descricao" value={form.descricao} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="valor">Valor (R$)</label>
                        <input id="valor" name="valor" type="number" step="0.01" min="0" value={form.valor} onChange={handleChange} required />
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="forma">Forma de pagamento</label>
                        <select id="forma" name="forma" value={form.forma} onChange={handleChange}>
                            {formas.map((f) => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="vencimento">Vencimento</label>
                        <input id="vencimento" name="vencimento" type="date" value={form.vencimento} onChange={handleChange} required />
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
                        <p className="tela-filtro-valor">{dinheiro(total(g.lista))}</p>
                        <p className="tela-filtro-qtd">{g.lista.length} pagamentos</p>
                    </button>
                ))}
            </div>

            <div className="tela-busca">
                <Search size={18} />
                <input
                    placeholder="Cliente ou descrição"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <div className="tela-tabela-caixa">
                <table className="tela-tabela">
                    <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Descrição</th>
                        <th>Vencimento</th>
                        <th>Forma</th>
                        <th>Valor</th>
                        <th>Situação</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {visiveis.map((p) => (
                        <tr key={p.id}>
                            <td>{p.cliente}</td>
                            <td>{p.descricao}</td>
                            <td>{dataBR(p.vencimento)}</td>
                            <td>{p.forma}</td>
                            <td>{dinheiro(p.valor)}</td>
                            <td>
                                <span className={`selo selo-${situacao(p)}`}>{rotulos[situacao(p)]}</span>
                            </td>
                            <td>
                                {!p.pago && (
                                    <button className="tela-botao-pequeno" onClick={() => receber(p.id)}>
                                        Receber
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {visiveis.length === 0 && (
                        <tr>
                            <td colSpan={7} className="tela-vazio">Nenhum pagamento encontrado</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Pagamentos;