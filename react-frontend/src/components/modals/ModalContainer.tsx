import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useModal } from '../../contexts/ModalContext';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import ContactModal from './ContactModal';
import ProfileModal from './ProfileModal';
import FoodItemModal from './FoodItemModal';
import SuccessModal from './successModal';

const ModalContainer: React.FC = () => {
  const { isOpen, modalType, closeModal } = useModal();

  const renderModalContent = () => {
    switch (modalType) {
      case 'login':
        return <LoginModal />;
      case 'signup':
        return <SignupModal />;
      case 'contact':
        return <ContactModal />;
      case 'profile':
        return <ProfileModal />;
      case 'food':
        return <FoodItemModal />;
      case 'success':
        return <SuccessModal />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-xl shadow-float max-w-md w-full mx-auto overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {renderModalContent()}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalContainer;