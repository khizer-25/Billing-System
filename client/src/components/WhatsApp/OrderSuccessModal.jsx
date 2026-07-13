
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppButtons from "./WhatsAppButtons";

import {
  createCustomerLink,
  createOwnerLink,
} from "../../utils/whatsappLinks";

const OWNER_PHONE = "919010177592"; // <-- change to your number

const OrderSuccessModal = ({
  open,
  order,
  onClose,
}) => {

  if (!order) return null;

  const customerLink = createCustomerLink(order);

  const ownerLink = createOwnerLink(
    order,
    OWNER_PHONE
  );

  

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <motion.div
            initial={{ scale: .8 }}
            animate={{ scale: 1 }}
            exit={{ scale: .8 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8"
          >

            <div className="text-center">

              <div className="text-6xl">
                ✅
              </div>

              <h2 className="text-3xl font-bold mt-4 text-[#3B2A20]">
                Order Saved
              </h2>

              <p className="text-gray-500 mt-2">
                WhatsApp Automation Started
              </p>

            </div>

            <div className="mt-8 bg-green-50 rounded-xl p-4">

              <div className="flex justify-between">

                <div>
  <p className="font-semibold">Customer</p>
  <p className="text-sm text-gray-500">
    {order.customerName || "Walk-in Customer"}
  </p>
</div>

              <span
  className={`font-bold ${
    order.phone
      ? "text-green-600"
      : "text-gray-500"
  }`}
>
  {order.phone ? "✔ Opened" : "Skipped"}
</span>

              </div>

            </div>


            <WhatsAppButtons
  order={order}
  customerLink={customerLink}
  ownerLink={ownerLink}
/>

            <button
              onClick={onClose}
              className="w-full mt-6 bg-[#3B2A20] text-white py-3 rounded-xl font-bold"
            >
              Done
            </button>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
};

export default OrderSuccessModal;