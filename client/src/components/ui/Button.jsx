/**
 * Reusable Button Component
 *
 * Supports loading states and prevents multiple clicks.
 */

function Button({ children, type = 'button', onClick, loading = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
}

export default Button;
