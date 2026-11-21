import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './TopBar.css';

function TopBar() {
    const navigate = useNavigate();

    function handleSair() {
        navigate('/login');
    }

    return (
        <header className="topbar">
            <div className="topbar-usuario">
                <span className="topbar-avatar">MS</span>
                <span className="topbar-nome">Maria Silva</span>
            </div>

            <button className="topbar-sair" onClick={handleSair}>
                <LogOut size={18} />
                Sair
            </button>
        </header>
    );
}

export default TopBar;