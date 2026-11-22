import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.js';
import { ROTULOS_PERFIL } from '../config/perfis.js';
import './SemPermissao.css';

function SemPermissao() {
    const { usuario } = useAuth();

    return (
        <div className="sem-permissao">
            <div className="sem-permissao-icone">
                <Lock size={28} />
            </div>
            <h1>Acesso restrito</h1>
            <p>O perfil {ROTULOS_PERFIL[usuario.perfil]} não tem acesso a esta tela.</p>
            <Link to="/dashboard">Voltar ao início</Link>
        </div>
    );
}

export default SemPermissao;