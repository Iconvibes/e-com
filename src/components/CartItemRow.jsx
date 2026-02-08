export default function CartItemRow({ item, onRemove, onIncrease, onDecrease }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-4 px-2">
        <div className="flex items-center gap-4">
          {item.images && item.images[0] && (
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/100?text=" + encodeURIComponent(item.name);
              }}
            />
          )}
          <div>
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">₦{item.price?.toLocaleString()}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onDecrease(item.id)}
            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.id)}
            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            +
          </button>
        </div>
      </td>
      <td className="py-4 px-2 text-right">
        ₦{(item.price * item.quantity)?.toLocaleString()}
      </td>
      <td className="py-4 px-2 text-center">
        <button
          onClick={() => onRemove(item.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
