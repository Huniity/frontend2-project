'use client';

import { useState } from 'react';
import Modal, { ModalButton } from '@/components/ui/modal/Modal';
import { toast } from 'react-toastify';

interface ContactInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ToastDuration = 3000;

const ContactInfo = ({ isOpen, onClose }: ContactInfoProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!firstName && !lastName) {
      toast.error("Please fill in at least one field.", { autoClose: ToastDuration });
      return;
    }
    if (!password) {
      toast.error("Please confirm with your password.", { autoClose: ToastDuration });
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Updating information...');

    try {
      const res = await fetch("/api/user/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.update(toastId, {
          render: data.error ?? "Something went wrong.",
          type: 'error',
          isLoading: false,
          autoClose: ToastDuration,
        });
        return;
      }

      toast.update(toastId, {
        render: 'Contact information updated!',
        type: 'success',
        isLoading: false,
        autoClose: ToastDuration,
      });
      setRedirecting(true);
      setTimeout(() => window.location.reload(), ToastDuration);

    } catch (err) {
      toast.update(toastId, {
        render: 'Something went wrong. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: ToastDuration,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setRedirecting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Contact Information"
      footer={
        <>
          <ModalButton variant="secondary" onClick={handleClose} disabled={isLoading || redirecting}>
            Cancel
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading || redirecting}
          >
            {isLoading ? 'Updating...' : redirecting ? 'Redirecting...' : 'Update Information'}
          </ModalButton>
        </>
      }
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-made-outer font-medium text-gray-300 mb-2">
            Change First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your new first name"
            className="w-full px-4 py-2.5 bg-white/10 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors font-made-outer"
          />
        </div>
        <div>
          <label className="block text-sm font-made-outer font-medium text-gray-300 mb-2">
            Change Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your new last name"
            className="w-full px-4 py-2.5 bg-white/10 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors font-made-outer"
          />
        </div>
        <div>
          <label className="block text-sm font-made-outer font-medium text-gray-300 mb-2">
            Confirm with your Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Confirm with your password"
            className="w-full px-4 py-2.5 bg-white/10 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors font-made-outer"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ContactInfo;