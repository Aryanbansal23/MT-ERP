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

    db.query(
        sql,
        [
            company_id,
            unit_name,
            short_name,
            description,
            created_by
        ],
        callback
    );

};

// Get All Units
const getUnits = (companyId, userId, callback) => {

    const sql = `
        SELECT *
        FROM units
        WHERE company_id = ?
        AND created_by = ?
        ORDER BY id DESC
    `;

    db.query(
        sql,
        [
            companyId,
            userId
        ],
        callback
    );

};

// Get Unit By ID
const getUnitById = (
    unitId,
    companyId,
    userId,
    callback
) => {

    const sql = `
        SELECT *
        FROM units
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            unitId,
            companyId,
            userId
        ],
        callback
    );

};

// Update Unit
const updateUnit = (
    unitId,
    companyId,
    userId,
    unitData,
    callback
) => {

    const {
        unit_name,
        short_name,
        description
    } = unitData;

    const sql = `
        UPDATE units
        SET
            unit_name = ?,
            short_name = ?,
            description = ?
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            unit_name,
            short_name,
            description,
            unitId,
            companyId,
            userId
        ],
        callback
    );

};

// Delete Unit
const deleteUnit = (
    unitId,
    companyId,
    userId,
    callback
) => {

    const sql = `
        DELETE FROM units
        WHERE id = ?
        AND company_id = ?
        AND created_by = ?
    `;

    db.query(
        sql,
        [
            unitId,
            companyId,
            userId
        ],
        callback
    );

};

module.exports = {
    createUnit,
    getUnits,
    getUnitById,
    updateUnit,
    deleteUnit
};