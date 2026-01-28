import React, {useState, useEffect, useCallback} from 'react';
import produitService from '../../services/produitService';
import ProduitModal from '../../components/produit/ProduitModal';
import ConfirmModal from '../../components/produit/ConfirmModal';
import './ProduitsPage.css';

const ProduitsPage = () => {
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const pageSize = 10;

    // Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' ou 'edit'
    const [selectedProduit, setSelectedProduit] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [produitToDelete, setProduitToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const loadProduits = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await produitService.getAllProduits(currentPage, pageSize);
            setProduits(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
        } catch (err) {
            setError('Erreur lors du chargement des produits');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        loadProduits();
    }, [loadProduits]);


    // Ajouter un produit
    const handleAddProduit = async (produitData) => {
        try {
            await produitService.createProduit(produitData);
            showSuccess('Produit ajouté avec succès');
            loadProduits();
        } catch (err) {
            setError('Erreur lors de l\'ajout du produit');
            throw err;
        }
    };

    // Modifier un produit
    const handleUpdateProduit = async (produitData) => {
        try {
            await produitService.updateProduit(selectedProduit.id, produitData);
            showSuccess('Produit modifié avec succès');
            loadProduits();
        } catch (err) {
            setError('Erreur lors de la modification du produit');
            throw err;
        }
    };

    // Supprimer un produit
    const handleDeleteProduit = async () => {
        setDeleteLoading(true);
        try {
            await produitService.deleteProduit(produitToDelete.id);
            showSuccess('Produit supprimé avec succès');
            setIsDeleteModalOpen(false);
            loadProduits();
        } catch (err) {
            setError('Erreur lors de la suppression du produit');
        } finally {
            setDeleteLoading(false);
        }
    };

    // Ouvrir modal d'ajout
    const openAddModal = () => {
        setModalMode('add');
        setSelectedProduit(null);
        setIsModalOpen(true);
    };

    // Ouvrir modal d'édition
    const openEditModal = (produit) => {
        setModalMode('edit');
        setSelectedProduit(produit);
        setIsModalOpen(true);
    };

    // Ouvrir modal de suppression
    const openDeleteModal = (produit) => {
        setProduitToDelete(produit);
        setIsDeleteModalOpen(true);
    };

    // Afficher message de succès
    const showSuccess = (message) => {
        setSuccess(message);
        setTimeout(() => setSuccess(''), 3000);
    };

    // Pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Format du prix
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD'
        }).format(price);
    };

    return (
        <div className="produits-page">
            <div className="page-header">
                <div className="header-content">
                    <h1>Gestion des Produits</h1>
                    <p className="subtitle">
                        {totalElements} produit{totalElements > 1 ? 's' : ''} au total
                    </p>
                </div>
                <button className="btn-add" onClick={openAddModal}>
                    <span className="icon">+</span>
                    Ajouter un produit
                </button>
            </div>

            {/* Messages */}
            {error && (
                <div className="alert alert-error">
                    <span className="alert-icon">⚠️</span>
                    {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success">
                    <span className="alert-icon">✓</span>
                    {success}
                </div>
            )}

            {/* Table */}
            <div className="table-container">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Chargement des produits...</p>
                    </div>
                ) : produits.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📦</div>
                        <h3>Aucun produit</h3>
                        <p>Commencez par ajouter votre premier produit</p>
                        <button className="btn-add-empty" onClick={openAddModal}>
                            Ajouter un produit
                        </button>
                    </div>
                ) : (
                    <>
                        <table className="produits-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prix Unitaire</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {produits.map((produit) => (
                                <tr key={produit.id}>
                                    <td>#{produit.id}</td>
                                    <td>
                                        <div className="product-name">
                                            <div className="product-avatar">
                                                {produit.nom.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{produit.nom}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="price">{formatPrice(produit.prixUnitaire)}</span>
                                    </td>
                                    <td>
                      <span className={`stock-badge ${produit.stock < 10 ? 'low' : ''}`}>
                        {produit.stock} unités
                      </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-icon btn-edit"
                                                onClick={() => openEditModal(produit)}
                                                title="Modifier"
                                            >
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                className="btn-icon btn-delete"
                                                onClick={() => openDeleteModal(produit)}
                                                title="Supprimer"
                                            >
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="page-btn"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 0}
                                >
                                    ← Précédent
                                </button>

                                <div className="page-numbers">
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            className={`page-number ${currentPage === index ? 'active' : ''}`}
                                            onClick={() => handlePageChange(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className="page-btn"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    Suivant →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modals */}
            <ProduitModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={modalMode === 'add' ? handleAddProduit : handleUpdateProduit}
                produit={selectedProduit}
                mode={modalMode}
            />

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteProduit}
                title="Supprimer le produit ?"
                message={`Êtes-vous sûr de vouloir supprimer "${produitToDelete?.nom}" ? Cette action est irréversible.`}
                loading={deleteLoading}
            />
        </div>
    );
};

export default ProduitsPage;