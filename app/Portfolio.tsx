"use client";

import { useEffect, useState } from "react";
import { content, experience } from "@/lib/content";

type Lang = "pt" | "en";

export default function Portfolio({ lang }: { lang: Lang }) {
  const t = content[lang];
  const [articles, setArticles] = useState<any[] | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      const initial = saved === "light" || saved === "dark" ? saved : prefersLight ? "light" : "dark";
      setTheme(initial);
      document.documentElement.dataset.theme = initial;
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=abraaom&per_page=6")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  const waUrl = `https://wa.me/5512981660131?text=${encodeURIComponent(t.waText)}`;

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top">
            <img src="/assets/images/Logo.svg" alt="" width={32} height={32} />
            <span>Abraão Moreira</span>
          </a>
          <nav aria-label="Menu">
            <a href="#work">{t.nav.work}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#articles">{t.nav.articles}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <button
            className="theme"
            type="button"
            aria-label={t.themeLabel}
            title={t.themeLabel}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <span className="moon" aria-hidden="true">☾</span>
            <span className="sun" aria-hidden="true">☀</span>
          </button>
          <a className="lang" href={t.other} hrefLang={lang === "pt" ? "en" : "pt-BR"} lang={lang === "pt" ? "en" : "pt-BR"} title={t.otherName}>
            <span className="on">{lang === "pt" ? "PT" : "EN"}</span> / {t.otherLabel}
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap">
          <p className="kicker">{t.kicker}</p>
          <h1>{t.h1}</h1>
          <p className="lead">{t.lead}</p>
          <div className="ctas">
            <a className="btn" href="#work">{t.cta1}</a>
            <a className="btn ghost" href="#contact">{t.cta2}</a>
          </div>
          <ul className="chips">
            <li>React</li><li>Next.js</li><li>Node.js</li><li>TypeScript</li><li>PostgreSQL</li><li>MQL5</li>
          </ul>
        </section>

        <section id="services" className="wrap">
          <h2>{t.servicesH}</h2>
          <div className="grid3">
            {t.services.map((s) => (
              <article key={s.h} className="card">
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="wrap">
          <h2>{t.workH}</h2>
          <p className="sub">{t.workP}</p>
          <div className="grid2">
            {t.projects.map((p) => (
              <article key={p.h} className="card project">
                <span className="tag">{p.tag}</span>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
                <p className="stack"><span>Stack:</span> {p.stack}</p>
                <a className="link" href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.visit ? t.visit : t.demo} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
          <h2 className="mt">{t.mqlH}</h2>
          <p className="sub">{t.mqlP}</p>
          <div className="grid3">
            {t.mql.map((m) => (
              <a key={m.h} className="card mql" href={m.url} target="_blank" rel="noopener noreferrer">
                <h3>{m.h}</h3>
                <p>{m.p}</p>
                <span className="link">{t.open} ↗</span>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="wrap about">
          <img src="https://avatars.githubusercontent.com/u/49653939?v=4" alt="Abraão Moreira" width={220} height={220} loading="lazy" />
          <div>
            <h2>{t.aboutH}</h2>
            {t.about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>

        <section id="experience" className="wrap">
          <h2>{t.expH}</h2>
          <ol className="exp">
            {experience.map((e, i) => (
              <li key={i}>
                <span className="when">{e.from} – {e.to || t.now}</span>
                <div>
                  <h3>{lang === "pt" ? e.pt : e.en}</h3>
                  <p>{e.stack}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="muted langs">{t.langs}</p>
        </section>

        <section id="articles" className="wrap">
          <h2>{t.articlesH}</h2>
          <div id="articles-list" className="grid3">
            {articles === null ? (
              <p className="muted">{t.articlesLoading}</p>
            ) : articles.length === 0 ? (
              <p className="muted">{t.articlesErr}</p>
            ) : (
              articles.map((a) => (
                <a key={a.id} className="card article" href={a.url} target="_blank" rel="noopener noreferrer">
                  {a.cover_image && <img src={a.cover_image} alt="" loading="lazy" />}
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                </a>
              ))
            )}
          </div>
          <p><a className="link" href="https://dev.to/abraaom" target="_blank" rel="noopener noreferrer">{t.articlesMore} ↗</a></p>
        </section>

        <section id="contact" className="wrap contact">
          <h2>{t.contactH}</h2>
          <p>{t.contactP}</p>
          <div className="ctas">
            <a className="btn" href="mailto:contato@abraaomoreira.dev">contato@abraaomoreira.dev</a>
            <a className="btn ghost" href={waUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <p className="social">
            <a href="https://www.linkedin.com/in/abraao-moreira/" target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{" "}
            <a href="https://github.com/AbraaoM" target="_blank" rel="noopener noreferrer">GitHub</a> ·{" "}
            <a href="https://www.mql5.com/en/users/abraao.moreira/seller" target="_blank" rel="noopener noreferrer">MQL5</a> ·{" "}
            <a href="https://dev.to/abraaom" target="_blank" rel="noopener noreferrer">DEV</a> ·{" "}
            <a href="https://x.com/abraaomoreira_" target="_blank" rel="noopener noreferrer">X</a> ·{" "}
            <a href="https://www.instagram.com/abraaomoreira.dev/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </section>
      </main>

      <footer className="wrap foot">{t.footer}</footer>
    </>
  );
}
