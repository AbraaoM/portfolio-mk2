import Portfolio from "./Portfolio";
import { content } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: content.pt.title,
  description: content.pt.desc,
  alternates: {
    canonical: "https://www.abraaomoreira.dev/",
    languages: {
      "pt-BR": "https://www.abraaomoreira.dev/",
      en: "https://www.abraaomoreira.dev/en/",
      "x-default": "https://www.abraaomoreira.dev/en/",
    },
  },
  openGraph: {
    title: content.pt.title,
    description: content.pt.desc,
    url: "https://www.abraaomoreira.dev/",
    images: ["https://avatars.githubusercontent.com/u/49653939?v=4"],
  },
};

export default function Page() {
  return <Portfolio lang="pt" />;
}
