import React, { useState } from 'react';
import PromoCodeList from '../../components/promoCode/PromoCodeList';
import PromoCodeForm from '../../components/promoCode/PromoCodeForm';
import './PromoCodePage.css';
const PromoCodePage = () => {

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [selectedPromo, setSelectedPromo] = useState(null);

    const handleEdit = (promo) => {
        setSelectedPromo(promo);
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedPromo(null);
    };

    return (
        <div className="produits-page">
            <header className="page-header">
                <div className="header-content">
                    <h1>Codes Promo</h1>
                    <p className="subtitle">Gérez vos réductions et offres promotionnelles</p>
                </div>

                <button
                    className="btn-add"
                    onClick={() => {
                        if(isFormOpen && !selectedPromo) handleCloseForm();
                        else { setSelectedPromo(null); setIsFormOpen(true); }
                    }}
                >
                    <span className="icon">{isFormOpen ? '✕' : '+'}</span>
                    {isFormOpen ? 'Fermer' : 'Nouveau Code'}
                </button>
            </header>

            {isFormOpen && (
                <div style={{ marginBottom: '32px' }}>
                    <PromoCodeForm
                        promoToEdit={selectedPromo}
                        onCancel={handleCloseForm}
                    />
                </div>
            )}

            <PromoCodeList onEdit={handleEdit} />
        </div>
    );
};

export default PromoCodePage;