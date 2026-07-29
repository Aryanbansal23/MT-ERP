import api from "./api";

export const getCustomers = () => api.get("/customer");

export const getCustomerById = (id) =>
    api.get(`/customer/${id}`);

export const addCustomer = (data) =>
    api.post("/customer/create", data);

export const updateCustomer = (id, data) =>
    api.put(`/customer/${id}`, data);

export const deleteCustomer = (id) =>
    api.delete(`/customer/${id}`);