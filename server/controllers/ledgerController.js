const {
    getSupplierLedger
} = require("../models/ledgerModel");

// Supplier Ledger
const supplierLedger = (req, res) => {

    const supplierId = req.params.supplierId;

    getSupplierLedger(
        supplierId,
        req.user.company_id,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            let balance = 0;

            const ledger = result.map((row) => {

                balance += Number(row.debit);
                balance -= Number(row.credit);

                return {
                    date: row.date,
                    reference_no: row.reference_no,
                    type: row.type,
                    debit: Number(row.debit),
                    credit: Number(row.credit),
                    balance
                };

            });

            return res.status(200).json({
                success: true,
                supplierId,
                outstanding: balance,
                count: ledger.length,
                ledger
            });

        }
    );

};

module.exports = {
    supplierLedger
};