'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/ui/navbar/Navbar'
import Footer from '@/components/ui/footer/Footer'
import { BlogForm } from './BlogForm'
import { PostModal } from './PostModal'
import { Trash2, Edit2, Plus } from 'lucide-react'

interface Post {
    id: string
    title: string
    content: string
    description: string
    user: {
        id: string
        username: string
        avatarUrl: string | null
    }
    date: string
    category: string
    createdAt: string
    userId: string
}

interface BlogResponse {
    posts: any[]
    total: number
    pages: number
    currentPage: number
}

const Blog = () => {
    const supabase = createClient()
    const [user, setUser] = useState<any>(null)
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [editingBlog, setEditingBlog] = useState<Post | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)

    const categories = {
        'PLAN_HACKS': 'Plan Hacks',
        'TRAVEL_TIPS': 'Travel Tips',
        'COMMUNITY_HELP': 'Community Help',
        'DESTINATION_GUIDE': 'Destination Guide'
    }

    // Get current user
    useEffect(() => {
        const getUser = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser()
            setUser(authUser)
        }
        getUser()
    }, [])

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blog?limit=12&page=1')
                if (!response.ok) throw new Error('Failed to fetch posts')
                
                const data: BlogResponse = await response.json()
                const formattedPosts = data.posts.map((post: any) => ({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    description: post.description,
                    user: post.user,
                    date: new Date(post.createdAt).toLocaleDateString(),
                    category: categories[post.category as keyof typeof categories] || post.category,
                    createdAt: post.createdAt,
                    userId: post.userId
                }))
                setPosts(formattedPosts)
                setLoading(false)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch posts')
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    // Handle create/update
    const handleSubmit = async (data: {
        title: string
        description: string
        content: string
        category: string
    }) => {
        setIsSubmitting(true)
        try {
            const url = editingBlog ? `/api/blog/${editingBlog.id}` : '/api/blog'
            const method = editingBlog ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to save blog')
            }

            // Refresh posts
            const postsResponse = await fetch('/api/blog?limit=12&page=1')
            const postsData: BlogResponse = await postsResponse.json()
            const formattedPosts = postsData.posts.map((post: any) => ({
                id: post.id,
                title: post.title,
                content: post.content,
                description: post.description,
                user: post.user,
                date: new Date(post.createdAt).toLocaleDateString(),
                category: categories[post.category as keyof typeof categories] || post.category,
                createdAt: post.createdAt,
                userId: post.userId
            }))
            setPosts(formattedPosts)
            setEditingBlog(null)
            setShowForm(false)
        } catch (err) {
            throw err
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle delete
    const handleDelete = async (postId: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return

        try {
            const response = await fetch(`/api/blog/${postId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to delete blog')
            }

            setPosts(posts.filter(p => p.id !== postId))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete post')
        }
    }

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="font-made-outer text-lg">Loading...</p>
            </div>
        </>
    )
    
    if (error) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="font-made-outer text-lg">Error: {error}</p>
            </div>
        </>
    )

    // Group posts by category
    const groupedPosts = Object.entries(categories).map(([key, label]) => ({
        category: label,
        posts: posts.filter(post => 
            post.category === label
        )
    })).filter(section => section.posts.length > 0)

    return (
        <>
            <Navbar />
            <div className="min-h-screen text-white mt-24 py-32">
                <div className="max-w-6xl mx-auto px-4 md:px-12">
                    {/* Header with Create Button */}
                    <div className="text-center mb-24 flex flex-col items-center gap-6">
                        <div>
                            <h1 className="text-6xl font-made-outer-alt font-black mb-4 text-shadow-lg">
                                OUr Blog
                            </h1>
                            <p className="text-gray-400 font-made-outer-alt text-3xl mb-6">
                                Stories, tips, and insights from the Nomadia community
                            </p>
                        </div>
                        
                        {user && (
                            <button
                                onClick={() => {
                                    setEditingBlog(null)
                                    setShowForm(true)
                                }}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg font-made-outer-alt font-bold transition-all duration-300 bg-white text-black hover:bg-gray-100"
                            >
                                <Plus size={18} strokeWidth={5}/>
                                CrEatE post
                            </button>
                        )}
                    </div>

                    {posts.length === 0 && !loading ? (
                        <div className="text-center py-16">
                            <p className="text-gray-400 font-made-outer text-lg mb-6">
                                No blog posts yet. {user && 'Be the first to share!'}
                            </p>
                            {user && (
                                <button
                                    onClick={() => {
                                        setEditingBlog(null)
                                        setShowForm(true)
                                    }}
                                    className="px-6 py-3 rounded-lg font-made-outer font-bold transition-all duration-300 bg-white text-black hover:bg-gray-100"
                                >
                                    Create First Post
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Category Sections */}
                            {groupedPosts.map((section, index) => (
                                <div key={section.category}>
                                    {/* Category Header */}
                                    <div className="mb-12 flex items-center gap-6">
                                        <div className="flex-1">
                                            <div className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
                                        </div>
                                        <h2 className="text-2xl xl:text-3xl font-made-outer-alt font-bold whitespace-nowrap px-4">
                                            {section.category}
                                        </h2>
                                        <div className="flex-1">
                                            <div className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
                                        </div>
                                    </div>

                                    {/* Posts Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                        {section.posts.map(post => (
                                            <div
                                                key={post.id}
                                                className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-lg hover:bg-white/8 hover:border-white/25 transition-all duration-300 overflow-hidden flex flex-col group"
                                            >
                                                <div className="p-8 flex flex-col h-full">
                                                    {/* Category Tag & Actions */}
                                                    <div className="flex items-start justify-between mb-3 gap-2">
                                                        <span className="inline-block px-3 py-1 text-xs font-made-outer font-bold text-white/60 border border-white/15 rounded-md bg-white/5">
                                                            {post.category}
                                                        </span>
                                                        {user?.id === post.userId && (
                                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingBlog(post)
                                                                        setShowForm(true)
                                                                    }}
                                                                    className="p-2 hover:bg-white/10 rounded transition-colors"
                                                                    title="Edit post"
                                                                >
                                                                    <Edit2 size={16} className="text-blue-400" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(post.id)}
                                                                    className="p-2 hover:bg-white/10 rounded transition-colors"
                                                                    title="Delete post"
                                                                >
                                                                    <Trash2 size={16} className="text-red-400" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Post Title */}
                                                    <h3 className="text-xl font-made-outer-alt font-bold mb-3 text-white line-clamp-2">
                                                        {post.title}
                                                    </h3>

                                                    {/* Meta Information */}
                                                    <p className="text-xs text-gray-500 font-made-outer mb-4">
                                                        By {post.user?.username || 'Anonymous'} | {post.date}
                                                    </p>

                                                    {/* Post Description */}
                                                    <p className="text-gray-300 font-made-outer text-sm mb-6 grow line-clamp-3">
                                                        {post.description}
                                                    </p>

                                                    {/* Read More Button */}
                                                    <button 
                                                        onClick={() => setSelectedPost(post)}
                                                        className="w-full py-2 px-6 rounded-lg font-made-outer font-bold transition-all duration-300 border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                                                    >
                                                        Read More
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Category Divider */}
                                    {index < groupedPosts.length - 1 && (
                                        <div className="my-8 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Blog Form Modal */}
                {showForm && (
                    <BlogForm
                        blog={editingBlog ? {
                            id: editingBlog.id,
                            title: editingBlog.title,
                            description: editingBlog.description,
                            content: editingBlog.content,
                            category: Object.entries(categories).find(([_, v]) => v === editingBlog.category)?.[0] || 'TRAVEL_TIPS'
                        } : undefined}
                        onClose={() => {
                            setShowForm(false)
                            setEditingBlog(null)
                        }}
                        onSubmit={handleSubmit}
                        isLoading={isSubmitting}
                    />
                )}

                {/* Post Detail Modal */}
                <PostModal
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            </div>
            <Footer />
        </>
    )
}

export default Blog
