'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/ui/navbar/Navbar'
import Footer from '@/components/ui/footer/Footer'

export const metadata = {
  title: "Blog",
  description: "Travel tips, destination guides, and AI travel planning insights from NomadIA.",
  alternates: { canonical: "https://be-nomadia.vercel.app/blog" },
};

interface Post {
    id: number
    title: string
    content: string
    author: string
    date: string
    category: string
}

const Blog = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const categories = ['Travel Tips', 'Destination Guides', 'Travel Hacks']

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }
                return response.json()
            })
            .then(data => {
                const formattedPosts = data.slice(0, 10).map((post: any, index: number) => ({
                    id: post.id,
                    title: post.title,
                    content: post.body,
                    author: 'Nomadia Team',
                    date: new Date().toLocaleDateString(),
                    category: categories[index % categories.length]
                }))
                setPosts(formattedPosts)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

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

    const groupedPosts = categories.map(category => ({
        category,
        posts: posts.filter(post => post.category === category)
    }))

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white py-32">
                <div className="max-w-6xl mx-auto px-12">
                    {/* Header */}
                    <div className="text-center mb-24">
                        <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-shadow-lg">
                            Our Blog
                        </h1>
                        <p className="text-gray-400 font-made-outer text-lg">
                            Stories, tips, and insights from the Nomadia community
                        </p>
                    </div>

                    {/* Category Sections */}
                    {groupedPosts.map((section, index) => (
                        <div key={section.category}>
                            {/* Category Header */}
                            <div className="mb-12 flex items-center gap-6">
                                <div className="flex-1">
                                    <div className="h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
                                </div>
                                <h2 className="text-3xl font-made-outer-alt font-bold whitespace-nowrap px-4">
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
                                        className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-lg hover:bg-white/8 hover:border-white/25 transition-all duration-300 overflow-hidden flex flex-col"
                                    >
                                        <div className="p-8 flex flex-col h-full">
                                            {/* Category Tag */}
                                            <div className="mb-3">
                                                <span className="inline-block px-3 py-1 text-xs font-made-outer font-bold text-white/60 border border-white/15 rounded-full bg-white/5">
                                                    {post.category}
                                                </span>
                                            </div>

                                            {/* Post Title */}
                                            <h3 className="text-xl font-made-outer-alt font-bold mb-3 text-white line-clamp-2">
                                                {post.title}
                                            </h3>

                                            {/* Meta Information */}
                                            <p className="text-xs text-gray-500 font-made-outer mb-4">
                                                By {post.author} | {post.date}
                                            </p>

                                            {/* Post Content */}
                                            <p className="text-gray-300 font-made-outer text-sm mb-6 grow line-clamp-3">
                                                {post.content}
                                            </p>

                                            {/* Read More Button */}
                                            <a href={`/post?id=${post.id}`} className="w-full">
                                                <button className="w-full py-2 px-6 rounded-lg font-made-outer font-bold transition-all duration-300 border border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                                                    Read More
                                                </button>
                                            </a>
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
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Blog
