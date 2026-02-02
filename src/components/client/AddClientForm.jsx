import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientService } from '../../services/clientService';
import './AddClientForm.css';

const AddClientForm = ({ clientToEdit, onCancel }) => {
    const queryClient = useQueryClient();
    const isEditMode = !!clientToEdit;

    // Mutation unique pour Create OU Update
    const mutation = useMutation({
        mutationFn: (data) => {
            return isEditMode
                ? clientService.update(clientToEdit.id, data)
                : clientService.create(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['clients']);
            onCancel();
        }
    });

    return (
        <div className="form-container">
            <h3>{isEditMode ? "Modifier le client" : "Nouveau Client"}</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                const data = Object.fromEntries(new FormData(e.target));
                mutation.mutate(data);
                if (isEditMode) {
                    data.password = data.password || "";
                }
            }} className="client-form">
                <input className="input-field" name="name" defaultValue={clientToEdit?.name} placeholder="Nom" required />
                <input className="input-field" name="email" defaultValue={clientToEdit?.email} placeholder="Email" required />
                <input className="input-field" name="username" defaultValue={clientToEdit?.username} placeholder="Username" required />
                <input
                    className="input-field"
                    name="password"
                    type="password"
                    placeholder={isEditMode ? "Nouveau mot de passe (laisser vide pour garder l'ancien)" : "Password"}
                    required={!isEditMode}
                />

                <div className="form-actions">
                    <button type="submit" className="btn-add">
                        {isEditMode ? "Mettre à jour" : "Enregistrer"}
                    </button>
                    <button type="button" onClick={onCancel} className="page-btn">Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default AddClientForm;
