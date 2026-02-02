import api from './api';;

const CLIENT_PATH = '/clients';

export const clientService = {

    getAll: (page = 0, size = 10) =>
        api.get(`${CLIENT_PATH}?page=${page}&size=${size}`),

    getById: (id) => api.get(`${CLIENT_PATH}/${id}`),

    create: (clientData) => api.post(CLIENT_PATH, clientData),

    update: (id, clientData) => api.put(`${CLIENT_PATH}/${id}`, clientData),

    delete: (id) => api.delete(`${CLIENT_PATH}/${id}`),
};