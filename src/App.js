import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import ProduitsPage from './pages/produit/ProduitsPage';
import ClientsPage from './pages/client/ClientsPage';

import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';

import MainLayout from './components/layout/MainLayout';
import PromoCodePage from "./pages/promo/PromoCodePage";
import CommandePage from "./pages/commande/CommandePage";
import PaiementPage from "./pages/paiement/PaiementPage";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>

                    {/* Pages sans navbar */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Pages avec navbar */}
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/clients" element={<ClientsPage />} />
                        <Route path="/produits" element={<ProduitsPage />} />
                        <Route path="/promo-codes" element={<PromoCodePage />} />
                        <Route path="/commandes" element={<CommandePage />} />
                        <Route path="/paiements" element={<PaiementPage />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
