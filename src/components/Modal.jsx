import 'bootstrap/dist/css/bootstrap.min.css';
import { createPortal } from 'react-dom';
const Modal = ({isOpen, onClose, onConfirm, content}) => {

    if(!isOpen) return null;

    return (
        
        <div className="modal-overlay d-flex justify-content-center align-items-center">
            <div className="modal-content bg-white w-50">
                <div className="modal-header mb-4">
                    <h1 className="modal-title fs-5">{content.title}</h1>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    <p><span className='fw-bold'>Status: </span> {content.status}</p>
                    <p><span className='fw-bold'>Date created: </span> {new Date(content.createdAt).toLocaleDateString()}</p>
                </div>
                <p>Sei sicuro di voler eliminare la Task?</p>
                <div className="mt-1 d-flex justify-content-center gap-2 modal-footer">
                    
                    <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
                    <button className="btn btn-primary" onClick={onConfirm}>Conferma</button>
                </div>
            </div>
        </div>
        
    )
}

export default Modal