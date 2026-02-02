import api from './api';

const PAIEMENT_PATH = '/paiements';

export const paiementService = {
    create: (data) => api.post(PAIEMENT_PATH, data),

    getById: (id) => api.get(`${PAIEMENT_PATH}/${id}`),

    getByCommande: (commandeId) => api.get(`${PAIEMENT_PATH}/commande/${commandeId}`),

    updateStatus: (id, status) => api.put(`${PAIEMENT_PATH}/${id}/status?status=${status}`)
};