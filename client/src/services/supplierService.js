import api from "./api";

export const getSuppliers = () =>
    api.get("/supplier");

export const getSupplierById = (id) =>
    api.get(`/supplier/${id}`);

export const addSupplier = (data) =>
    api.post("/supplier/create", data);

export const updateSupplier = (id, data) =>
    api.put(`/supplier/${id}`, data);

export const deleteSupplier = (id) =>
    api.delete(`/supplier/${id}`);