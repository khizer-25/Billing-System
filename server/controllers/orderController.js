import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    try {
        const {
            customerName,
            phone,
            products,
            paymentMethod,
        } = req.body;

        // Calculate grand total on the server
        const grandTotal = products.reduce(
            (total, product) => total + Number(product.price || 0),
            0
        );

        const order = await Order.create({
            customerName: customerName || "",
            phone: phone || "",
            products,
            grandTotal,
            paymentMethod,
        });

        res.status(201).json({
            success: true,
            message: "Order Created Successfully",
            order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};