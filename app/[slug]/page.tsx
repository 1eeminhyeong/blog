import { readFile } from "fs/promises"

export default async function PostPage({ param }: { param: Promise<{ slug: string }> }) {
  const { slug } = await param
  const filename = "./public" + slug + "/index.md"

  const file = await readFile(filename, "utf8")
}
