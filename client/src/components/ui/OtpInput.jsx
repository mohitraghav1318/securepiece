/**
 * OTP Input Component
 *
 * Renders multiple input boxes for OTP entry.
 * Automatically moves focus to the next input.
 */

import { useRef } from 'react';

function OtpInput({ value, setValue, length = 6 }) {
  const inputs = useRef([]);

  /**
   * Handle digit input
   */
  const handleChange = (index, e) => {
    const newValue = value.split('');

    newValue[index] = e.target.value;

    const updated = newValue.join('');
    setValue(updated);

    /**
     * Move focus to next box
     */
    if (e.target.value && inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <div className="flex justify-between gap-2 mb-4">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          type="text"
          maxLength="1"
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e)}
          className="w-10 h-12 text-center border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
}

export default OtpInput;
