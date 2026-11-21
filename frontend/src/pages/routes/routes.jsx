import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Layout from '../../UI/Layout.jsx';
import Login from '../Login/Login.jsx';
import Dashboard from '../Dashboard';
import Pagina from '../Pagina.jsx';
import Produtos from '../Produtos/Produtos.jsx';
import Vacinas from '../Vacinas/Vacinas.jsx';
import Pagamentos from '../Pagamento/Pagamentos.jsx';

function PaginaNaoEncontrada() {
    return (
        <main className="nao-encontrada">
            <h1>Página não encontrada</h1>
            <p>O endereço acessado não existe nesta aplicação.</p>
            <Link to="/login">Voltar para o Login</Link>
        </main>
    );
}

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />

                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/agendamentos" element={<Pagina titulo="Agendamentos" />} />
                    <Route path="/clientes" element={<Pagina titulo="Clientes" />} />
                    <Route path="/pets" element={<Pagina titulo="Pets" />} />
                    <Route path="/prontuarios" element={<Pagina titulo="Prontuários" />} />
                    <Route path="/vacinas" element={<Vacinas />} />
                    <Route path="/produtos" element={<Produtos />} />
                    <Route path="/vendas" element={<Pagina titulo="Vendas" />} />
                    <Route path="/pagamentos" element={<Pagamentos />} />
                    <Route path="/funcionarios" element={<Pagina titulo="Funcionários" />} />
                </Route>

                <Route path="*" element={<PaginaNaoEncontrada />} />
            </Routes>
        </BrowserRouter>
    );
}