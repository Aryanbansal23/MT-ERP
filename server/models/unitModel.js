const db = require("../config/db");

// Create Unit
const createUnit = (unitData, callback) => {

    const {
        company_id,
        unit_name,
        short_name,
        description,
        created_by
    } = unitData;

    const sql = `
        INSERT INTO units (
            company_id,
            unit_name,
            short_name,
            description,
            created_by
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        company_id,
        unit_name,
        short_name,
        description,
        created_by
    ], callback);

};

// Get All Units
const getUnits = (userId, callback) => {

    const sql = `
        SELECT *
        FROM units
        WHERE created_by = ?
        ORDER BY id DESC
    `;

    db.query(sql, [userId], callback);

};

// Get Unit By ID
const getUnitById = (unitId, userId, callback) => {

    const sql = `
        SELECT *
        FROM units
        WHERE id = ? AND created_by = ?
    `;

    db.query(sql, [unitId, userId], callback);

};

// Update Unit
const updateUnit = (unitId, userId, unitData, callback) => {

    const {
        company_id,
        unit_name,
        short_name,
        description
    } = unitData;

    const sql = `
        UPDATE units
        SET
            company_id = ?,
            unit_name = ?,
            short_name = ?,
            description = ?
        WHERE id = ? AND created_by = ?
    `;

    db.query(sql, [
        company_id,
        unit_name,
        short_name,
        description,
        unitId,
        userId
    ], callback);

};

// Delete Unit
const deleteUnit = (unitId, userId, callback) => {

    const sql = `
        DELETE FROM units
        WHERE id = ? AND created_by = ?
    `;

    db.query(sql, [unitId, userId], callback);

};

module.exports = {
    createUnit,
    getUnits,
    getUnitById,
    updateUnit,
    deleteUnit
};