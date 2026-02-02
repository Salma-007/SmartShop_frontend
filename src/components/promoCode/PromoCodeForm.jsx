import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { promoCodeService } from '../../services/promoCodeService';
import './PromoForm.css';

const PromoCodeForm = ({ promoToEdit, onCancel }) => {
    const queryClient = useQueryClient();
    const isEditMode = !!promoToEdit;

    const mutation = useMutation({
        mutationFn: (data) => isEditMode
            ? promoCodeService.update(promoToEdit.id, data)
            : promoCodeService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['promo-codes']);
            onCancel();
        },
        onError: (err) => {
            const msg = err.response?.data?.message || "Erreur de validation. Vérifiez le format (PROMO-XXXX)";
            alert(msg);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        // Conversion du pourcentage en nombre pour le backend
        data.discountPourcentage = parseFloat(data.discountPourcentage);
        mutation.mutate(data);
    };

    return (
        <div className="form-container">
            <h3 className="form-title">{isEditMode ? "Modifier Code Promo" : "Nouveau Code Promo"}</h3>
            <form onSubmit={handleSubmit} className="promo-form">
                <div className="input-group">
                    <label>Référence</label>
                    <input
                        className="input-field"
                        name="reference"
                        defaultValue={promoToEdit?.reference}
                        placeholder="Ex: PROMO-2024"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Réduction (%)</label>
                    <input
                        className="input-field"
                        name="discountPourcentage"
                        type="number"
                        step="0.01"
                        defaultValue={promoToEdit?.discountPourcentage}
                        placeholder="Ex: 15.5"
                        required
                    />
                </div>
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <label>Date d'expiration</label>
                    <input
                        className="input-field"
                        name="dateExpiration"
                        type="date"
                        defaultValue={promoToEdit?.dateExpiration}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-add" disabled={mutation.isLoading}>
                        {isEditMode ? "Mettre à jour" : "Créer le code"}
                    </button>
                    <button type="button" onClick={onCancel} className="page-btn">Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default PromoCodeForm;