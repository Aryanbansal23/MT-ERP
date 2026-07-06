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

    const userId = req.user.id;

    getDashboardSummary(userId, (err, summary) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        getMonthlySales(userId, (err, monthlySales) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            getMonthlyPurchases(userId, (err, monthlyPurchases) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                getRecentSales(userId, (err, recentSales) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    getRecentPurchases(userId, (err, recentPurchases) => {

                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }

                        getLowStockProducts(userId, (err, lowStockProducts) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }

                            res.status(200).json({
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