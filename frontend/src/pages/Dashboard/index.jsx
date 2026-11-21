import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Stethoscope,
    Wallet,
    PawPrint,
    Syringe,
    Package,
    CreditCard,
    ChevronRight,
} from 'lucide-react';
import { obterResumo } from '../../services/dashboardService.js';
import CartaoIndicador from '../../UI/CartaoIndicador.jsx';
import GraficoBarras from '../../UI/GraficoBarras.jsx';
import './Dashboard.css';

const configIndicadores = {
    consultas: { Icone: Stethoscope, cor: 'verde' },
    faturamento: { Icone: Wallet, cor: 'azul' },
    pets: { Icone: PawPrint, cor: 'roxo' },
    vacinas: { Icone: Syringe, cor: 'laranja' },
};

const configAlertas = {
    estoque: { Icone: Package, cor: 'roxo' },
    vacinas: { Icone: Syringe, cor: 'laranja' },
    pagamentos: { Icone: CreditCard, cor: 'vermelho' },
};

const rotulosStatus = {
    confirmado: 'Confirmado',
    andamento: 'Em atendimento',
    aguardando: 'Aguardando',
};

function saudacao() {
    const hora = new Date().getHours();
    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
}

function dataHoje() {
    return new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function Dashboard() {
    const [resumo, setResumo] = useState(null);

    useEffect(() => {
        obterResumo().then((dados) => setResumo(dados));
    }, []);

    if (!resumo) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <div className="dashboard-cabecalho">
                <h1>{saudacao()}!</h1>
                <p className="dashboard-data">{dataHoje()}</p>
            </div>

            <section className="dashboard-indicadores">
                {resumo.indicadores.map((i) => (
                    <CartaoIndicador
                        key={i.chave}
                        titulo={i.titulo}
                        valor={i.valor}
                        detalhe={i.detalhe}
                        tendencia={i.tendencia}
                        Icone={configIndicadores[i.chave].Icone}
                        cor={configIndicadores[i.chave].cor}
                    />
                ))}
            </section>

            <div className="dashboard-grade">
                <section className="dashboard-painel">
                    <h2>Consultas na semana</h2>
                    <p className="dashboard-painel-sub">Atendimentos realizados por dia</p>
                    <GraficoBarras dados={resumo.consultasSemana} destaque={new Date().getDay()} />
                </section>

                <section className="dashboard-painel">
                    <h2>Requer atenção</h2>
                    <p className="dashboard-painel-sub">Itens que pedem ação hoje</p>

                    <ul className="alerta-lista">
                        {resumo.alertas.map((a) => {
                            const { Icone, cor } = configAlertas[a.chave];

                            return (
                                <li key={a.chave}>
                                    <Link to={a.caminho} className="alerta-item">
                    <span className={`alerta-icone alerta-${cor}`}>
                      <Icone size={18} />
                    </span>
                                        <span className="alerta-texto">{a.texto}</span>
                                        <ChevronRight size={18} />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </div>

            <section className="dashboard-painel">
                <h2>Próximos agendamentos</h2>
                <p className="dashboard-painel-sub">Fila de atendimento de hoje</p>

                <ul className="agenda-lista">
                    {resumo.proximosAgendamentos.map((a) => (
                        <li key={a.id} className="agenda-item">
                            <span className="agenda-hora">{a.hora}</span>

                            <div className="agenda-info">
                                <p className="agenda-pet">
                                    {a.pet} <span className="agenda-tutor">· {a.tutor}</span>
                                </p>
                                <p className="agenda-servico">{a.servico}</p>
                            </div>

                            <span className={`agenda-selo agenda-selo-${a.status}`}>
                {rotulosStatus[a.status]}
              </span>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default Dashboard;