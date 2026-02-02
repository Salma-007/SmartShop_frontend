import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paiementService } from '../../services/paiementService';
import './PaiementForm.css';

const AddPaiementForm = ({ commande, onCancel }) => {
    const queryClient = useQueryClient();
    const [method, setMethod] = useState('ESPECES');

    const mutation = useMutation({
        mutationFn: (data) => paiementService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['commandes']);
            queryClient.invalidateQueries(['paiements', commande.id]);
            onCancel();
        },
        onError: (err) => alert(err.response?.data?.message || "Erreur lors du paiement")
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.commandeId = commande.id;
        data.amount = parseFloat(data.amount);
        mutation.mutate(data);
    };

    return (
        <div className="form-container payment-mode">
            <h3>Enregistrer un règlement pour #ORD-{commande.id}</h3>
            <p className="remaining-balance">Reste à payer : <strong>{commande.montantRestant} DH</strong></p>

            <form onSubmit={handleSubmit} className="paiement-form">
                <div className="input-group">
                    <label>Méthode</label>
                    <select className="input-field" name="paymentMethod"
                            onChange={(e) => setMethod(e.target.value)} required>
                        <option value="ESPECES">Espèces</option>
                        <option value="CHEQUE">Chèque</option>
                        <option value="VIREMENT">Virement</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Montant (DH)</label>
                    <input className="input-field" name="amount" type="number" step="0.01"
                           max={commande.montantRestant} required />
                </div>

                <div className="input-group">
                    <label>Référence</label>
                    <input className="input-field" name="reference"
                           placeholder={method === 'ESPECES' ? 'REÇU-000' : method === 'CHEQUE' ? 'CHQ-0000000' : 'VIR-AAAA-MM-JJ-XXXX'} required />
                </div>

                {(method === 'CHEQUE' || method === 'VIREMENT') && (
                    <div className="input-group">
                        <label>Banque</label>
                        <input className="input-field" name="bank" required />
                    </div>
                )}

                {method === 'CHEQUE' && (
                    <div className="input-group">
                        <label>Date d'échéance</label>
                        <input className="input-field" name="dateEcheance" type="date" required />
                    </div>
                )}

                <div className="form-actions full-width">
                    <button type="submit" className="btn-add btn-pay">Valider le Paiement</button>
                    <button type="button" onClick={onCancel} className="page-btn">Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default AddPaiementForm;