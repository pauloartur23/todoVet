import { PERFIS } from '../config/perfis.js';

const usuarios = [
    { email: 'admin@todovet.com', senha: '123456', nome: 'Maria Silva', perfil: PERFIS.ADMIN },
    { email: 'recepcao@todovet.com', senha: '123456', nome: 'Carla Mendes', perfil: PERFIS.RECEPCIONISTA },
];

export async function entrar(email, senha) {
    const encontrado = usuarios.find(
        (u) => u.email === email.trim().toLowerCase() && u.senha === senha
    );

    if (!encontrado) {
        return null;
    }

    return { nome: encontrado.nome, email: encontrado.email, perfil: encontrado.perfil };
}