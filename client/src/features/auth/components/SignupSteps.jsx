/**
 * SignupSteps Component
 *
 * Displays visual progress of the signup flow.
 *
 * Steps:
 * 1 → Email
 * 2 → OTP
 * 3 → Password
 */

function SignupSteps({ step }) {
  const steps = ['Email', 'OTP', 'Password'];

  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = step >= stepNumber;

        return (
          <div key={label} className="flex flex-col items-center flex-1">
            {/* Step Circle */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
              ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {stepNumber}
            </div>

            {/* Step Label */}
            <span className="text-xs mt-2">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default SignupSteps;
