'use client';


import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
            <h2 className="text-xl font-bold font-made-outer-alt text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-1 flex items-center justify-center"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="px-8 py-6 text-white">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-8 py-6 border-t border-white/10 flex items-center justify-end gap-3 bg-white/5">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export interface ModalButtonProps {
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
}

export function ModalButton({ onClick, variant = 'primary', disabled = false, children, type = 'button', form }: ModalButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      form={form}
      disabled={disabled}
      className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all border font-made-outer ${
        variant === 'primary'
          ? 'bg-white/10 hover:bg-white/20 text-white border-white/15 hover:border-white/25 disabled:opacity-50 disabled:cursor-not-allowed'
          : 'bg-transparent hover:bg-white/5 text-gray-400 hover:text-white border-white/10 hover:border-white/15 disabled:opacity-50 disabled:cursor-not-allowed'
      }`}
    >
      {children}
    </button>
  );
}