'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface BlogFormProps {
  blog?: {
    id: string;
    title: string;
    description: string;
    content: string;
    category: string;
  };
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    content: string;
    category: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

const categories = [
  { value: 'PLAN_HACKS', label: 'Plan Hacks' },
  { value: 'TRAVEL_TIPS', label: 'Travel Tips' },
  { value: 'COMMUNITY_HELP', label: 'Community Help' },
  { value: 'DESTINATION_GUIDE', label: 'Destination Guide' },
];

export const BlogForm = ({ blog, onClose, onSubmit, isLoading }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    description: blog?.description || '',
    content: blog?.content || '',
    category: blog?.category || 'TRAVEL_TIPS',
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim() || !formData.description.trim() || !formData.content.trim()) {
      setError('All fields are required');
      return;
    }

    if (formData.title.length > 200) {
      setError('Title must be less than 200 characters');
      return;
    }

    if (formData.description.length > 500) {
      setError('Description must be less than 500 characters');
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="mt-12 rounded-2xl border border-white/15 bg-black backdrop-blur-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 border-b border-white/10 bg-black/80 backdrop-blur p-6 flex items-center justify-between">
          <h2 className="text-2xl font-made-outer-alt font-bold text-white">
            {blog ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm font-made-outer">{error}</p>
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-made-outer font-bold text-white mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-black border border-white/15 rounded-lg px-4 py-3 text-white font-made-outer focus:outline-none focus:border-white/30 transition-colors"
              disabled={isLoading}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-black text-white">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-made-outer font-bold text-white mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter post title"
              maxLength={200}
              className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white font-made-outer placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.title.length}/200
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-made-outer font-bold text-white mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter post description (preview)"
              maxLength={500}
              rows={3}
              className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white font-made-outer placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/500
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-made-outer font-bold text-white mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter full post content"
              rows={8}
              className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white font-made-outer placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-lg font-made-outer font-bold transition-all duration-300 border border-white/20 text-white hover:bg-white/10 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-lg font-made-outer font-bold transition-all duration-300 bg-white text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : blog ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
