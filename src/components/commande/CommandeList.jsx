import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { commandeService } from '../../services/commandeService';
import './CommandeList.css';

const CommandeList = () => {
    const [page, setPage] = useState(0);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['commandes', page],
        queryFn: () => commandeService.getAll(page, 10),
    });

    const validateMutation = useMutation({
        mutationFn: (id) => commandeService.validate(id),
        onSuccess: () => queryClient.invalidateQueries(['commandes']),
        onError: (err) => alert(err.response?.data?.message || "Erreur de validation")
    });

    const cancelMutation = useMutation({
        mutationFn: (id) => commandeService.cancel(id),
        onSuccess: () => queryClient.invalidateQueries(['commandes'])
    });

    if (isLoading) return <div className="spinner"></div>;

    const commandes = data?.data?.content || [];

    return (
        <div className="table-container">
            <table className="clients-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Total TTC</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {commandes.map(cmd => (
                    <tr key={cmd.id}>
                        <td>#ORD-{cmd.id}</td>
                        <td>{cmd.client?.name}</td>
                        <td>{new Date(cmd.date).toLocaleDateString()}</td>
                        <td className="price">{cmd.totalTTC} €</td>
                        <td>
                                <span className={`status-badge status-${cmd.status}`}>
                                    {cmd.status}
                                </span>
                        </td>
                        <td>
                            <div className="action-buttons">
                                {cmd.status === 'PENDING' && (
                                    <>
                                        <button className="btn-icon btn-edit" title="Valider"
                                                onClick={() => validateMutation.mutate(cmd.id)}>✅</button>
                                        <button className="btn-icon btn-delete" title="Annuler"
                                                onClick={() => cancelMutation.mutate(cmd.id)}>✖️</button>
                                    </>
                                )}
                                <button
                                    className="btn-icon"
                                    title="Effectuer un paiement"
                                    onClick={() => navigate('/paiements', { state: { commande: cmd } })}
                                >
                                    💳
                                </button>
                                <button className="btn-icon btn-view">👁️</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommandeList;