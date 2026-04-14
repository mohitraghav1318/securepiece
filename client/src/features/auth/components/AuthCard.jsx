/**
 * AuthCard Component
 *
 * A reusable container for authentication forms.
 * Centers the form and provides a modern card layout.
 */

function AuthCard({ title, children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default AuthCard;
