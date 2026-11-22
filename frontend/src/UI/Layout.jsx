import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import { podeAcessar } from '../config/menu.js';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';
import SemPermissao from './SemPermissao.jsx';
import './Layout.css';

function Layout() {
    const { usuario } = useAuth();
    const { pathname } = useLocation();

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    const permitido = podeAcessar(usuario.perfil, pathname);

    return (
        <div className="layout">
            <Sidebar />
            <div className="layout-direita">
                <TopBar />
                <main className="layout-conteudo">
                    {permitido ? <Outlet /> : <SemPermissao />}
                </main>
            </div>
        </div>
    );
}

export default Layout;