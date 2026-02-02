import api from './api';

const COMMANDE_PATH = '/commandes';

export const commandeService = {
    getAll: (page = 0, size = 10) =>
        api.get(`${COMMANDE_PATH}?page=${page}&size=${size}`),

    getById: (id) => api.get(`${COMMANDE_PATH}/${id}`),

    create: (data) => api.post(COMMANDE_PATH, data),

    validate: (id) => api.put(`${COMMANDE_PATH}/${id}/validate`),

    cancel: (id) => api.put(`${COMMANDE_PATH}/${id}/cancel`),

    delete: (id) => api.delete(`${COMMANDE_PATH}/${id}`),

    getByStatus: (status, page = 0) =>
        api.get(`${COMMANDE_PATH}/status?status=${status}&page=${page}`)
};