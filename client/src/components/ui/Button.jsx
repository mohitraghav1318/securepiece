/**
 * Reusable Button Component
 *
 * Supports loading states and prevents multiple clicks.
 */

function Button({
  children,
  type = 'button',
  onClick,
  loading = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-200 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 ${className}`}
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
}

export default Button;
