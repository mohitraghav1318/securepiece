/**
 * AuthCard Component
 *
 * Premium styled authentication container
 */

function AuthCard({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-100">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6 tracking-tight">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}

export default AuthCard;
