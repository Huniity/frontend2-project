'use client';

import { X } from 'lucide-react';

interface PostModalProps {
  post: {
    id: string;
    title: string;
    content: string;
    description: string;
    category: string;
    date: string;
    user: {
      username: string;
      avatarUrl: string | null;
    };
  } | null;
  onClose: () => void;
}

export const PostModal = ({ post, onClose }: PostModalProps) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-2xl border border-white/15 bg-black backdrop-blur-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 border-b border-white/10 bg-black/80 backdrop-blur p-6 flex items-center justify-between">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-made-outer font-bold text-white/60 border border-white/15 rounded-full bg-white/5 mb-3">
              {post.category}
            </span>
            <h2 className="text-2xl font-made-outer-alt font-bold text-white">
              {post.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Meta Information */}
          <div className="flex items-center gap-4">
            {post.user.avatarUrl && (
              <img
                src={post.user.avatarUrl}
                alt={post.user.username}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <p className="text-sm font-made-outer font-bold text-white">
                By {post.user.username || 'Anonymous'}
              </p>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-gray-300 font-made-outer text-base leading-relaxed">
              {post.description}
            </p>
          </div>

          {/* Full Content */}
          <div className="border-t border-white/10 pt-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-200 font-made-outer text-base leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 bg-black/80 backdrop-blur p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-made-outer font-bold transition-all duration-300 border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
