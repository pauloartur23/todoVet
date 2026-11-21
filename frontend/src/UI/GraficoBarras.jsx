import './GraficoBarras.css';

const ALTURA = 150;

function GraficoBarras({ dados, destaque }) {
    const maior = Math.max(...dados.map((d) => d.valor));

    return (
        <div className="grafico">
            {dados.map((d, i) => (
                <div key={d.rotulo} className="grafico-coluna">
                    <span className="grafico-valor">{d.valor}</span>

                    <div className="grafico-area" style={{ height: ALTURA }}>
                        <div
                            className={`grafico-barra ${i === destaque ? 'destaque' : ''}`}
                            style={{ height: maior > 0 ? (d.valor / maior) * ALTURA : 0 }}
                        />
                    </div>

                    <span className="grafico-rotulo">{d.rotulo}</span>
                </div>
            ))}
        </div>
    );
}

export default GraficoBarras;