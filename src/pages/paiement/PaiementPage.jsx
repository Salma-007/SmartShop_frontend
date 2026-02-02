import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { paiementService } from '../../services/paiementService';
import AddPaiementForm from '../../components/paiement/AddPaiementForm';
import PaiementHistory from '../../components/paiement/PaiementHistory';
import { useLocation } from 'react-router-dom';
import './PaiementPage.css';

const PaiementPage = () => {
    const reactLocation = useLocation();

    const [selectedOrder, setSelectedOrder] = useState(reactLocation.state?.commande || null);

    useEffect(() => {
        if (reactLocation.state?.commande) {
            setSelectedOrder(reactLocation.state.commande);
        }
    }, [reactLocation.state]);

    return (
        <div className="paiement-page-container">
            <header className="page-header">
                <div className="header-content">
                    <h1>Gestion des Paiements</h1>
                    <p className="subtitle">Suivi des règlements, chèques et virements bancaires</p>
                </div>
            </header>

            <div className="paiement-grid">
                {/* Section Gauche : Formulaire de nouveau paiement */}
                <div className="paiement-section">
                    {selectedOrder ? (
                        <AddPaiementForm
                            commande={selectedOrder}
                            onCancel={() => setSelectedOrder(null)}
                        />
                    ) : (
                        <div className="empty-state-card">
                            <div className="icon-box">💳</div>
                            <p>Sélectionnez une commande depuis la page "Commandes" pour enregistrer un nouveau règlement.</p>
                        </div>
                    )}
                </div>

                {/* Section Droite : Historique Global ou filtré */}
                <div className="paiement-section">
                    <div className="history-card">
                        <h3>Dernières Transactions</h3>
                        {selectedOrder ? (
                            <PaiementHistory commandeId={selectedOrder.id} />
                        ) : (
                            <p className="info-text">Veuillez sélectionner une commande pour voir son historique de paiement.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaiementPage;