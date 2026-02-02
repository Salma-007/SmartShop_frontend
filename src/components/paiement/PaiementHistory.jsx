import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paiementService } from '../../services/paiementService';
import './PaiementList.css';

const PaiementHistory = ({ commandeId }) => {
    const queryClient = useQueryClient();
    const { data: paiements, isLoading } = useQuery({
        queryKey: ['paiements', commandeId],
        queryFn: () => paiementService.getByCommande(commandeId)
    });

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) => paiementService.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries(['paiements', commandeId]);
            queryClient.invalidateQueries(['commandes']);
        }
    });

    if (isLoading) return <p>Chargement des paiements...</p>;

    return (
        <div className="paiement-history">
            <h4>Historique des règlements</h4>
            <table className="mini-table">
                <thead>
                <tr>
                    <th>N°</th>
                    <th>Méthode</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {paiements?.data.map(p => (
                    <tr key={p.id}>
                        <td>{p.paymentNumber}</td>
                        <td>{p.paymentMethod}</td>
                        <td>{p.amount} DH</td>
                        <td>
                                <span className={`status-badge status-${p.status}`}>
                                    {p.status}
                                </span>
                        </td>
                        <td>
                            {p.status === 'EN_ATTENTE' && p.paymentMethod === 'CHEQUE' && (
                                <div className="action-btns-mini">
                                    <button onClick={() => statusMutation.mutate({id: p.id, status: 'ENCAISSÉ'})} className="btn-check">✔️</button>
                                    <button onClick={() => statusMutation.mutate({id: p.id, status: 'REJETÉ'})} className="btn-x">❌</button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaiementHistory;