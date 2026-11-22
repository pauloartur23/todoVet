/**
 * Pop-up genérico de detalhes: título, lista de "rótulo: valor" e ações opcionais.
 *
 * Props:
 *  - titulo    (string)  título do pop-up
 *  - campos    (array)   [{ rotulo: 'Nome', valor: 'Maria' }]; o valor pode ser texto ou JSX
 *  - onEditar  (função)  opcional; se passada, aparece o botão Editar
 *  - onExcluir (função)  opcional; se passada, aparece o botão Excluir
 *  - onFechar  (função)  chamada pelo "X", pelo Esc e pelo clique fora
 *
 * O pop-up existe enquanto estiver renderizado, então o pai renderiza só quando
 * há um item selecionado:
 *
 *  {cliente && (
 *      <ModalDetalhes
 *          titulo="Detalhes do cliente"
 *          campos={[{ rotulo: 'Nome', valor: cliente.nome }]}
 *          onEditar={() => editar(cliente)}
 *          onExcluir={() => excluir(cliente)}
 *          onFechar={() => setCliente(null)}
 *      />
 *  )}
 */
import Modal from './Modal.jsx';
import './ModalDetalhes.css';

function ModalDetalhes({ titulo, campos, onEditar, onExcluir, onFechar }) {
    return (
        <Modal aberto titulo={titulo} onFechar={onFechar} mostrarFechar>
            <dl className="detalhes-lista">
                {campos.map((campo) => (
                    <div className="detalhes-item" key={campo.rotulo}>
                        <dt>{campo.rotulo}</dt>
                        <dd>{campo.valor}</dd>
                    </div>
                ))}
            </dl>

            {(onEditar || onExcluir) && (
                <div className="detalhes-acoes">
                    {onExcluir && (
                        <button className="detalhes-excluir" onClick={() => onExcluir()}>
                            Excluir
                        </button>
                    )}
                    {onEditar && (
                        <button className="detalhes-editar" onClick={() => onEditar()}>
                            Editar
                        </button>
                    )}
                </div>
            )}
        </Modal>
    );
}

export default ModalDetalhes;