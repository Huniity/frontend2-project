'use client';

import Modal, { ModalButton } from '@/components/ui/modal/Modal';
import { updatePassword, signOut } from '@/app/auth/actions';
import { useState } from 'react';

interface ChangePasswordProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChangePassword = ({ isOpen, onClose }: ChangePasswordProps) => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setIsLoading(true);
        const result = await updatePassword(formData);
        setIsLoading(false);

        if (result.error) {
            setError(result.error);
            return;
        }

        setSuccess(true);
        
        // Log out user after showing success message
        setTimeout(() => {
            signOut();
        }, 3000);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Change Password"
            footer={
                <>
                    <ModalButton variant="secondary" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </ModalButton>
                    <ModalButton
                        variant="primary"
                        type="submit"
                        form="change-password-form"
                        disabled={isLoading || success}
                    >
                        {isLoading ? 'Updating...' : 'Update Password'}
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
                {success && (
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-green-400 text-sm font-medium">Password updated successfully!</p>
                        <p className="text-green-400/80 text-xs mt-1">You will be logged out in a moment for the changes to take effect.</p>
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