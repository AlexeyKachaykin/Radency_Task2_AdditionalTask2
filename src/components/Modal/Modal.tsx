import React from 'react';
import ReactDOM from 'react-dom';


interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) {
        throw new Error(
            'Modal root element not found. Make sure you have a div with id "modal-root" in your HTML.'
        );
    }

    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-md p-4 relative flex flex-col justify-center items-center">
                <button
                    className="absolute top-0 right-5 text-2xl bg-transparent border-none cursor-pointer p-1 text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;



