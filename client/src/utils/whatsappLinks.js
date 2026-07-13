import {
  createCustomerMessage,
  createOwnerMessage,
} from "./whatsappTemplates";

const normalizePhone = (phone = "") => {
  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("91") && cleaned.length > 10) {
    return cleaned;
  }

  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }

  return cleaned;
};

export const createCustomerLink = (order) => {
  const message = createCustomerMessage(order);

  return `https://wa.me/${normalizePhone(
    order.phone
  )}?text=${encodeURIComponent(message)}`;
};

export const createOwnerLink = (order, ownerPhone) => {
  const message = createOwnerMessage(order);

  return `https://wa.me/${normalizePhone(
    ownerPhone
  )}?text=${encodeURIComponent(message)}`;
};