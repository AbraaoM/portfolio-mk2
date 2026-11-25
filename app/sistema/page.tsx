"use client";

import { useEffect, useState } from "react";

const PASSWORD = process.env.NEXT_PUBLIC_SISTEMA_PASSWORD || "sistema2026";

type Project = {
  id: string;
  name: string;
  client: string;
  value: number;
  deadline: string;
  estimateDays: number;
  status: "prospeccao" | "em_andamento" | "entregue" | "cancelado";
  progress: number;
  notes?: string;
};

const STATUS_LABEL: Record<Project["status"], string> = {
  prospeccao: "Prospecção",
  em_andamento: "Em andamento",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export default function SistemaPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const [form, setForm] = useState({
    name: "",
    client: "",
    value: "",
    deadline: "",
    estimateDays: "",
    status: "em_andamento" as Project["status"],
    progress: "0",
    notes: "",
  });

  useEffect(() => {
    const session = document.cookie.split("; ").find((row) => row.startsWith("sistema_session="));
    if (session) setAuthenticated(true);
    setLoading(false);

    try {
      const saved = localStorage.getItem("sistema_projects");
      if (saved) setProjects(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (projects.length) {
      localStorage.setItem("sistema_projects", JSON.stringify(projects));
    }
  }, [projects]);

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

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", client: "", value: "", deadline: "", estimateDays: "", status: "em_andamento", progress: "0", notes: "" });
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      name: p.name,
      client: p.client,
      value: String(p.value),
      deadline: p.deadline,
      estimateDays: String(p.estimateDays),
      status: p.status,
      progress: String(p.progress),
      notes: p.notes || "",
    });
    setShowForm(true);
  };

  const saveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: editing?.id || crypto.randomUUID(),
      name: form.name,
      client: form.client,
      value: Number(form.value) || 0,
      deadline: form.deadline,
      estimateDays: Number(form.estimateDays) || 0,
      status: form.status,
      progress: Math.min(100, Math.max(0, Number(form.progress) || 0)),
      notes: form.notes,
    };

    if (editing) {
      setProjects(projects.map((p) => (p.id === editing.id ? project : p)));
    } else {
      setProjects([...projects, project]);
    }
    setShowForm(false);
  };

  const deleteProject = (id: string) => {
    if (confirm("Remover este projeto?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const totalValue = projects.reduce((sum, p) => sum + (p.status !== "cancelado" ? p.value : 0), 0);
  const active = projects.filter((p) => p.status === "em_andamento").length;
  const upcoming = projects.filter((p) => {
    if (!p.deadline || p.status === "entregue" || p.status === "cancelado") return false;
    const days = (new Date(p.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days >= 0 && days <= 14;
  }).length;
  const avgProgress = projects.length
    ? Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length)
    : 0;

  if (loading) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", color: "var(--fg)" }}>Carregando...</div>;
  }

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", color: "var(--fg)", padding: "20px" }}>
        <form onSubmit={handleLogin} style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", padding: "40px", width: "100%", maxWidth: "400px" }}>
          <h1 style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: "2rem", marginBottom: "8px" }}>Área Interna</h1>
          <p style={{ color: "var(--muted)", marginBottom: "24px" }}>Acesso restrito</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid var(--line)", background: "var(--bg)", color: "var(--fg)", fontSize: "1rem", marginBottom: "16px" }} />
          {error && <p style={{ color: "#f87171", marginBottom: "12px", fontSize: "0.9rem" }}>{error}</p>}
          <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "10px", background: "var(--accent)", color: "#04201c", fontWeight: 600, border: "none", cursor: "pointer", fontSize: "1rem" }}>Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)" }}>
      <header style={{ borderBottom: "1px solid var(--line)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: "1.5rem" }}>Gestão de Projetos</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={openNew} style={{ padding: "8px 16px", borderRadius: "8px", background: "var(--accent)", color: "#04201c", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Novo Projeto</button>
          <button onClick={handleLogout} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid var(--line)", background: "transparent", color: "var(--fg)", cursor: "pointer" }}>Sair</button>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", padding: "20px" }}>
            <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Valor total (ativo)</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, marginTop: "4px" }}>R$ {totalValue.toLocaleString("pt-BR")}</div>
          </div>
          <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", padding: "20px" }}>
            <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Em andamento</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, marginTop: "4px" }}>{active}</div>
          </div>
          <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", padding: "20px" }}>
            <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Prazos próximos (14d)</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, marginTop: "4px" }}>{upcoming}</div>
          </div>
          <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", padding: "20px" }}>
            <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Progresso médio</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, marginTop: "4px" }}>{avgProgress}%</div>
          </div>
        </div>

        <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)", fontWeight: 600 }}>Projetos</div>
          {projects.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>Nenhum projeto cadastrado. Clique em "+ Novo Projeto".</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
                <thead>
                  <tr style={{ background: "var(--bg)", textAlign: "left" }}>
                    <th style={{ padding: "12px 16px" }}>Projeto</th>
                    <th style={{ padding: "12px 16px" }}>Cliente</th>
                    <th style={{ padding: "12px 16px" }}>Valor</th>
                    <th style={{ padding: "12px 16px" }}>Prazo</th>
                    <th style={{ padding: "12px 16px" }}>Estimativa</th>
                    <th style={{ padding: "12px 16px" }}>Status</th>
                    <th style={{ padding: "12px 16px" }}>Progresso</th>
                    <th style={{ padding: "12px 16px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: "12px 16px" }}>{p.client || "—"}</td>
                      <td style={{ padding: "12px 16px" }}>R$ {p.value.toLocaleString("pt-BR")}</td>
                      <td style={{ padding: "12px 16px" }}>{p.deadline ? new Date(p.deadline).toLocaleDateString("pt-BR") : "—"}</td>
                      <td style={{ padding: "12px 16px" }}>{p.estimateDays} dias</td>
                      <td style={{ padding: "12px 16px" }}>{STATUS_LABEL[p.status]}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ flex: 1, height: "6px", background: "var(--line)", borderRadius: "99px", overflow: "hidden" }}>
                            <div style={{ width: `${p.progress}%`, height: "100%", background: "var(--accent)" }} />
                          </div>
                          <span style={{ fontSize: "0.85rem" }}>{p.progress}%</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                        <button onClick={() => openEdit(p)} style={{ marginRight: "8px", padding: "4px 10px", borderRadius: "6px", border: "1px solid var(--line)", background: "transparent", color: "var(--fg)", cursor: "pointer", fontSize: "0.85rem" }}>Editar</button>
                        <button onClick={() => deleteProject(p.id)} style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid #f87171", background: "transparent", color: "#f87171", cursor: "pointer", fontSize: "0.85rem" }}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 50 }} onClick={() => setShowForm(false)}>
          <form onSubmit={saveProject} onClick={(e) => e.stopPropagation()} style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "14px", padding: "28px", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontFamily: "Anton, Impact, sans-serif", marginBottom: "20px" }}>{editing ? "Editar Projeto" : "Novo Projeto"}</h2>
            <div style={{ display: "grid", gap: "14px" }}>
              <input required placeholder="Nome do projeto" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
              <input placeholder="Cliente" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} style={inputStyle} />
              <input required type="number" placeholder="Valor (R$)" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} style={inputStyle} />
              <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} style={inputStyle} />
              <input type="number" placeholder="Estimativa (dias)" value={form.estimateDays} onChange={(e) => setForm({ ...form, estimateDays: e.target.value })} style={inputStyle} />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Project["status"] })} style={inputStyle}>
                <option value="prospeccao">Prospecção</option>
                <option value="em_andamento">Em andamento</option>
                <option value="entregue">Entregue</option>
                <option value="cancelado">Cancelado</option>
              </select>
              <input type="number" min="0" max="100" placeholder="Progresso (%)" value={form.progress} onChange={(e) => setForm({ ...form, progress: e.target.value })} style={inputStyle} />
              <textarea placeholder="Observações" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button type="submit" style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "var(--accent)", color: "#04201c", fontWeight: 600, border: "none", cursor: "pointer" }}>Salvar</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid var(--line)", background: "transparent", color: "var(--fg)", cursor: "pointer" }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid var(--line)",
  background: "var(--bg)",
  color: "var(--fg)",
  fontSize: "0.95rem",
};
