import type { Metadata } from "next"
import "./globals.css"
import { serif } from "./fonts"
import Link from "next/link"
import { HomeLink } from "./components/HomeLink"

export const metadata: Metadata = {
  title: "leveluper",
  description: "Personal Blog",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={serif.className}>
      <body className="mx-auto max-w-2xl bg-[--bg] px-5 py-12 text-[--text]">
        <header className="mb-14 flex flex-row place-content-between">
          <HomeLink />

          <span className="relative top-[4px] italic">
            by{" "}
            <Link href="https://github.com/1eeminhyeong" target="_blank">
              <img alt="Minhyeong Lee" src="/avi.jpg" className="relative -top-1 mx-1 inline h-8 w-8 rounded-full" />
            </Link>
          </span>
        </header>

        <main>{children}</main>
      </body>
    </html>
  )
}
