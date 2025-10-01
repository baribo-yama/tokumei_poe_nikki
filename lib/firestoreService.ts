import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import type { Post } from "@/types/post";

// 投稿を作成
export async function createPost(text: string) {
  if (!text.trim()) return;
  await addDoc(collection(db, "posts"), {
    text,
    created_at: serverTimestamp(),
  });
}

// 投稿を削除
export async function deletePost(id: string) {
  await deleteDoc(doc(db, "posts", id));
}

// 投稿を購読（リアルタイム反映）
export function subscribePosts(callback: (posts: Post[]) => void) {
  const q = query(collection(db, "posts"), orderBy("created_at", "desc"));
  return onSnapshot(q, (snapshot) => {
    const posts: Post[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,
        created_at: data.created_at && typeof data.created_at.toDate === 'function'
          ? data.created_at.toDate()
          : undefined,
      };
    });
    callback(posts);
  });
}
