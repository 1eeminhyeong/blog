import { getPosts, PostMatter } from "./posts"
import { sans } from "./fonts"
import Link from "next/link"

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="relative -top-[10px] flex flex-col gap-8">
      {posts.map((post) => (
        <Link
          key={post.slug}
          className="block py-4 hover:scale-[1.005] will-change-transform"
          href={"/" + post.slug + "/"}
        >
          <article>
            <PostTitle post={post} />
            <PostMeta post={post} />
            <PostSubtitle post={post} />
          </article>
        </Link>
      ))}
    </div>
  )
}

function PostTitle({ post }: { post: PostMatter }) {
  return (
    <h2
      className={[
        sans.className,
        "text-[28px] font-black leading-none mb-2",
        "bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent",
        "dark:from-purple-500 dark:to-purple-300",
      ].join(" ")}
    >
      {post.title}
    </h2>
  )
}

function PostMeta({ post }: { post: PostMatter }) {
  return (
    <p className="text-[13px] text-gray-700 dark:text-gray-300">
      {new Date(post.date).toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>
  )
}

function PostSubtitle({ post }: { post: PostMatter }) {
  return <p className="mt-1">{post.spoiler}</p>
}
