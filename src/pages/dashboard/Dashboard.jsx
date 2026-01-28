import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();



    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>SmartShop - Tableau de bord</h1>
                <div className="user-info">
                    <span>Bienvenue, user</span>
                    <span className="role-badge">admin</span>

                </div>
            </header>

            <div className="dashboard-content">
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Clients Actifs</h3>
                        <p className="stat-number">650</p>
                    </div>
                    <div className="stat-card">
                        <h3>Factures du mois</h3>
                        <p className="stat-number">0</p>
                    </div>
                    <div className="stat-card">
                        <h3>Paiements en attente</h3>
                        <p className="stat-number">0</p>
                    </div>
                </div>

                <p className="info-text">
                    Prochaines étapes : Ajouter la gestion des clients, factures et paiements
                </p>
            </div>
        </div>
    );
};

export default Dashboard;