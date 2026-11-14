import { NavLink, useNavigate } from 'react-router-dom';
import './Topbar.css';

function Topbar() {
    const navigate = useNavigate();

    function handleSair() {
        navigate('/login');
    }

    return (
        <header className="topbar">
            <span className="topbar-logo">todoVet</span>

            <nav className="topbar-menu">
                <NavLink to="/dashboard">Início</NavLink>
            </nav>

            <button className="topbar-sair" onClick={handleSair}>
                Sair
            </button>
        </header>
    );
}

export default Topbar;