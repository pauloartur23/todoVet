import { useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';
import './ModalConfirmacao.css';

function ModalConfirmacao({
                              aberto,
                              titulo = 'Confirmar exclusão',
                              mensagem = 'Tem certeza que deseja excluir?',
                              textoConfirmar = 'Excluir',
                              textoCancelar = 'Cancelar',
                              onConfirmar,
                              onCancelar,
                          }) {
    // Esc fecha o pop-up
    useEffect(() => {
        if (!aberto) return;
        function aoPressionar(e) {
            if (e.key === 'Escape') onCancelar();
        }
        document.addEventListener('keydown', aoPressionar);
        return () => document.removeEventListener('keydown', aoPressionar);
    }, [aberto, onCancelar]);

    if (!aberto) return null;

    return (
        <div className="modal-fundo" onClick={onCancelar}>
            <div
                className="modal-caixa"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-titulo"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="modal-titulo" className="modal-titulo">{titulo}</h2>

                <div className="modal-mensagem">
                    <TriangleAlert size={40} className="modal-icone" />
                    <p>{mensagem}</p>
                </div>

                <div className="modal-acoes">
                    <button className="modal-botao-confirmar" onClick={onConfirmar}>
                        {textoConfirmar}
                    </button>
                    {/* autoFocus no Cancelar: apertar Enter sem querer não exclui nada */}
                    <button className="modal-botao-cancelar" onClick={onCancelar} autoFocus>
                        {textoCancelar}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmacao;