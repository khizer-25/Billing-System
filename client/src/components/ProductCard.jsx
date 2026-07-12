import React from "react";

const ProductCard = ({
  index,
  product,
  handleProductChange,
  removeProduct,
  canRemove,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 mb-5">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-[#3B2A20]">
          Product {index + 1}
        </h2>

        {canRemove && (
          <button
            type="button"
            onClick={() => removeProduct(index)}
            className="text-red-500 font-semibold hover:text-red-700"
          >
            Remove
          </button>
        )}
      </div>

      <div className="space-y-4">

        <div>
          <label className="block mb-2 font-medium">
            Perfume Name
          </label>

          <input
            type="text"
            value={product.perfumeName}
            onChange={(e) =>
              handleProductChange(index, "perfumeName", e.target.value)
            }
            className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block mb-2 font-medium">
              ML
            </label>

            <input
              type="number"
              value={product.ml}
              onChange={(e) =>
                handleProductChange(index, "ml", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Price
            </label>

            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                handleProductChange(index, "price", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;