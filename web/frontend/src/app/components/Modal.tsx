import { ModalProps } from '@/app/util/types';
import { createPortal } from 'react-dom';
import { XIcon } from '@phosphor-icons/react';
import { iconSize } from '@/app/util/util';
import { useCallback, useEffect } from 'react';

export default function Modal({ isOpen, type, content, onClose }: ModalProps) {
    const closeModal = useCallback(() => {
        onClose();
        isOpen = false;
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => closeModal(), 5000);
        }
    }, [closeModal, isOpen]);

    return createPortal(
        <div
            className={`absolute ${isOpen ? 'translate-y-0' : 'translate-y-full'} bottom-0 pb-16 w-full flex justify-center transition-transform duration-400 ease-out`}
        >
            <div
                className={`flex flex-row min-w-48 min-h-16 bg-white shadow-md border-2 ${type === 'success' ? 'border-action' : 'border-red-500'} p-2 rounded-xl`}
            >
                <span className="m-4 text-left">{content}</span>
                <div className="hover:cursor-pointer">
                    <XIcon size={iconSize} onClick={closeModal} />
                </div>
            </div>
        </div>,
        document.body
    );
}
