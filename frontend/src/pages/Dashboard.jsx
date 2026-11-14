import Topbar from '../components/Topbar.jsx';
import './Dashboard.css';

const resumo = [
    { titulo: 'Consultas hoje', valor: 8 },
    { titulo: 'Animais cadastrados', valor: 124 },
    { titulo: 'Vacinas pendentes', valor: 5 },
];

function Dashboard() {
    return (
        <div>
            <Topbar />
            <main className="dashboard-conteudo">
                <h1>Painel</h1>
                <p className="dashboard-subtitulo">Resumo do dia na clínica</p>

                <div className="dashboard-cards">
                    {resumo.map((item) => (
                        <div key={item.titulo} className="dashboard-card">
                            <p className="dashboard-card-titulo">{item.titulo}</p>
                            <p className="dashboard-card-valor">{item.valor}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;