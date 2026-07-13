
export const createCustomerMessage = (order) => {
    const items = order.products
        .map(
            (item) =>
                `• ${item.perfumeName} ${item.ml}ml`
        )
        .join("\n");

    return `🌹 Al-Ozhan Perfumes

Hello ${order.customerName || "Customer"},

Thank you for shopping with us.

Your order has been confirmed.

━━━━━━━━━━━━━━━━━━


Items

${items}

Amount
₹${order.grandTotal}

Payment
${order.paymentMethod}

━━━━━━━━━━━━━━━━━━

Thank you for choosing
Al-Ozhan Perfumes ❤️`;
};

export const createOwnerMessage = (order) => {
    const shortOrderId = order._id.slice(-6).toUpperCase();
    const items = order.products
        .map(
            (item) =>
                `• ${item.perfumeName} ${item.ml}ml`
        )
        .join("\n");

    return `🛒 NEW ORDER RECEIVED

━━━━━━━━━━━━━━━━━━

Customer
${order.customerName || "Walk-in Customer"}

Phone
${order.phone || "Not Provided"}

Items

${items}

Total
₹${order.grandTotal}

Payment
${order.paymentMethod}

Order ID
AO-${shortOrderId}

━━━━━━━━━━━━━━━━━━

Created from
Al-Ozhan Billing System`;
};