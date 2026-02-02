import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientService } from '../../services/clientService';
import './ClientList.css';

const ClientList = ({ onEdit }) => { // onEdit est une fonction passée par le parent
    const [page, setPage] = useState(0);
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['clients', page],
        queryFn: () => clientService.getAll(page, 10),
        keepPreviousData: true
    });

    // Mutation pour la suppression
    const deleteMutation = useMutation({
        mutationFn: (id) => clientService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['clients']);
            alert("Client supprimé avec succès");
        },
        onError: (err) => {
            // Affiche le message d'erreur de ton backend (ex: "Client avec commandes ne peut être supprimé")
            alert(err.response?.data || "Erreur lors de la suppression");
        }
    });

    if (isLoading) return <div className="loading-state"><div className="spinner"></div></div>;
    if (isError) return <div className="alert alert-error">{error.message}</div>;

    const clients = data.data.content;

    return (
        <div className="table-container">
            <table className="clients-table">
                <thead>
                <tr>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Fidélité</th>
                    <th>Commandes</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <div className="client-avatar">{client.name.charAt(0).toUpperCase()}</div>
                                {client.name}
                            </div>
                        </td>
                        <td>{client.email}</td>
                        <td>
                                <span className={`loyalty-badge loyalty-${client.niveau_fidelite}`}>
                                    {client.niveau_fidelite}
                                </span>
                        </td>
                        <td>{client.totalOrders}</td>
                        <td>
                            <div className="action-buttons">
                                {/* Bouton Update */}
                                <button className="btn-icon btn-edit" onClick={() => onEdit(client)}>
                                    ✏️
                                </button>
                                {/* Bouton Delete */}
                                <button
                                    className="btn-icon btn-delete"
                                    onClick={() => { if(window.confirm("Supprimer ce client ?")) deleteMutation.mutate(client.id) }}
                                >
                                    🗑️
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* ... pagination ... */}
        </div>
    );
};

export default ClientList;