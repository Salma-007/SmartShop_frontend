import React, { useState } from 'react';
import CommandeList from '../../components/commande/CommandeList';
import AddCommandeForm from '../../components/commande/AddCommandeForm';
import './CommandePage.css';

const CommandePage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="produits-page">
            <header className="page-header">
                <div className="header-content">
                    <h1>Commandes</h1>
                    <p className="subtitle">Suivi des ventes et validation des paiements</p>
                </div>
                <button className="btn-add" onClick={() => setIsFormOpen(!isFormOpen)}>
                    {isFormOpen ? '✕ Fermer' : '+ Nouvelle Commande'}
                </button>
            </header>

            {isFormOpen && <AddCommandeForm onCancel={() => setIsFormOpen(false)} />}
            <CommandeList />
        </div>
    );
};

export default CommandePage;