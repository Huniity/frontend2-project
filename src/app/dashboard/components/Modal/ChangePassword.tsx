'use client';

import Modal, { ModalButton } from '@/components/ui/modal/Modal';
import { updatePassword, signOut } from '@/app/auth/actions';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ToastDuration = 3000;

const ChangePassword = ({ isOpen, onClose }: ChangePasswordProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.', { autoClose: ToastDuration });
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.', { autoClose: ToastDuration });
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Updating password...');

    const result = await updatePassword(formData);
    setIsLoading(false);

    if (result.error) {
      toast.update(toastId, {
        render: result.error,
        type: 'error',
        isLoading: false,
        autoClose: ToastDuration,
      });
      setError(result.error);
      return;
    }

    toast.update(toastId, {
      render: 'Password updated! Logging you out...',
      type: 'success',
      isLoading: false,
      autoClose: ToastDuration,
    });
    setLoggingOut(true);
    setTimeout(() => signOut(), ToastDuration);
  };

  const handleClose = () => {
    setError(null);
    setLoggingOut(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Change Password"
      footer={
        <>
          <ModalButton variant="secondary" onClick={handleClose} disabled={isLoading || loggingOut}>
            Cancel
          </ModalButton>
          <ModalButton
            variant="primary"
            type="submit"
            form="change-password-form"
            disabled={isLoading || loggingOut}
          >
            {isLoading ? 'Updating...' : loggingOut ? 'Logging out...' : 'Update Password'}
          </ModalButton>
        </>
      }
    >
      <form id="change-password-form" onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        <input
          name="currentPassword"
          type="password"
          placeholder="Current password"
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/15 rounded-lg text-white text-sm"
        />
        <input
          name="newPassword"
          type="password"
          placeholder="New password"
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/15 rounded-lg text-white text-sm"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/15 rounded-lg text-white text-sm"
        />
      </form>
    </Modal>
  );
};

export default ChangePassword;