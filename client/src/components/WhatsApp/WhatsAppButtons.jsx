const WhatsAppButtons = ({
  order,
  customerLink,
  ownerLink,
}) => {
  return (
    <div className="mt-8 space-y-4">

      {order?.phone && (
        <a
          href={customerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl font-bold transition"
        >
          📲 Send to Customer
        </a>
      )}

      <a
        href={ownerLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-[#3B2A20] hover:bg-[#2d2118] text-white text-center py-4 rounded-xl font-bold transition"
      >
        👨‍💼 Send to Owner
      </a>

    </div>
  );
};

export default WhatsAppButtons;