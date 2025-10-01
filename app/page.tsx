import PostForm from "./components/PostForm";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold">匿名ポエ日記</h1>
      <PostForm />
      <Timeline />
    </main>
  );
}
