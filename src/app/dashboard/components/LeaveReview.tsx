'use client';

import { useState, useRef, useEffect } from 'react';
import { Star, Upload, Lock, Globe, Loader, Trash2, PenTool, Eye } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import type { UserWithRelations } from '../Dashboard';

const ToastDuration = 3000;

type Review = {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  imageUrl: string | null;
  isPublic: boolean;
  createdAt: Date;
  trip: {
    id: string;
    title: string;
    destination: string;
    numberOfDays: number;
  };
};

export default function LeaveReview({ user }: { user: UserWithRelations }) {
  const [activeTab, setActiveTab] = useState<'form' | 'reviews'>('form');
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedTrip = user.trips.find(trip => trip.id === selectedTripId);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoadingReviews(true);
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      setDeletingId(reviewId);
      const response = await fetch(`/api/reviews?id=${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      toast.success('Review deleted successfully!', { autoClose: ToastDuration });
      await fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review', { autoClose: ToastDuration });
    } finally {
      setDeletingId(null);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;


    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'User_Review');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTripId) {
      toast.error('Please select a trip');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Submitting your review...');

    try {
      let imageUrl: string | null = null;

      if (image) {
        imageUrl = await uploadImageToSupabase(image);
        if (!imageUrl) {
          toast.update(toastId, {
            render: 'Failed to upload image',
            type: 'error',
            isLoading: false,
            autoClose: ToastDuration,
          });
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: selectedTripId,
          rating,
          title: title || null,
          body: body || null,
          imageUrl,
          isPublic,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      toast.update(toastId, {
        render: 'Review submitted successfully!',
        type: 'success',
        isLoading: false,
        autoClose: ToastDuration,
      });

      setSelectedTripId('');
      setRating(0);
      setTitle('');
      setBody('');
      setImage(null);
      setImagePreview('');
      setIsPublic(true);
      await fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.update(toastId, {
        render: 'Failed to submit review',
        type: 'error',
        isLoading: false,
        autoClose: ToastDuration,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-8">
      <div className="w-full max-w-2xl px-6 lg:px-12 py-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl">
        <div className="mb-12">
          <h2 className="text-2xl font-made-outer-alt font-bold italic mb-6">My Reviews</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setActiveTab('form')}
              className={`border rounded-lg p-6 backdrop-blur-md transition-colors cursor-pointer text-left flex items-center gap-3 ${
                activeTab === 'form'
                  ? 'border-white/40 bg-white/15 text-white'
                  : 'border-white/15 bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              <PenTool size={22} className="shrink-0" />
              <div>
                <h3 className="font-made-outer font-bold text-sm">Leave a Review</h3>
                <p className="text-gray-500 font-made-outer text-xs mt-0.5">Create or edit</p>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`border rounded-lg p-6 backdrop-blur-md transition-colors cursor-pointer text-left flex items-center gap-3 ${
                activeTab === 'reviews'
                  ? 'border-white/40 bg-white/15 text-white'
                  : 'border-white/15 bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              <Eye size={22} className="shrink-0" />
              <div>
                <h3 className="font-made-outer font-bold text-sm">Your Reviews</h3>
                <p className="text-gray-500 font-made-outer text-xs mt-0.5">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
              </div>
            </button>
          </div>
        </div>

        {activeTab === 'form' && (
          <>
            <div className="mb-12">
              <h1 className="text-2xl font-made-outer-alt font-bold italic mb-4">LEavE a rEviEw</h1>
              <div className="space-y-4 text-sm text-gray-400 leading-relaxed font-made-outer">
                <p>Share your travel experience with us! Rate your trips and add photos to help other travelers.</p>
              </div>
            </div>

            {user.trips.length === 0 ? (
              <div className="rounded-lg border border-white/15 bg-white/5 backdrop-blur-lg p-8 text-center">
                <p className="text-gray-400 font-made-outer">You haven&apos;t created any trips yet. Complete a trip first to leave a review!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-white mb-3 font-made-outer">
                Select a Trip <span className="text-yellow-400">**</span>
              </label>
              <select
                value={selectedTripId}
                onChange={(e) => setSelectedTripId(e.target.value)}
                className="w-full bg-black border border-white/15 rounded-lg px-4 py-3 text-white font-made-outer focus:outline-none focus:border-white/30 transition-colors"
                disabled={isLoading}
              >
                <option value="" className="bg-black text-white">-- Select a trip --</option>
                {user.trips.map((trip) => (
                  <option key={trip.id} value={trip.id} className="bg-black text-white">
                    {trip.title} ({trip.destination}) - {trip.numberOfDays} days
                  </option>
                ))}
              </select>
            </div>


            <div>
              <label className="block text-sm font-bold text-white mb-4 font-made-outer">
                Rating <span className="text-yellow-400">**</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    disabled={isLoading}
                    className="transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-500'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>


            <div>
              <label className="block text-sm font-bold text-white mb-3 font-made-outer">
                Review Title <span className="text-yellow-400">**</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Amazing Adventure in Bali"
                maxLength={100}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors font-made-outer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">{title.length}/100</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-3 font-made-outer">
                Review Details <span className="text-yellow-400">**</span>
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your experience, highlights, and recommendations..."
                maxLength={1000}
                rows={6}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors font-made-outer resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">{body.length}/1000</p>
            </div>


            <div>
              <label className="block text-sm font-bold text-white mb-3 font-made-outer">
                Upload Photo *
              </label>
              {imagePreview ? (
                <div className="space-y-3">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border border-white/15 bg-white/5">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-colors font-made-outer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Change Photo
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="w-full px-4 py-8 rounded-lg bg-white/5 border-2 border-dashed border-white/15 hover:border-white/30 hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload size={24} className="text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-white font-made-outer">Click to upload</p>
                    <p className="text-xs text-gray-500 font-made-outer">PNG, JPG, AVIF (Max 5MB)</p>
                  </div>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/15">
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                disabled={isLoading}
                className="flex items-center gap-3 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPublic ? (
                  <Globe className="text-emerald-400" size={20} />
                ) : (
                  <Lock className="text-red-800" size={20} />
                )}
                <div className="text-left">
                  <p className="text-sm font-bold text-white font-made-outer">
                    {isPublic ? 'Public Review' : 'Private Review'}
                  </p>
                  <p className="text-xs text-gray-400 font-made-outer">
                    {isPublic ? 'Others can see your review' : 'Only you can see this review'}
                  </p>
                </div>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/25 font-bold font-made-outer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </button>

            <div className="mt-6 space-y-2 text-sm text-gray-400 font-made-outer">
              <p className="flex items-center gap-2">
                <span className="text-yellow-400">**</span> Required fields
              </p>
              <p className="flex items-center gap-2">
                <span className="text-white">*</span> Not required, but highly recommended to make your review more engaging!
              </p>
            </div>
              </form>
            )}
          </>
        )}

        {activeTab === 'reviews' && (
          <>
            {isLoadingReviews ? (
              <div className="flex items-center justify-center py-16">
                <Loader size={32} className="animate-spin text-gray-400" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-lg border border-white/15 bg-white/5 backdrop-blur-lg p-12 text-center">
                <p className="text-gray-400 font-made-outer mb-4">You haven&apos;t left any reviews yet.</p>
                <button
                  onClick={() => setActiveTab('form')}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 font-made-outer transition-colors"
                >
                  Leave Your First Review
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 transition-colors overflow-hidden">
                    <div className="p-6 flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-white font-made-outer">{review.trip.title}</h3>
                          <span className="text-xs text-gray-400">({review.trip.destination})</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={`${
                                  star <= review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400 ml-2">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          {!review.isPublic && (
                            <span className="text-xs bg-orange-400/20 text-orange-400 px-2 py-1 rounded border border-orange-400/30 ml-2">
                              Private
                            </span>
                          )}
                        </div>
                        {review.title && (
                          <p className="text-sm font-bold text-white mb-2">{review.title}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        disabled={deletingId === review.id}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                        title="Delete review"
                      >
                        {deletingId === review.id ? (
                          <Loader size={20} className="animate-spin" />
                        ) : (
                          <Trash2 size={20} />
                        )}
                      </button>
                    </div>

                    {(review.imageUrl || review.body) && (
                      <div className="px-6 pb-4 border-t border-white/10">
                        <div className="flex gap-4 mt-4">
                          {review.imageUrl && (
                            <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-white/15">
                              <Image
                                src={review.imageUrl}
                                alt={review.title || 'Review image'}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {review.body && (
                            <div className="flex-1">
                              {expandedReviewId === review.id ? (
                                <p className="text-sm text-gray-300 whitespace-pre-wrap">{review.body}</p>
                              ) : (
                                <>
                                  <p className="text-sm text-gray-300 line-clamp-3">{review.body}</p>
                                  {review.body.length > 200 && (
                                    <button
                                      onClick={() => setExpandedReviewId(expandedReviewId === review.id ? null : review.id)}
                                      className="text-xs text-white hover:text-blue-300 mt-5 font-made-outer font-bold"
                                    >
                                      View More
                                    </button>
                                  )}
                                </>
                              )}
                              {expandedReviewId === review.id && review.body.length > 200 && (
                                <button
                                  onClick={() => setExpandedReviewId(null)}
                                  className="text-xs text-white hover:text-blue-300 mt-5 font-made-outer font-bold"
                                >
                                  Show Less
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
