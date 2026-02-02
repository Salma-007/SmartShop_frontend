import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { clientService } from '../../services/clientService';
import './ClientList.css';

const ClientList = () => {
    const [page, setPage] = useState(0);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['clients', page],
        queryFn: () => clientService.getAll(page, 10),
        keepPreviousData: true
    });

    if (isLoading) return <div>Chargement...</div>;
    if (isError) return <div>Erreur: {error.message}</div>;

    const clients = data.data.content;

    return (
        <div className="table-container">

            <table className="clients-table">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Fidélité</th>
                    <th>Total Commandes</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>
                            <div className="client-avatar">
                                {client.name.charAt(0).toUpperCase()}
                            </div>
                            {client.name}
                        </td>

                        <td>{client.email}</td>

                        <td>
                                <span
                                    className={`loyalty-badge loyalty-${client.niveau_fidelite}`}
                                >
                                    {client.niveau_fidelite}
                                </span>
                        </td>

                        <td>{client.totalOrders}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    className="page-btn"
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                >
                    Précédent
                </button>

                <button
                    className="page-btn"
                    onClick={() => setPage(p => p + 1)}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default ClientList;
