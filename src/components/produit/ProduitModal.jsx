import React, { useState, useEffect } from 'react';
import './ProduitModal.css';

const ProduitModal = ({ isOpen, onClose, onSubmit, produit, mode }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prixUnitaire: '',
        stock: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (produit && mode === 'edit') {
            setFormData({
                nom: produit.nom,
                prixUnitaire: produit.prixUnitaire,
                stock: produit.stock,
            });
        } else {
            setFormData({ nom: '', prixUnitaire: '', stock: '' });
        }
        setErrors({});
    }, [produit, mode, isOpen]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nom.trim()) {
            newErrors.nom = 'Le nom du produit est requis';
        }

        if (!formData.prixUnitaire || parseFloat(formData.prixUnitaire) < 0.01) {
            newErrors.prixUnitaire = 'Le prix doit être supérieur à 0.01';
        }

        if (!formData.stock || parseInt(formData.stock) < 1) {
            newErrors.stock = 'Le stock doit être supérieur à 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await onSubmit({
                nom: formData.nom.trim(),
                prixUnitaire: parseFloat(formData.prixUnitaire),
                stock: parseInt(formData.stock),
            });
            onClose();
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{mode === 'edit' ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nom">Nom du produit *</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className={errors.nom ? 'error' : ''}
                            placeholder="Ex: Ordinateur portable"
                        />
                        {errors.nom && <span className="error-text">{errors.nom}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="prixUnitaire">Prix unitaire (MAD) *</label>
                        <input
                            type="number"
                            id="prixUnitaire"
                            name="prixUnitaire"
                            value={formData.prixUnitaire}
                            onChange={handleChange}
                            step="0.01"
                            min="0.01"
                            className={errors.prixUnitaire ? 'error' : ''}
                            placeholder="Ex: 1500.00"
                        />
                        {errors.prixUnitaire && <span className="error-text">{errors.prixUnitaire}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stock *</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="1"
                            className={errors.stock ? 'error' : ''}
                            placeholder="Ex: 50"
                        />
                        {errors.stock && <span className="error-text">{errors.stock}</span>}
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Annuler
                        </button>
                        <button type="submit" disabled={loading} className="btn-submit">
                            {loading ? 'Chargement...' : mode === 'edit' ? 'Modifier' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProduitModal;