import { getConnection } from "./../config/database";

// @desc    GET all transactions
// @route   GET /api/v1/transactions
// @access  Public
const getTransactions = async (req, res) => {
    try {
        const connection = await getConnection();
        const transactions = await connection.query(
            "SELECT id, title, amount, created_at, type FROM transactions"
        );

        return res.status(200).json({
            sucess: true,
            count: transactions.length,
            data: transactions,
        });
    } catch (err) {
        return res.status(500).json({
            sucess: false,
            error: err,
        });
    }
};

// @desc    GET transaction
// @route   GET /api/v1/transaction/:id
// @access  Public
const getTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const transaction = await connection.query(
            "SELECT id, title, amount, created_at, type FROM transactions WHERE id = ?",
            id
        );

        return res.status(200).json({
            sucess: true,
            data: transaction,
        });
    } catch (err) {
        return res.status(500).json({
            sucess: false,
            error: "Server error",
        });
    }
};

// @desc    Add transactions
// @route   POST /api/v1/transactions
// @access  Public
const addTransaction = async (req, res) => {
    try {
        const { title, amount, date: created_at, type, id } = req.body;

        const newTransaction = { title, amount, created_at, type, id };

        const connection = await getConnection();
        await connection.query(
            "INSERT INTO transactions SET ?",
            newTransaction
        );

        return res.status(201).json({
            success: true,
            data: newTransaction,
        });
    } catch (err) {
        console.log(err);
    }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();

        const transaction = await connection.query(
            "DELETE FROM transactions WHERE id = ?",
            id
        );

        if (!transaction.affectedRows) {
            return res.status(404).json({
                success: false,
                error: "No transaction found",
            });
        }

        return res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            error: "Server Error",
        });
    }
};

// @desc    Update transaction
// @route   PUT /api/v1/transactions/:id
// @access  Public
const updateTransaction = async (req, res) => {
    try {
        const params = req.params;
        const { title, amount, date: created_at, type, id } = req.body;

        const updatedTransactions = { id, title, amount, created_at, type };

        const connection = await getConnection();
        await connection.query("UPDATE transactions SET ? WHERE id = ?", [
            updatedTransactions,
            id,
        ]);

        return res.status(201).json({
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            sucess: false,
            error: "Server Error",
        });
    }
};

export const methods = {
    getTransactions,
    addTransaction,
    getTransaction,
    deleteTransaction,
    updateTransaction,
};
