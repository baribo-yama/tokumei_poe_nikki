"use client";

import { useEffect, useState } from "react";
import { subscribePosts, deletePost } from "@/lib/firestoreService";
import type { Post } from "@/types/post";

export default function Timeline() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = subscribePosts(setPosts);
    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-6 space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border p-3 rounded bg-white flex justify-between items-center"
        >
          <span>{post.text}</span>
          <button
            onClick={() => deletePost(post.id)}
            className="text-sm text-red-500"
          >
            削除
          </button>
        </div>
      ))}
    </div>
  );
}
