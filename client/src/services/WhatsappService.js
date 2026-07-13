import {
    createCustomerLink,
    createOwnerLink,
} from "../utils/whatsappLinks";

const DEFAULT_SETTINGS = {
    customerAutoOpen: true,
    ownerAutoOpen: true,
    delay: 5000,
    ownerPhone: "919010177592", // Change this
};

export const getWhatsAppSettings = () => {
    const saved = localStorage.getItem("whatsappSettings");

    if (!saved) {
        localStorage.setItem(
            "whatsappSettings",
            JSON.stringify(DEFAULT_SETTINGS)
        );

        return DEFAULT_SETTINGS;
    }

    return JSON.parse(saved);
};

export const saveWhatsAppSettings = (settings) => {
    localStorage.setItem(
        "whatsappSettings",
        JSON.stringify(settings)
    );
};

export const generateLinks = (order) => {
    const settings = getWhatsAppSettings();

    return {
        customerLink: createCustomerLink(order),
        ownerLink: createOwnerLink(
            order,
            settings.ownerPhone
        ),
    };
};

export const openCustomerChat = (order) => {
    const { customerLink } = generateLinks(order);

    window.open(customerLink, "_blank");
};

export const openOwnerChat = (order) => {
    const { ownerLink } = generateLinks(order);

    window.open(ownerLink, "_blank");
};

export const runAutomation = (
    order,
    onCountdown,
    onFinish
) => {
    const settings = getWhatsAppSettings();

    if (settings.customerAutoOpen) {
        openCustomerChat(order);
    }

    let remaining = settings.delay / 1000;

    onCountdown?.(remaining);

    const timer = setInterval(() => {
        remaining--;

        onCountdown?.(remaining);

        if (remaining <= 0) {
            clearInterval(timer);

            if (settings.ownerAutoOpen) {
                wnerChat(order);
            }

            onFinish?.();
        }
    }, 1000);

    return () => clearInterval(timer);
};