import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { promoCodeService } from '../../services/promoCodeService';
import './PromoList.css';

const PromoCodeList = ({ onEdit }) => {
    const [page, setPage] = useState(0);
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['promo-codes', page],
        queryFn: () => promoCodeService.getAll(page, 10),
        keepPreviousData: true
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => promoCodeService.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['promo-codes'])
    });

    if (isLoading) return <div className="spinner"></div>;

    const promos = data?.data?.content || [];

    return (
        <div className="table-container">
            <table className="clients-table">
                <thead>
                <tr>
                    <th>Référence</th>
                    <th>Réduction</th>
                    <th>Expiration</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {promos.map(promo => {
                    const isExpired = new Date(promo.dateExpiration) < new Date();
                    return (
                        <tr key={promo.id}>
                            <td className="font-bold">{promo.reference}</td>
                            <td>
                                <span className="price">{promo.discountPourcentage}%</span>
                            </td>
                            <td>{new Date(promo.dateExpiration).toLocaleDateString()}</td>
                            <td>
                                    <span className={`loyalty-badge ${isExpired ? 'loyalty-BASIC' : 'loyalty-PLATINUM'}`}>
                                        {isExpired ? 'Expiré' : 'Actif'}
                                    </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button className="btn-icon btn-edit" onClick={() => onEdit(promo)}>✏️</button>
                                    <button className="btn-icon btn-delete" onClick={() => deleteMutation.mutate(promo.id)}>🗑️</button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {/* Pagination identique au composant Client */}
        </div>
    );
};

export default PromoCodeList;