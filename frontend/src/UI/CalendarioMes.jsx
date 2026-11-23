import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { chaveData } from '../services/agendamentoService.js';
import './CalendarioMes.css';

const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// Calendário mensal. `selecionado` e `onSelecionar` usam datas 'AAAA-MM-DD'.
// `contagem` é um objeto { 'AAAA-MM-DD': quantidade } usado para marcar os dias com agendamentos.
function CalendarioMes({ selecionado, onSelecionar, contagem = {} }) {
    const [mesVisivel, setMesVisivel] = useState(() => {
        const [ano, mes] = selecionado.split('-').map(Number);
        return new Date(ano, mes - 1, 1);
    });

    const hoje = chaveData(new Date());
    const ano = mesVisivel.getFullYear();
    const mes = mesVisivel.getMonth();

    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    const celulas = [];
    for (let i = 0; i < primeiroDiaSemana; i++) celulas.push(null);
    for (let dia = 1; dia <= totalDias; dia++) celulas.push(new Date(ano, mes, dia));

    const titulo = mesVisivel.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    function mudarMes(delta) {
        setMesVisivel(new Date(ano, mes + delta, 1));
    }

    function irParaHoje() {
        const agora = new Date();
        setMesVisivel(new Date(agora.getFullYear(), agora.getMonth(), 1));
        onSelecionar(chaveData(agora));
    }

    return (
        <div className="calendario">
            <div className="calendario-topo">
                <button type="button" className="calendario-nav" onClick={() => mudarMes(-1)} aria-label="Mês anterior">
                    <ChevronLeft size={18} />
                </button>
                <p className="calendario-titulo">{titulo}</p>
                <button type="button" className="calendario-nav" onClick={() => mudarMes(1)} aria-label="Próximo mês">
                    <ChevronRight size={18} />
                </button>
            </div>

            <div className="calendario-grade">
                {DIAS_SEMANA.map((d, i) => (
                    <span key={i} className="calendario-semana">{d}</span>
                ))}

                {celulas.map((data, i) => {
                    if (!data) return <span key={`vazio-${i}`} />;

                    const chave = chaveData(data);
                    const qtd = contagem[chave] || 0;
                    const classes = [
                        'calendario-dia',
                        chave === selecionado ? 'selecionado' : '',
                        chave === hoje ? 'hoje' : '',
                    ].join(' ');

                    return (
                        <button
                            key={chave}
                            type="button"
                            className={classes}
                            onClick={() => onSelecionar(chave)}
                            aria-label={`${data.getDate()} de ${titulo}${qtd ? `, ${qtd} agendamento(s)` : ''}`}
                            aria-pressed={chave === selecionado}
                        >
                            {data.getDate()}
                            {qtd > 0 && <span className="calendario-ponto" />}
                        </button>
                    );
                })}
            </div>

            <button type="button" className="calendario-hoje" onClick={irParaHoje}>
                Ir para hoje
            </button>
        </div>
    );
}

export default CalendarioMes;
