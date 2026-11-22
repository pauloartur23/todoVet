import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(evento) {
        evento.preventDefault();
        setErro('');

        const usuario = await login(email, senha);

        if (!usuario) {
            setErro('E-mail ou senha incorretos.');
            return;
        }

        navigate('/dashboard');
    }

    return (
        <div className="login-pagina">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1>todoVet</h1>
                <p className="login-subtitulo">Entre na sua conta</p>

                {erro && <p className="login-erro">{erro}</p>}

                <div className="login-campo">
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="login-campo">
                    <label htmlFor="senha">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-botao">
                    Entrar
                </button>

                <div className="login-dica">
                    <p>Contas de teste (senha 123456):</p>
                    <p>admin@todovet.com · recepcao@todovet.com</p>
                </div>
            </form>
        </div>
    );
}

export default Login;