import { readFile } from "fs/promises"
import matter from "gray-matter"
import { sans } from "../fonts"
import { MDXRemote } from "next-mdx-remote-client/rsc"
import Link from "next/link"
import remarkSmartypants from "remark-smartypants"
import remarkGfm from "remark-gfm"
import { remarkMdxEvalCodeBlock } from "./mdx"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import "./markdown.css"
import { Utterances } from "../components/utterances"

type PromiseParams = { params: Promise<{ slug: string }> }

export default async function PostPage({ params }: PromiseParams) {
  const { slug } = await params
  const filename = "./public/" + slug + "/index.md"


  const file = await readFile(filename, "utf8")
  const { content, data } = matter(file)

  return (
    <article>
      <h1 className={[sans.className, "text-[40px] font-black leading-[44px] text-[--title]"].join(" ")}>
        {data.title}
      </h1>

      <p className="mt-2 text-[13px] text-gray-700 dark:text-gray-300">
        {new Date(data.date).toLocaleDateString("ko", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="markdown pt-5">
        <MDXRemote
          source={content}
          components={{
            a: Link,
            img: ({ src, ...rest }) => {
              if (src && !/^https?:\/\//.test(src)) {
                src = `/${slug}/${src}`
              }
              return <img src={src} {...rest} />
            },
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkSmartypants, remarkGfm, [remarkMdxEvalCodeBlock, filename]],
              rehypePlugins: [[rehypePrettyCode], [rehypeSlug], [rehypeAutolinkHeadings, {
                behavior: "wrap",
                properties: {
                  className: "linked-heading",
                  target: "_self",
                },
              },]]
            }
          }}
        />
      </div>

      <Utterances />
    </article>
  )
}

export async function generateMetadata({ params }: PromiseParams) {
  const { slug } = await params;
  const file = await readFile("./public/" + slug + "/index.md", "utf8");
  const { data } = matter(file);
  return {
    title: data.title,
    description: data.spoiler,
  };
}
