import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        perfumeName: {
            type: String,
            required: true,
        },

        ml: {
            type: Number,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        customerName: {
    type: String,
    default: "",
    trim: true,
},

phone: {
    type: String,
    default: "",
    trim: true,
},

        products: {
            type: [productSchema],
            required: true,
        },

        grandTotal: {
            type: Number,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "UPI"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Order", orderSchema);