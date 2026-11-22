import { TriangleAlert } from 'lucide-react';
import Modal from './Modal.jsx';
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
    return (
        <Modal aberto={aberto} titulo={titulo} onFechar={onCancelar}>
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
        </Modal>
    );
}

export default ModalConfirmacao;