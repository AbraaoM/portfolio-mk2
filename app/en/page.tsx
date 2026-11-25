import Portfolio from "../Portfolio";
import { content } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: content.en.title,
  description: content.en.desc,
  alternates: {
    canonical: "https://www.abraaomoreira.dev/en/",
    languages: {
      "pt-BR": "https://www.abraaomoreira.dev/",
      en: "https://www.abraaomoreira.dev/en/",
      "x-default": "https://www.abraaomoreira.dev/en/",
    },
  },
  openGraph: {
    title: content.en.title,
    description: content.en.desc,
    url: "https://www.abraaomoreira.dev/en/",
    images: ["https://avatars.githubusercontent.com/u/49653939?v=4"],
  },
};

export default function EnPage() {
  return <Portfolio lang="en" />;
}
