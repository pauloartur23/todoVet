import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { listarClientes } from '../../services/clienteService.js';
import { listarProdutos } from '../../services/produtoService.js';
import { listarVendas, registrarVenda } from '../../services/vendaService.js';
import ModalDetalhes from '../../UI/ModalDetalhes.jsx';
import '../Tela.css';

const formVazio = {
    clienteId: '',
    produtoId: '',
    quantidade: '',
};

function dinheiro(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function dataBR(iso) {
    const [ano, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${ano}`;
}

function ehHoje(iso) {
    const hoje = new Date();
    const h = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    return iso === h;
}

function total(lista) {
    return lista.reduce((soma, v) => soma + v.valorTotal, 0);
}

function Vendas() {
    const [vendas, setVendas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [form, setForm] = useState(formVazio);
    const [filtro, setFiltro] = useState('todos');
    const [busca, setBusca] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);
    const [erro, setErro] = useState('');
    const [detalhe, setDetalhe] = useState(null);

    useEffect(() => {
        Promise.all([listarVendas(), listarClientes(), listarProdutos()]).then(
            ([listaVendas, listaClientes, listaProdutos]) => {
                setVendas(listaVendas);
                setClientes(listaClientes);
                setProdutos(listaProdutos);
            }
        );
    }, []);

    const produtoSelecionado = produtos.find((p) => p.id === Number(form.produtoId));

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
            const nova = await registrarVenda(form);
            setVendas([nova, ...vendas]);
            // Reflete localmente a baixa de estoque feita pela VendaDomainService no back
            setProdutos(
                produtos.map((p) =>
                    p.id === nova.produtoId ? { ...p, estoque: p.estoque - nova.quantidade } : p
                )
            );
            setForm(formVazio);
            setMostrarForm(false);
        } catch (err) {
            setErro(err.message);
        }
    }

    const grupos = [
        { chave: 'todos', titulo: 'Todas', lista: vendas },
        { chave: 'hoje', titulo: 'De hoje', lista: vendas.filter((v) => ehHoje(v.data)) },
    ];

    const termo = busca.toLowerCase();
    const visiveis = grupos
        .find((g) => g.chave === filtro)
        .lista.filter(
            (v) =>
                v.clienteNome.toLowerCase().includes(termo) ||
                v.produtoNome.toLowerCase().includes(termo)
        );

    return (
        <>
            <div className="tela-cabecalho">
                <div>
                    <h1>Vendas</h1>
                    <p className="tela-subtitulo">Registro de vendas de produtos aos clientes</p>
                </div>
                <button className="tela-botao" onClick={alternarForm}>
                    <Plus size={18} />
                    Nova venda
                </button>
            </div>

            {erro && <p className="tela-erro">{erro}</p>}

            {mostrarForm && (
                <form className="tela-form" onSubmit={handleSubmit}>
                    <div className="tela-campo">
                        <label htmlFor="clienteId">Cliente</label>
                        <select id="clienteId" name="clienteId" value={form.clienteId} onChange={handleChange} required>
                            <option value="">Selecione um cliente</option>
                            {clientes.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="produtoId">Produto</label>
                        <select id="produtoId" name="produtoId" value={form.produtoId} onChange={handleChange} required>
                            <option value="">Selecione um produto</option>
                            {produtos.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nome} ({p.estoque} em estoque)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="tela-campo">
                        <label htmlFor="quantidade">Quantidade</label>
                        <input
                            id="quantidade"
                            name="quantidade"
                            type="number"
                            min="1"
                            max={produtoSelecionado?.estoque}
                            value={form.quantidade}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {produtoSelecionado && form.quantidade > 0 && (
                        <div className="tela-campo">
                            <label>Valor total</label>
                            <p className="venda-valor-previa">
                                {dinheiro(produtoSelecionado.preco * Number(form.quantidade))}
                            </p>
                        </div>
                    )}

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
                        <p className="tela-filtro-qtd">{g.lista.length} vendas</p>
                    </button>
                ))}
            </div>

            <div className="tela-busca">
                <Search size={18} />
                <input
                    placeholder="Cliente ou produto"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <div className="tela-tabela-caixa">
                <table className="tela-tabela">
                    <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Data</th>
                        <th>Valor total</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visiveis.map((v) => (
                        <tr key={v.id}>
                            <td>{v.clienteNome}</td>
                            <td>{v.produtoNome}</td>
                            <td>{v.quantidade}</td>
                            <td>{dataBR(v.data)}</td>
                            <td>{dinheiro(v.valorTotal)}</td>
                            <td>
                                <button className="tela-botao-pequeno" onClick={() => setDetalhe(v)}>
                                    Detalhes
                                </button>
                            </td>
                        </tr>
                    ))}
                    {visiveis.length === 0 && (
                        <tr>
                            <td colSpan={6} className="tela-vazio">Nenhuma venda encontrada</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {detalhe && (
                <ModalDetalhes
                    titulo="Detalhes da venda"
                    campos={[
                        { rotulo: 'Cliente', valor: detalhe.clienteNome },
                        { rotulo: 'Produto', valor: detalhe.produtoNome },
                        { rotulo: 'Quantidade', valor: detalhe.quantidade },
                        { rotulo: 'Data', valor: dataBR(detalhe.data) },
                        { rotulo: 'Valor total', valor: dinheiro(detalhe.valorTotal) },
                    ]}
                    onFechar={() => setDetalhe(null)}
                />
            )}
        </>
    );
}

export default Vendas;