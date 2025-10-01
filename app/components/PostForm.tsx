"use client";

import { useState } from "react";
import { createPost } from "@/lib/firestoreService";

export default function PostForm() {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    await createPost(text);
    setText(""); // 投稿後は入力をクリア
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ポエムを書いてね"
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        投稿
      </button>
    </form>
  );
}
