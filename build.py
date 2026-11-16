#!/usr/bin/env python3
"""Gera refactor/index.html (PT) e refactor/en/index.html (EN) a partir de um template único."""
import html, pathlib, sys

ROOT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "refactor")
SITE = "https://www.abraaomoreira.dev"
WA = "https://wa.me/5512981660131"
EMAIL = "contato@abraaomoreira.dev"

PROJECTS = [
  # key, url, kind
  ("edila", "https://simplifyedila.vercel.app", "SIMPLIFY"),
  ("ateste", "https://simplify-ateste.vercel.app", "SIMPLIFY"),
  ("barber", "https://barbearia.abraaomoreira.dev", "SIMPLIFY"),
  ("clarear", "https://clareargov.com.br", "SIMPLIFY"),
]
SIDE = [
  ("babymanual", "https://babymanual.abraaomoreira.dev", "babymanual.svg"),
  ("tfox", "https://t-fox.abraaomoreira.dev", "t-fox.svg"),
  ("flashedit", "https://flashedit.abraaomoreira.dev", "flashedit.svg"),
  ("runit", "https://runit.abraaomoreira.dev", "runit.svg"),
]

T = {
 "pt": {
  "lang": "pt-BR", "other": "en", "other_label": "EN", "other_name": "English",
  "title": "Abraão Moreira | Desenvolvedor Full-Stack (React, Next.js, Node.js) e Automação",
  "desc": "Desenvolvedor full-stack: aplicações web em React, Next.js, Node.js e TypeScript, automação de processos e ferramentas MQL5 para MetaTrader 5.",
  "nav_work": "Projetos", "nav_services": "Serviços", "nav_about": "Sobre", "nav_articles": "Artigos", "nav_contact": "Contato",
  "kicker": "Desenvolvedor full-stack · Automações e MQL5",
  "h1": "Tecnologia simples. Valor real para o seu trabalho.",
  "lead": "Construo sistemas web, integrações e automações que deixam o trabalho do dia a dia mais simples, de aplicações em Next.js e login único a ferramentas MQL5 para MetaTrader 5. Trabalho direto com o cliente, do primeiro requisito ao suporte em produção.",
  "cta1": "Ver projetos", "cta2": "Falar comigo",
  "services_h": "O que eu faço",
  "s1_h": "Aplicações web", "s1_p": "Do banco de dados à interface: SaaS, painéis administrativos, sistemas multiempresa e sites, com React, Next.js, Node.js, TypeScript e PostgreSQL.",
  "s2_h": "Automação de processos", "s2_p": "Integrações, bots e ferramentas internas que tiram trabalho manual da rotina e reduzem erros.",
  "s3_h": "MQL5 / MetaTrader 5", "s3_p": "Expert Advisors, indicadores, painéis e bibliotecas em MQL5, incluindo a biblioteca open source mql-simplify.",
  "work_h": "Projetos em destaque",
  "work_p": "Produtos que desenvolvi na SIMPLIFY, minha software house. Os links abrem versões de demonstração, com dados fictícios.",
  "demo": "Abrir demonstração", "visit": "Visitar site",
  "edila_tag": "CMS multi-tenant", "edila_h": "Edila",
  "edila_p": "Gerenciador de conteúdo para prefeituras, câmaras e autarquias: páginas e notícias, biblioteca de mídia, fluxo editorial com revisão, histórico de versões, papéis de usuário e auditoria.",
  "ateste_tag": "Prestação de contas", "ateste_h": "Ateste",
  "ateste_p": "Monta e confere a prestação de contas do terceiro setor no padrão JSON Fase V do TCESP (AUDESP), validando o arquivo contra o schema e as regras do manual antes do envio.",
  "barber_tag": "SaaS de agendamento", "barber_h": "Barbearias",
  "barber_p": "Agendamento online para barbearias: página pública da casa, escolha de serviço, barbeiro e horário, link para cancelar ou remarcar e painel da equipe.",
  "clarear_tag": "Site institucional", "clarear_h": "Clarear",
  "clarear_p": "Site institucional da Clarear, marca da SIMPLIFY para tecnologia na gestão pública. Página estática, rápida e responsiva.",
  "stack": "Stack",
  "mql_h": "MQL5 e open source",
  "mql_p": "Publico bibliotecas e ferramentas para MetaTrader 5 e mantenho meu código no GitHub.",
  "mql1_h": "mql-simplify", "mql1_p": "Biblioteca open source em MQL5 para simplificar o desenvolvimento de Expert Advisors.",
  "mql2_h": "Produtos no MQL5 Market", "mql2_p": "Ferramentas para MetaTrader 5 publicadas no meu perfil de vendedor no MQL5.",
  "mql3_h": "GitHub", "mql3_p": "Repositórios públicos com projetos web, MQL5, Python e automação.",
  "open": "Abrir",
  "side_h": "Projetos pessoais",
  "babymanual_p": "Saúde, desenvolvimento e memórias do bebê em um só lugar.", "babymanual_s": "Em desenvolvimento",
  "tfox_p": "Interface rápida e objetiva para tarefas do dia a dia.", "tfox_s": "No ar",
  "flashedit_p": "Editor leve para ajustar e publicar sem atrito.", "flashedit_s": "No ar",
  "runit_p": "Acompanhamento de tarefas e progresso com clareza.", "runit_s": "No ar",
  "about_h": "Sobre mim",
  "about_p1": "Sou o Abraão Moreira, desenvolvedor full-stack em Pindamonhangaba, Brasil (remoto, UTC-3). Há mais de cinco anos construo sistemas web, integrações e automações que tiram atrito do dia a dia.",
  "about_p2": "Hoje atuo no governo municipal como analista de TI e desenvolvedor, liderando projetos e integrações: migrei sistemas legados para Next.js, implantei login único com Keycloak e Active Directory e coordeno o trabalho com vários fornecedores. Os sistemas novos saem com testes automatizados, e também oriento quatro estagiários.",
  "about_p3": "Desde 2020 desenvolvo automações e ferramentas MQL4 e MQL5 para clientes do mercado financeiro. Antes, construí ERP e sistemas de gestão, uma interface de alto tráfego e software para o setor público na SNPS Group, na TIVIT e no Grupo Embras. Sou bacharel em Ciência e Tecnologia pela UNIFESP.",
  "exp_h": "Experiência", "langs": "Idiomas: português (nativo), inglês intermediário (leitura técnica), espanhol básico.", "now": "atual",
  "articles_h": "Artigos", "articles_loading": "Carregando artigos...", "articles_err": "Não foi possível carregar os artigos agora.", "articles_more": "Ver todos no DEV",
  "contact_h": "Vamos conversar?",
  "contact_p": "Conte o que você precisa construir. Respondo com uma proposta de escopo fechado.",
  "wa_text": "Olá Abraão! Vi seu portfólio e gostaria de conversar sobre um projeto.",
  "footer": "© 2026 Abraão Moreira.",
 },
 "en": {
  "lang": "en", "other": "pt", "other_label": "PT", "other_name": "Português",
  "title": "Abraão Moreira | Full-Stack Developer (React, Next.js, Node.js) & Automation",
  "desc": "Full-stack developer: web apps with React, Next.js, Node.js and TypeScript, process automation and MQL5 tools for MetaTrader 5.",
  "nav_work": "Work", "nav_services": "Services", "nav_about": "About", "nav_articles": "Articles", "nav_contact": "Contact",
  "kicker": "Full-stack Developer · Process Automation · MQL5 / MetaTrader 5",
  "h1": "Simple technology. Real value for your work.",
  "lead": "I build web systems, integrations, and automations that make daily work simpler, from Next.js applications and single sign-on to MQL5 tools for MetaTrader 5. I work directly with the client, from the first requirement through production support.",
  "cta1": "See my work", "cta2": "Get in touch",
  "services_h": "What I do",
  "s1_h": "Web applications", "s1_p": "From database to UI: SaaS products, admin dashboards, multi-tenant systems and websites, using React, Next.js, Node.js, TypeScript and PostgreSQL.",
  "s2_h": "Process automation", "s2_p": "Integrations, bots and internal tools that remove manual work and reduce errors.",
  "s3_h": "MQL5 / MetaTrader 5", "s3_p": "Expert Advisors, indicators, panels and libraries in MQL5, including the open-source mql-simplify library.",
  "work_h": "Featured work",
  "work_p": "Products I built at SIMPLIFY, my software studio. Links open demo versions with fictional data. The products target Brazilian clients, so their interfaces are in Portuguese.",
  "demo": "Open demo", "visit": "Visit site",
  "edila_tag": "Multi-tenant CMS", "edila_h": "Edila",
  "edila_p": "Content management system for city halls, city councils and public agencies: pages and news, media library, editorial workflow with review, version history, user roles and audit log.",
  "ateste_tag": "Compliance reporting", "ateste_h": "Ateste",
  "ateste_p": "Builds and checks nonprofit grant reports in the São Paulo State Audit Court (TCESP/AUDESP) Phase V JSON format, validating the file against the schema and the manual's rules before submission.",
  "barber_tag": "Booking SaaS", "barber_h": "Barbershops",
  "barber_p": "Online booking for barbershops: public shop page, choice of service, barber and time slot, cancel/reschedule link and a staff dashboard.",
  "clarear_tag": "Company website", "clarear_h": "Clarear",
  "clarear_p": "Website for Clarear, SIMPLIFY's brand for public-sector technology. Static, fast and responsive.",
  "stack": "Stack",
  "mql_h": "MQL5 & open source",
  "mql_p": "I publish libraries and tools for MetaTrader 5 and keep my code on GitHub.",
  "mql1_h": "mql-simplify", "mql1_p": "Open-source MQL5 library that simplifies Expert Advisor development.",
  "mql2_h": "MQL5 Market products", "mql2_p": "MetaTrader 5 tools published on my MQL5 seller profile.",
  "mql3_h": "GitHub", "mql3_p": "Public repositories with web, MQL5, Python and automation projects.",
  "open": "Open",
  "side_h": "Side projects",
  "babymanual_p": "A baby's health, milestones and memories in one place.", "babymanual_s": "In development",
  "tfox_p": "Fast, focused interface for everyday tasks.", "tfox_s": "Live",
  "flashedit_p": "Lightweight editor to tweak and publish without friction.", "flashedit_s": "Live",
  "runit_p": "Clear tracking of tasks and progress.", "runit_s": "Live",
  "about_h": "About me",
  "about_p1": "I'm Abraão Moreira, a full-stack developer in Pindamonhangaba, Brazil (remote, UTC-3). For more than five years I have built web systems, integrations, and automations that remove friction from everyday work.",
  "about_p2": "Today I work in municipal government as an IT analyst and software developer, leading projects and integrations: I have migrated legacy systems to Next.js, implemented single sign-on with Keycloak and Active Directory, and coordinated work with several vendors. New systems ship with automated tests, and I mentor four interns.",
  "about_p3": "Since 2020 I have developed MQL4 and MQL5 automations and decision-support tools for trading clients. Earlier I built ERP and management systems, a high-traffic front end, and public-sector software at SNPS Group, TIVIT, and Grupo Embras. I hold a B.Sc. in Science and Technology from UNIFESP.",
  "exp_h": "Experience", "langs": "Languages: Portuguese (native), English (intermediate, technical reading), Spanish (basic).", "now": "present",
  "articles_h": "Articles", "articles_loading": "Loading articles...", "articles_err": "Couldn't load articles right now.", "articles_more": "See all on DEV",
  "contact_h": "Let's talk",
  "contact_p": "Tell me what you need to build. I'll reply with a fixed-scope proposal.",
  "wa_text": "Hi Abraão! I saw your portfolio and would like to talk about a project.",
  "footer": "© 2026 Abraão Moreira.",
 },
}
EXP = [
 ("Analista de TI / Desenvolvedor · Governo municipal", "IT Analyst / Software Developer · Municipal government", "07/2024", None, "Next.js · Keycloak · OIDC/SSO · Active Directory · Grafana"),
 ("Desenvolvedor MQL (freelancer)", "MQL Developer (freelance)", "07/2020", None, "MQL4 · MQL5 · Python · AWS EC2 · MySQL"),
 ("Desenvolvedor full-stack · SNPS Group", "Full-stack Developer · SNPS Group", "03/2023", "07/2024", "Angular · TypeScript · .NET (C#) · SQL Server · RabbitMQ"),
 ("Desenvolvedor full-stack · TIVIT", "Full-stack Developer · TIVIT", "03/2022", "03/2023", "Angular · TypeScript · .NET (C#) · MySQL"),
 ("Front-end · Privacy", "Front-end Developer · Privacy", "11/2021", "03/2022", "Angular · RxJS"),
 ("Desenvolvedor de sistemas · Grupo Embras", "Systems Developer · Grupo Embras", "08/2021", "11/2021", "Ruby on Rails · PostgreSQL · Docker"),
 ("Front-end · CodeLab Unifesp", "Front-end Developer · CodeLab Unifesp", "01/2021", "11/2021", "React"),
]
STACKS = {"edila": "Next.js · React · TypeScript · Tailwind · PostgreSQL (Neon) · Vercel",
          "ateste": "Next.js · TypeScript · JSON Schema (Ajv) · Vitest · Vercel",
          "barber": "TanStack Start · React · Better Auth · PostgreSQL (Neon) · Vercel",
          "clarear": "HTML · Tailwind CSS · Netlify"}

