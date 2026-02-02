import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { commandeService } from '../../services/commandeService';
import { clientService } from '../../services/clientService';
import produitService from '../../services/produitService';
import './AddCommandeForm.css';

const AddCommandeForm = ({ onCancel }) => {
    const queryClient = useQueryClient();
    const [items, setItems] = useState([{ produitId: '', quantite: 1 }]);

    const { data: clientsData } = useQuery({
        queryKey: ['clients-list'],
        queryFn: () => clientService.getAll(0, 100)
    });

    const { data: produitsData } = useQuery({
        queryKey: ['produits-list'],
        queryFn: () => produitService.getAllProduits(0, 100)
    });

    const clients = clientsData?.data?.content || [];
    const produits = produitsData?.content || [];

    const mutation = useMutation({
        mutationFn: (data) => commandeService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['commandes']);
            onCancel();
        },
        onError: (err) => alert(err.response?.data?.message || "Erreur lors de la commande")
    });

    const addItem = () => setItems([...items, { produitId: '', quantite: 1 }]);

    const removeItem = (index) => {
        if (items.length > 1) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            clientId: formData.get('clientId'),
            promoCodeReference: formData.get('promoCodeReference'),
            items: items.map((_, index) => ({
                produitId: formData.get(`produitId-${index}`),
                quantite: parseInt(formData.get(`quantite-${index}`))
            }))
        };
        mutation.mutate(data);
    };

    return (
        <div className="form-container">
            <h3 className="form-title">Nouvelle Commande</h3>
            <form onSubmit={handleSubmit} className="commande-form">
                <div className="form-header-grid">
                    <div className="input-group">
                        <label>Client</label>
                        <select className="input-field" name="clientId" required defaultValue="">
                            <option value="" disabled>Sélectionner un client</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Code Promo</label>
                        <input className="input-field" name="promoCodeReference" placeholder="Ex: PROMO-1234" />
                    </div>
                </div>

                <div className="items-section">
                    <h4>Articles du panier</h4>
                    {items.map((item, index) => (
                        <div key={index} className="item-row improved-row">
                            <div className="input-group">
                                <select
                                    className="input-field"
                                    name={`produitId-${index}`}
                                    required
                                    defaultValue=""
                                >
                                    <option value="" disabled>Choisir un produit</option>
                                    {produits.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.nom} ({p.prix_unitaire}€) - Stock: {p.stock}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <input
                                    className="input-field"
                                    name={`quantite-${index}`}
                                    type="number"
                                    min="1"
                                    placeholder="Qté"
                                    required
                                />
                            </div>
                            {items.length > 1 && (
                                <button type="button" className="btn-remove" onClick={() => removeItem(index)}>✕</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addItem} className="btn-secondary">
                        + Ajouter un autre produit
                    </button>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-add" disabled={mutation.isLoading}>
                        {mutation.isLoading ? 'Traitement...' : 'Confirmer la commande'}
                    </button>
                    <button type="button" onClick={onCancel} className="page-btn">Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default AddCommandeForm;