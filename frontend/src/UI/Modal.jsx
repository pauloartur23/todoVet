import { useEffect } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

function Modal({ aberto, titulo, onFechar, mostrarFechar = false, children }) {
    // Esc fecha o pop-up
    useEffect(() => {
        if (!aberto) return;
        function aoPressionar(e) {
            if (e.key === 'Escape') onFechar();
        }
        document.addEventListener('keydown', aoPressionar);
        return () => document.removeEventListener('keydown', aoPressionar);
    }, [aberto, onFechar]);

    if (!aberto) return null;

    return (
        <div className="modal-fundo" onClick={onFechar}>
            <div
                className="modal-caixa"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-titulo"
                onClick={(e) => e.stopPropagation()}
            >
                {mostrarFechar && (
                    <button className="modal-fechar" onClick={onFechar} aria-label="Fechar">
                        <X size={20} />
                    </button>
                )}
                <h2 id="modal-titulo" className="modal-titulo">{titulo}</h2>
                {children}
            </div>
        </div>
    );
}

export default Modal;