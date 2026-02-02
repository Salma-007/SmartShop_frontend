import React, { useState } from 'react';
import ClientList from '../../components/client/ClientList';
import AddClientForm from '../../components/client/AddClientForm';
import './ClientsPage.css';

const ClientsPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const handleEdit = (client) => {
        setSelectedClient(client);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedClient(null);
    };

    return (
        <div className="clients-page">
            <header className="page-header">
                <div className="header-content">
                    <h1>Clients</h1>
                    <p className="subtitle">Gestion de la base de données clients</p>
                </div>
                <button className="btn-add" onClick={() => setIsFormOpen(true)}>
                    + Nouveau Client
                </button>
            </header>

            {isFormOpen && (
                <AddClientForm
                    clientToEdit={selectedClient}
                    onCancel={handleCloseForm}
                />
            )}

            <ClientList onEdit={handleEdit} />
        </div>
    );
};

export default ClientsPage;