import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Pagina from './pages/Pagina.jsx';
import Produtos from './pages/Produtos.jsx';
import Vacinas from './pages/Vacinas.jsx';
import Pagamentos from './pages/Pagamentos.jsx';

function App() {
    return (
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
        </Routes>
    );
}

export default App;