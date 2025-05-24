import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ModalType, ModalData } from '../types';

interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType | null;
  modalData: ModalData | null;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (type: ModalType, data: ModalData = {}) => {
    setModalType(type);
    setModalData(data);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear modal data after animation completes
    setTimeout(() => {
      setModalType(null);
      setModalData(null);
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalType, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};