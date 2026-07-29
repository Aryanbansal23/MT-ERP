const {
    getDashboardSummary,
    getMonthlySales,
    getMonthlyPurchases,
    getRecentSales,
    getRecentPurchases,
    getLowStockProducts
} = require("../models/dashboardModel");

// Complete Dashboard
const dashboard = (req, res) => {

    const companyId = req.user.company_id;
    const userId = req.user.id;

    getDashboardSummary(companyId, userId, (err, summary) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        getMonthlySales(companyId, userId, (err, monthlySales) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            getMonthlyPurchases(companyId, userId, (err, monthlyPurchases) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                getRecentSales(companyId, userId, (err, recentSales) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    getRecentPurchases(companyId, userId, (err, recentPurchases) => {

                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }

                        getLowStockProducts(companyId, userId, (err, lowStockProducts) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }

                            return res.status(200).json({
                                success: true,
                                summary: summary[0],
                                monthlySales,
                                monthlyPurchases,
                                recentSales,
                                recentPurchases,
                                lowStockProducts
                            });

                        });

                    });

                });

            });

        });

    });

};

module.exports = {
    dashboard
};