"use client";
import { fetchWithAuth } from "@/lib/api";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/shared/Navbar";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at?: string;
  author?: string;
}

export default function Newsletter() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(
        `${process.env.ORIGIN_URL}/posts/getPosts`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-400">Loading posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 py-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Newsletter
          </h1>
          <div className="w-24 h-[1px] bg-white/40 mx-auto"></div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="bg-black py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-8 md:px-16">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No posts yet.</p>
          ) : (
            <div className="space-y-12">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                    {post.title}
                  </h2>
                  {post.author && (
                    <p className="text-sm text-gray-400 mb-6">
                      By {post.author}
                    </p>
                  )}
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap mb-6">
                    {post.content}
                  </p>
                  {post.created_at && (
                    <p className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
