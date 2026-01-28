import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../src/pages/login/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import ProduitsPage from '../src/pages/produit/ProduitsPage';

function App() {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route
                        path="/dashboard"
                        element={
                                <Dashboard />
                        }
                    />

                    <Route
                        path="/produits"
                        element={
                                <ProduitsPage />
                        }
                    />

                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
        </BrowserRouter>
    );
}

export default App;