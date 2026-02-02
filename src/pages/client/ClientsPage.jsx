import React from 'react';
import AddClientForm from '../../components/client/AddClientForm';
import ClientList from '../../components/client/ClientList';
import './ClientsPage.css';

const ClientsPage = () => {
    return (
        <div className="clients-page">

            <div className="page-header">
                <div className="header-content">
                    <h1>Gestion des Clients</h1>
                    <p className="subtitle">
                        Ajoutez et gérez facilement vos clients
                    </p>
                </div>

            </div>

            <section className="form-section">
                <h2>Ajouter un Client</h2>
                <AddClientForm />
            </section>

            <section className="list-section">
                <h2>Liste des Clients existants</h2>
                <ClientList />
            </section>

        </div>
    );
};

export default ClientsPage;
