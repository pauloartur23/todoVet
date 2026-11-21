import './CartaoIndicador.css';

function CartaoIndicador({ titulo, valor, detalhe, tendencia, Icone, cor }) {
    return (
        <div className="indicador">
            <div className={`indicador-icone indicador-${cor}`}>
                <Icone size={22} />
            </div>

            <div className="indicador-texto">
                <p className="indicador-titulo">{titulo}</p>
                <p className="indicador-valor">{valor}</p>
                <p className={`indicador-detalhe indicador-detalhe-${tendencia}`}>{detalhe}</p>
            </div>
        </div>
    );
}

export default CartaoIndicador;