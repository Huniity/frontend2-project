'use client';

import Modal, { ModalButton } from '@/components/ui/modal/Modal';

interface ChangePasswordProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactInfo = ({ isOpen, onClose }: ChangePasswordProps) => {
    if (!isOpen) return null;

    return (
        <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Contact Information"
                footer={
                  <>
                    <ModalButton variant="secondary" onClick={onClose}>
                      Cancel
                    </ModalButton>
                    <ModalButton variant="primary" onClick={onClose}>
                      Update Information
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
                      placeholder="Confirm with your password"
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors font-made-outer"
                    />
                  </div>
                </div>
              </Modal>
    )
}

export default ContactInfo;