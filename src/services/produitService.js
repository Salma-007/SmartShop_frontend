import api from './api';

const produitService = {
    getAllProduits: async (page = 0, size = 10) => {
        try {
            const response = await api.get('/produits', {
                params: { page, size, sort: 'id,desc' }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Erreur lors de la récupération des produits';
        }
    },

    getProduitById: async (id) => {
        try {
            const response = await api.get(`/produits/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Produit non trouvé';
        }
    },

    createProduit: async (produitData) => {
        try {
            const response = await api.post('/produits', produitData);
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Erreur lors de la création du produit';
        }
    },

    updateProduit: async (id, produitData) => {
        try {
            const response = await api.put(`/produits/${id}`, produitData);
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Erreur lors de la mise à jour du produit';
        }
    },

    deleteProduit: async (id) => {
        try {
            await api.delete(`/produits/${id}`);
        } catch (error) {
            throw error.response?.data || 'Erreur lors de la suppression du produit';
        }
    },
};

export default produitService;