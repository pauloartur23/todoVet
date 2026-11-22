import { NavLink } from 'react-router-dom';
import { PawPrint } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.js';
import { menuDoPerfil } from '../config/menu.js';
import './Sidebar.css';

function Sidebar() {
    const { usuario } = useAuth();
    const itens = usuario ? menuDoPerfil(usuario.perfil) : [];

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <PawPrint size={26} />
                <span className="sidebar-texto">todoVet</span>
            </div>

            <nav className="sidebar-menu">
                {itens.map(({ texto, caminho, Icone }) => (
                    <NavLink key={caminho} to={caminho} title={texto}>
                        <Icone size={20} />
                        <span className="sidebar-texto">{texto}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;