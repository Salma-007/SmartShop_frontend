import api from './api';

const PROMO_PATH = '/promo-codes';

export const promoCodeService = {
    getAll: (page = 0, size = 10) =>
        api.get(`${PROMO_PATH}?page=${page}&size=${size}`),

    getById: (id) => api.get(`${PROMO_PATH}/${id}`),

    create: (data) => api.post(PROMO_PATH, data),

    update: (id, data) => api.put(`${PROMO_PATH}/${id}`, data),

    delete: (id) => api.delete(`${PROMO_PATH}/${id}`),
};