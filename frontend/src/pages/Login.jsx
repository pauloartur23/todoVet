import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    function handleSubmit(evento) {
        evento.preventDefault();
        console.log('Tentando entrar com o e-mail:', email);
        navigate('/dashboard');
    }

    return (
        <div className="login-pagina">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1>todoVet</h1>
                <p className="login-subtitulo">Entre na sua conta</p>

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
            </form>
        </div>
    );
}

export default Login;