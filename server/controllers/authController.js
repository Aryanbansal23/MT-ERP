const bcrypt = require("bcrypt");
const { createUser, findUserByEmail } = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// Register (Only Logged-in Admin Can Create Users)
const register = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        const company_id = req.user.company_id;

        if (!full_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        findUserByEmail(email, async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            createUser(
                {
                    company_id,
                    full_name,
                    email,
                    password: hashedPassword,
                    role: role || "staff"
                },
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    return res.status(201).json({
                        success: true,
                        message: "User Registered Successfully"
                    });

                }
            );

        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Login
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        findUserByEmail(email, async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Password"
                });
            }

            const token = generateToken(user);

            return res.status(200).json({
                success: true,
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    company_id: user.company_id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role
                }
            });

        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    register,
    login
};