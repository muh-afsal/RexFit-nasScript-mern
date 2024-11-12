
import { useState, useRef } from "react";
import * as Yup from 'yup';

// Validation schema
const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .length(4, 'OTP must be 4 digits')
    .matches(/^\d{4}$/, 'OTP must be a valid 4-digit number'),
});

// eslint-disable-next-line react/prop-types
const OtpModal = ({ onClose, email, onSubmit }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState(null);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.slice(0, 1);
    if (!/^[0-9]$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    try {
      await otpSchema.validate({ otp: otpString });
      await onSubmit(otpString);
      onClose();
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        setErrors(validationError.message || "Validation failed. Please check your OTP.");
      } else {
        setErrors("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 text-center shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <p className="text-gray-500 text-sm mb-4">An OTP has been sent to {email}. Please enter it below.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2 justify-center mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                placeholder="0"
                className="bg-slate-100 dark:bg-neutral-400 text-lg text-black font-bold p-2 rounded-lg w-12 text-center border  focus:border-blue-200 focus:outline-none focus:ring-blue-500"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {errors && <p className="text-red-500 text-sm">{errors}</p>}

          <button
            type="submit"
            className="bg-rex-green text-black  font-semibold p-2 rounded-lg hover:opacity-95 mt-4"
          >
            Verify OTP
          </button>
        </form>

        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ×
        </button>
      </div>
    </div>
  );
};

export default OtpModal