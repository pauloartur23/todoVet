import { useState, useEffect } from 'react';
import { listarProdutos, cadastrarProduto } from '../services/produtoService.js';
import './Tela.css';

const formVazio = { nome: '', categoria: '', preco: '', estoque: '' };

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [form, setForm] = useState(formVazio);

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
    }

    return (
        <>
            <h1>Produtos</h1>
            <p className="tela-subtitulo">Cadastro e estoque da clínica</p>

            <form className="tela-form" onSubmit={handleSubmit}>
                <div className="tela-campo">
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
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

                <button type="submit" className="tela-botao">Cadastrar</button>
            </form>

            <div className="tela-tabela-caixa">
                <table className="tela-tabela">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>{p.categoria}</td>
                            <td>{p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td>{p.estoque}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Produtos;