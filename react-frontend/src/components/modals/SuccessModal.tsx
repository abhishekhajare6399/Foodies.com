import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useModal } from '../../contexts/ModalContext';

const SuccessModal: React.FC = () => {
  const { closeModal, modalData } = useModal();
  const { email, fullName } = modalData || {};

  // Function to open Gmail or user's default email service
  const redirectToEmail = () => {
    closeModal();
    // Open Gmail or default mail client
    window.open('https://mail.google.com', '_blank');
  };

  return (
    <div className="p-6 text-center">
      <CheckCircle className="mx-auto text-green-500" size={64} />
      <h2 className="text-2xl font-semibold mt-4">Registration Successful!</h2>

      {fullName && (
        <p className="text-gray-600 mt-4">
          Welcome, <span className="font-bold text-black">{fullName}</span>!
        </p>
      )}

      {email && (
        <p className="text-gray-600 mt-2">
          A verification link has been sent to your email: <span className="font-bold text-black">{email}</span>.
        </p>
      )}

      <p className="text-gray-500 text-sm mt-2">
        Please check your inbox and verify your email to activate your account.
      </p>

      <p className="text-gray-500 text-sm mt-1">
        Thank you for joining us. Start ordering your favorite food from nearby restaurants now!
      </p>

      <button
        onClick={redirectToEmail}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Go to Email
      </button>
    </div>
  );
};

export default SuccessModal;
