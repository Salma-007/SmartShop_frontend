import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-overlay" onClick={onClose}>
            <div className="confirm-content" onClick={(e) => e.stopPropagation()}>
                <div className="confirm-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h3>{title}</h3>
                <p>{message}</p>

                <div className="confirm-actions">
                    <button onClick={onClose} className="btn-cancel-confirm" disabled={loading}>
                        Annuler
                    </button>
                    <button onClick={onConfirm} className="btn-delete" disabled={loading}>
                        {loading ? 'Suppression...' : 'Supprimer'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;