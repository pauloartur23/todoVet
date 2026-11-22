import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.js';
import { ROTULOS_PERFIL } from '../config/perfis.js';
import './TopBar.css';

function iniciais(nome) {
    return nome
        .split(' ')
        .filter((parte) => !parte.endsWith('.'))
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase();
}

function TopBar() {
    const { usuario, sair } = useAuth();
    const navigate = useNavigate();

    function handleSair() {
        sair();
        navigate('/login');
    }

    return (
        <header className="topbar">
            {usuario && (
                <div className="topbar-usuario">
                    <span className="topbar-avatar">{iniciais(usuario.nome)}</span>
                    <div className="topbar-dados">
                        <span className="topbar-nome">{usuario.nome}</span>
                        <span className="topbar-perfil">{ROTULOS_PERFIL[usuario.perfil]}</span>
                    </div>
                </div>
            )}

            <button className="topbar-sair" onClick={handleSair}>
                <LogOut size={18} />
                Sair
            </button>
        </header>
    );
}

export default TopBar;