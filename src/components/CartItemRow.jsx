export default function CartItemRow({ item, onRemove, onIncrease, onDecrease }) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
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
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">₦{item.price?.toLocaleString()}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onDecrease(item.id)}
            className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold text-gray-900 dark:text-gray-100">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.id)}
            className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            +
          </button>
        </div>
      </td>
      <td className="py-4 px-2 text-right text-gray-900 dark:text-gray-100">
        ₦{(item.price * item.quantity)?.toLocaleString()}
      </td>
      <td className="py-4 px-2 text-center">
        <button
          onClick={() => onRemove(item.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 transition-colors text-sm"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
