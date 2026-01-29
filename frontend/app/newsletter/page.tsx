"use client";

import { fetchWithAuth } from "@/lib/api";
import { useState, useEffect } from "react";

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/getPosts`,
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
    return <div className="text-center p-8">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Newsletter</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              {post.author && (
                <p className="text-sm text-gray-500 mb-3">By {post.author}</p>
              )}
              <p className="text-gray-700 whitespace-pre-wrap">
                {post.content}
              </p>
              {post.created_at && (
                <p className="text-sm text-gray-400 mt-4">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
