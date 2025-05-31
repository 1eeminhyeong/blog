"use client"

import { createRef, useEffect } from "react";

export function Utterances() {
  const root = createRef<HTMLDivElement>()

  useEffect(() => {
    const element = document.createElement("script");

    element.setAttribute("src", "https://utteranc.es/client.js");
    element.setAttribute("repo", "1eeminhyeong/blog");
    element.setAttribute("issue-term", "pathname");
    element.setAttribute("label", "comment");
    element.setAttribute("theme", "github-light");
    element.setAttribute("crossorigin", "anonymous");
    element.async = true;

    root.current?.appendChild(element);
  }, []);

  return <div ref={root} />
}