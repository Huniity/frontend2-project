'use client';

import { useRef, useState, useCallback } from 'react';
import Modal, { ModalButton } from '@/components/ui/modal/Modal';
import Image from 'next/image';

interface ProfilePhotoProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (file: File) => Promise<void>;
}

const ProfilePhoto = ({ isOpen, onClose, onSave }: ProfilePhotoProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = () => fileInputRef.current?.click();

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
        e.target.value = '';
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    }, []);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        setSelectedFile(null);
    };

    const handleSave = async () => {
        if (!selectedFile) {
            onClose();
            return;
        }
        setIsSaving(true);
        setError(null);
        try {
            await onSave?.(selectedFile);
            setPreview(null);
            setSelectedFile(null);
            onClose();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to save profile photo';
            setError(errorMessage);
            console.error('Failed to save profile photo:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleClose = () => {
        setPreview(null);
        setSelectedFile(null);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Change Profile Photo"
            footer={
                <>
                    <ModalButton variant="secondary" onClick={handleClose} disabled={isSaving}>
                        Cancel
                    </ModalButton>
                    <ModalButton
                        variant="primary"
                        onClick={handleSave}
                        disabled={isSaving || !selectedFile}
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </ModalButton>
                </>
            }
        >
            <div className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}
                <p className="text-gray-300 text-sm">Upload a new profile photo</p>

                <div
                    onClick={!preview ? handleClick : undefined}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
                        relative border-2 border-dashed rounded-xl transition-all
                        ${isDragging
                            ? 'border-blue-400 bg-blue-500/10'
                            : 'border-white/20 hover:border-white/40'
                        }
                        ${!preview ? 'p-8 text-center cursor-pointer' : 'overflow-hidden'}
                    `}
                >
                    {preview ? (
                        <div className="relative group">
                            <Image
                                width={48}
                                height={48}
                                src={preview}
                                alt="Profile preview"
                                className="w-full max-h-64 object-contain rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                                <button
                                    onClick={handleClick}
                                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs rounded-lg backdrop-blur-sm transition-colors"
                                >
                                    Change
                                </button>
                                <button
                                    onClick={handleRemove}
                                    className="px-3 py-1.5 bg-red-500/60 hover:bg-red-500/80 text-white text-xs rounded-lg backdrop-blur-sm transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-white/70 text-xs truncate bg-black/40 rounded px-2 py-1 backdrop-blur-sm">
                                    {selectedFile?.name}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white text-2xl">
                                {isDragging ? '↓' : '+'}
                            </div>
                            <p className="text-gray-400 text-sm">
                                {isDragging
                                    ? 'Drop your image here'
                                    : 'Drag and drop your image here, or click to browse'}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">PNG, JPG, GIF, WEBP up to 10MB</p>
                        </>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>
        </Modal>
    );
};

export default ProfilePhoto;