def page(l):
    t = {k: (html.escape(v) if isinstance(v, str) else v) for k, v in T[l].items()}
    base = "" if l == "pt" else "../"
    self_url = SITE + ("/" if l == "pt" else "/en/")
    other_href = "en/" if l == "pt" else "../"
    from urllib.parse import quote
    wa = f"{WA}?text={quote(T[l]['wa_text'])}"
    cards = "".join(f"""
      <article class="card project">
        <span class="tag">{t[k+'_tag']}</span>
        <h3>{t[k+'_h']}</h3>
        <p>{t[k+'_p']}</p>
        <p class="stack"><span>{t['stack']}:</span> {html.escape(STACKS[k])}</p>
        <a class="link" href="{u}" target="_blank" rel="noopener noreferrer">{t['visit'] if k=='clarear' else t['demo']} <span aria-hidden="true">↗</span></a>
      </article>""" for k, u, _ in PROJECTS)
    side = "".join(f"""
      <a class="card side" href="{u}" target="_blank" rel="noopener noreferrer">
        <img src="{base}assets/images/products/{img}" alt="" loading="lazy" width="56" height="56">
        <div><h3>{k.replace('tfox','T-Fox').replace('babymanual','Baby Manual').replace('flashedit','FlashEdit').replace('runit','Runit')}</h3><p>{t[k+'_p']}</p><span class="status">{t[k+'_s']}</span></div>
      </a>""" for k, u, img in SIDE)
    mql = "".join(f"""
      <a class="card mql" href="{u}" target="_blank" rel="noopener noreferrer"><h3>{t[k+'_h']}</h3><p>{t[k+'_p']}</p><span class="link">{t['open']} ↗</span></a>""" for k, u in [
        ("mql1", "https://github.com/AbraaoM/mql-simplify"),
        ("mql2", "https://www.mql5.com/en/users/abraao.moreira/seller"),
        ("mql3", "https://github.com/AbraaoM")])
    exp = "".join(f"""
    <li><span class="when">{a} – {b or t['now']}</span><div><h3>{html.escape(pt if l=='pt' else en)}</h3><p>{html.escape(st)}</p></div></li>""" for pt, en, a, b, st in EXP)
    return f"""<!DOCTYPE html>
<html lang="{t['lang']}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{t['title']}</title>
<meta name="description" content="{t['desc']}">
<meta name="author" content="Abraão Moreira">
<link rel="canonical" href="{self_url}">
<link rel="alternate" hreflang="pt-BR" href="{SITE}/">
<link rel="alternate" hreflang="en" href="{SITE}/en/">
<link rel="alternate" hreflang="x-default" href="{SITE}/en/">
<meta property="og:type" content="website">
<meta property="og:title" content="{t['title']}">
<meta property="og:description" content="{t['desc']}">
<meta property="og:url" content="{self_url}">
<meta property="og:image" content="https://avatars.githubusercontent.com/u/49653939?v=4">
<link rel="icon" type="image/svg+xml" href="{base}assets/images/Logo.svg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{base}css/site.css">
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"Person","name":"Abraão Moreira","url":"{SITE}/","jobTitle":"Full-stack Developer","email":"mailto:contato@abraaomoreira.dev","alumniOf":"Universidade Federal de São Paulo","sameAs":["https://github.com/AbraaoM","https://www.linkedin.com/in/abraao-moreira/","https://www.mql5.com/en/users/abraao.moreira/seller","https://dev.to/abraaom"]}}</script>
</head>
<body>
<header class="nav">
  <div class="wrap nav-in">
    <a class="brand" href="#top"><img src="{base}assets/images/Logo.svg" alt="" width="32" height="32"><span>Abraão Moreira</span></a>
    <nav aria-label="Menu">
      <a href="#work">{t['nav_work']}</a><a href="#services">{t['nav_services']}</a><a href="#about">{t['nav_about']}</a><a href="#articles">{t['nav_articles']}</a><a href="#contact">{t['nav_contact']}</a>
    </nav>
    <a class="lang" href="{other_href}" hreflang="{T[t['other']]['lang']}" lang="{T[t['other']]['lang']}" data-lang="{t['other']}" title="{t['other_name']}"><span class="on">{'PT' if l=='pt' else 'EN'}</span> / {t['other_label']}</a>
  </div>
</header>
<main id="top">
<section class="hero wrap">
  <p class="kicker">{t['kicker']}</p>
  <h1>{t['h1']}</h1>
  <p class="lead">{t['lead']}</p>
  <div class="ctas"><a class="btn" href="#work">{t['cta1']}</a><a class="btn ghost" href="#contact">{t['cta2']}</a></div>
  <ul class="chips"><li>React</li><li>Next.js</li><li>Node.js</li><li>TypeScript</li><li>PostgreSQL</li><li>MQL5</li></ul>
</section>
<section id="services" class="wrap">
  <h2>{t['services_h']}</h2>
  <div class="grid3">
    <article class="card"><h3>{t['s1_h']}</h3><p>{t['s1_p']}</p></article>
    <article class="card"><h3>{t['s2_h']}</h3><p>{t['s2_p']}</p></article>
    <article class="card"><h3>{t['s3_h']}</h3><p>{t['s3_p']}</p></article>
  </div>
</section>
<section id="work" class="wrap">
  <h2>{t['work_h']}</h2>
  <p class="sub">{t['work_p']}</p>
  <div class="grid2">{cards}
  </div>
  <h2 class="mt">{t['mql_h']}</h2>
  <p class="sub">{t['mql_p']}</p>
  <div class="grid3">{mql}
  </div>
  <h2 class="mt">{t['side_h']}</h2>
  <div class="grid2">{side}
  </div>
</section>
<section id="about" class="wrap about">
  <img src="https://avatars.githubusercontent.com/u/49653939?v=4" alt="Abraão Moreira" width="220" height="220" loading="lazy">
  <div><h2>{t['about_h']}</h2><p>{t['about_p1']}</p><p>{t['about_p2']}</p><p>{t['about_p3']}</p></div>
</section>
<section id="experience" class="wrap">
  <h2>{t['exp_h']}</h2>
  <ol class="exp">{exp}
  </ol>
  <p class="muted langs">{t['langs']}</p>
</section>
<section id="articles" class="wrap">
  <h2>{t['articles_h']}</h2>
  <div id="articles-list" class="grid3" data-err="{t['articles_err']}"><p class="muted">{t['articles_loading']}</p></div>
  <p><a class="link" href="https://dev.to/abraaom" target="_blank" rel="noopener noreferrer">{t['articles_more']} ↗</a></p>
</section>
<section id="contact" class="wrap contact">
  <h2>{t['contact_h']}</h2>
  <p>{t['contact_p']}</p>
  <div class="ctas"><a class="btn" href="mailto:{EMAIL}">{EMAIL}</a><a class="btn ghost" href="{html.escape(wa)}" target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
  <p class="social"><a href="https://www.linkedin.com/in/abraao-moreira/" target="_blank" rel="noopener noreferrer">LinkedIn</a> · <a href="https://github.com/AbraaoM" target="_blank" rel="noopener noreferrer">GitHub</a> · <a href="https://www.mql5.com/en/users/abraao.moreira/seller" target="_blank" rel="noopener noreferrer">MQL5</a> · <a href="https://dev.to/abraaom" target="_blank" rel="noopener noreferrer">DEV</a> · <a href="https://x.com/abraaomoreira_" target="_blank" rel="noopener noreferrer">X</a> · <a href="https://www.instagram.com/abraaomoreira.dev/" target="_blank" rel="noopener noreferrer">Instagram</a></p>
</section>
</main>
<footer class="wrap foot">{t['footer']}</footer>
<script src="{base}js/site.js" defer></script>
</body>
</html>
"""

out = ROOT
(out / "en").mkdir(parents=True, exist_ok=True)
(out / "index.html").write_text(page("pt"), encoding="utf-8")
(out / "en" / "index.html").write_text(page("en"), encoding="utf-8")
print("ok")
