import { useState } from 'react';
import { AuthContext } from './AuthContext.js';
import { entrar } from '../services/authService.js';
import { PERFIS } from '../config/perfis.js';

const CHAVE = 'todovet:usuario';

function lerUsuarioSalvo() {
    try {
        const texto = localStorage.getItem(CHAVE);
        const usuario = texto ? JSON.parse(texto) : null;
        const perfilValido = usuario && Object.values(PERFIS).includes(usuario.perfil);
        return perfilValido ? usuario : null;
    } catch {
        return null;
    }
}

function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(lerUsuarioSalvo);

    async function login(email, senha) {
        const encontrado = await entrar(email, senha);

        if (encontrado) {
            localStorage.setItem(CHAVE, JSON.stringify(encontrado));
            setUsuario(encontrado);
        }

        return encontrado;
    }

    function sair() {
        localStorage.removeItem(CHAVE);
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, login, sair }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;