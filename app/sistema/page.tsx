"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PASSWORD = process.env.NEXT_PUBLIC_SISTEMA_PASSWORD || "sistema2026";

export default function SistemaPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sistema_session="));
    if (session) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      document.cookie = "sistema_session=1; path=/; max-age=86400; SameSite=Lax";
      setAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta");
    }
  };

  const handleLogout = () => {
    document.cookie = "sistema_session=; path=/; max-age=0";
    setAuthenticated(false);
    setPassword("");
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", color: "var(--fg)" }}>
        Carregando...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", color: "var(--fg)", padding: "20px" }}>
        <form
          onSubmit={handleLogin}
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "14px",
            padding: "40px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h1 style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: "2rem", marginBottom: "8px" }}>Área Interna</h1>
          <p style={{ color: "var(--muted)", marginBottom: "24px" }}>Acesso restrito</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              background: "var(--bg)",
              color: "var(--fg)",
              fontSize: "1rem",
              marginBottom: "16px",
            }}
          />
          {error && <p style={{ color: "#f87171", marginBottom: "12px", fontSize: "0.9rem" }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              background: "var(--accent)",
              color: "#04201c",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)" }}>
      <header style={{ borderBottom: "1px solid var(--line)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: "1.5rem" }}>Sistema Interno</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid var(--line)",
            background: "transparent",
            color: "var(--fg)",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </header>
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <h2 style={{ fontFamily: "Anton, Impact, sans-serif", marginBottom: "16px" }}>Bem-vindo</h2>
        <p style={{ color: "var(--muted)", marginBottom: "32px" }}>
          Esta é a área interna do sistema. Aqui você pode adicionar ferramentas, dashboards ou conteúdos privados.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "18px" }}>
          <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", padding: "24px" }}>
            <h3 style={{ marginBottom: "8px" }}>Exemplo de módulo</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Placeholder para funcionalidades futuras.</p>
          </div>
          <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", padding: "24px" }}>
            <h3 style={{ marginBottom: "8px" }}>Outro módulo</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Adicione o que precisar aqui.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
