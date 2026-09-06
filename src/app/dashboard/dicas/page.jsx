"use client";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase"; // ajuste o caminho conforme sua estrutura real
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Tag,
} from "lucide-react";

// Campos alinhados com as colunas reais da tabela "dicas" no Supabase:
// id, titulo, descricao, categoria, created_at, contemo
const DICA_VAZIA = {
  titulo: "",
  categoria: "",
  descricao: "",
  contemo: "",
};

// Paleta de cores usada para diferenciar categorias visualmente.
// As cores em si vivem no CSS global (:root, em globals.css) como
// variáveis --color-cat-N / --bg-cat-N — aqui só referenciamos os nomes.
// Como as categorias vêm do banco (não são um enum fixo no código),
// a cor é escolhida por um hash do nome — assim a mesma categoria
// sempre recebe a mesma cor, mesmo que novas categorias sejam criadas depois.
const PALETA_CORES = [
  { accent: "var(--color-cat-1)", bg: "var(--bg-cat-1)" },
  { accent: "var(--color-cat-2)", bg: "var(--bg-cat-2)" },
  { accent: "var(--color-cat-3)", bg: "var(--bg-cat-3)" },
  { accent: "var(--color-cat-4)", bg: "var(--bg-cat-4)" },
  { accent: "var(--color-cat-5)", bg: "var(--bg-cat-5)" },
  { accent: "var(--color-cat-6)", bg: "var(--bg-cat-6)" },
  { accent: "var(--color-cat-7)", bg: "var(--bg-cat-7)" },
  { accent: "var(--color-cat-8)", bg: "var(--bg-cat-8)" },
];

function corParaCategoria(categoria) {
  if (!categoria) return PALETA_CORES[0];
  let hash = 0;
  for (let i = 0; i < categoria.length; i++) {
    hash = categoria.charCodeAt(i) + ((hash << 5) - hash);
  }
  const indice = Math.abs(hash) % PALETA_CORES.length;
  return PALETA_CORES[indice];
}

export default function DicasPage() {
  const [dicas, setDicas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState("todos");
  const [modal, setModal] = useState(null); // { mode: "novo" | "editar", id? }
  const [form, setForm] = useState(DICA_VAZIA);
  const [confirmarExclusaoId, setConfirmarExclusaoId] = useState(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    buscarDicas();
  }, []);

  async function buscarDicas() {
    setCarregando(true);
    const { data, error } = await supabase
      .from("dicas")
      .select()
      .order("created_at", { ascending: false });

    if (error) {
      setErro(error.message);
      setCarregando(false);
      return;
    }

    setDicas(data);
    setErro(null);
    setCarregando(false);
  }

  // Categorias extraídas dinamicamente dos dados reais (não existe tabela/tipo fixo)
  const categorias = useMemo(() => {
    const unicas = new Set(dicas.map((d) => d.categoria).filter(Boolean));
    return Array.from(unicas);
  }, [dicas]);

  const dicasFiltradas = useMemo(() => {
    if (filtro === "todos") return dicas;
    return dicas.filter((d) => d.categoria === filtro);
  }, [dicas, filtro]);

  function abrirModalNovo() {
    setForm(DICA_VAZIA);
    setModal({ mode: "novo" });
  }

  function abrirModalEditar(dica) {
    setForm({
      titulo: dica.titulo || "",
      categoria: dica.categoria || "",
      descricao: dica.descricao || "",
      contemo: dica.contemo || "",
    });
    setModal({ mode: "editar", id: dica.id });
  }

  function fecharModal() {
    setModal(null);
    setForm(DICA_VAZIA);
  }

  async function salvarDica(e) {
    e.preventDefault();
    if (!form.titulo.trim()) return;
    setSalvando(true);

    if (modal.mode === "novo") {
      const { data, error } = await supabase
        .from("dicas")
        .insert([form])
        .select();

      if (error) {
        console.error("Erro ao criar dica:", error.message);
        setSalvando(false);
        return;
      }
      setDicas((prev) => [data[0], ...prev]);
    } else {
      const { data, error } = await supabase
        .from("dicas")
        .update(form)
        .eq("id", modal.id)
        .select();

      if (error) {
        console.error("Erro ao editar dica:", error.message);
        setSalvando(false);
        return;
      }
      setDicas((prev) => prev.map((d) => (d.id === modal.id ? data[0] : d)));
    }

    setSalvando(false);
    fecharModal();
  }

  async function excluirDica(id) {
    const { error } = await supabase.from("dicas").delete().eq("id", id);

    if (error) {
      console.error("Erro ao excluir dica:", error.message);
      return;
    }
    setDicas((prev) => prev.filter((d) => d.id !== id));
    setConfirmarExclusaoId(null);
  }

  const dicaParaExcluir = dicas.find((d) => d.id === confirmarExclusaoId);

  if (carregando) {
    return (
      <div>
        <h1 className="admin-page-title">Dicas Financeiras</h1>
        <p className="admin-page-subtitle">Carregando dicas...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div>
        <h1 className="admin-page-title">Dicas Financeiras</h1>
        <p className="admin-page-subtitle">Erro ao carregar dicas: {erro}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div className="dicas-page-head">
        <div>
          <h1 className="admin-page-title">Dicas Financeiras</h1>
          <p className="admin-page-subtitle" style={{ marginBottom: 0 }}>
            Gerencie as dicas exibidas no app
          </p>
        </div>
        <button className="dicas-add-btn" onClick={abrirModalNovo}>
          <Plus size={17} />
          Nova Dica
        </button>
      </div>

      {/* Cards de estatística */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FileText size={17} />
          </div>
          <div className="admin-stat-value">{dicas.length}</div>
          <div className="admin-stat-label">Total de dicas</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Tag size={17} />
          </div>
          <div className="admin-stat-value">{categorias.length}</div>
          <div className="admin-stat-label">Categorias</div>
        </div>
      </div>

      {/* Filtros por categoria */}
      <div className="dicas-tabs">
        <button
          className={`dicas-tab ${filtro === "todos" ? "dicas-tab--active" : ""}`}
          onClick={() => setFiltro("todos")}
        >
          Todos ({dicas.length})
        </button>
        {categorias.map((cat) => {
          const cor = corParaCategoria(cat);
          return (
            <button
              key={cat}
              className={`dicas-tab ${filtro === cat ? "dicas-tab--active" : ""}`}
              onClick={() => setFiltro(cat)}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: cor.accent,
                  marginRight: 6,
                }}
              />
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grade de dicas */}
      <div className="dicas-grid">
        {dicasFiltradas.length === 0 && (
          <div className="dicas-empty">Nenhuma dica encontrada para este filtro.</div>
        )}

        {dicasFiltradas.map((dica) => {
          const cor = corParaCategoria(dica.categoria);
          return (
          <div
            key={dica.id}
            className="dica-card"
            style={{ "--dica-accent": cor.accent, "--dica-accent-bg": cor.bg }}
          >
            <div className="dica-card-top">
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div
                  className="dica-icon"
                  style={{ backgroundColor: cor.bg, color: cor.accent }}
                >
                  <FileText size={18} />
                </div>
                <div className="dica-tags">
                  <span
                    className="dica-tag dica-tag--categoria"
                    style={{ backgroundColor: cor.bg, color: cor.accent }}
                  >
                    {dica.categoria}
                  </span>
                </div>
              </div>

              <div className="dica-card-actions">
                <button
                  className="dica-action-btn"
                  onClick={() => abrirModalEditar(dica)}
                  aria-label={`Editar "${dica.titulo}"`}
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="dica-action-btn dica-action-btn--delete"
                  onClick={() => setConfirmarExclusaoId(dica.id)}
                  aria-label={`Excluir "${dica.titulo}"`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div className="dica-title">{dica.titulo}</div>
            <div className="dica-desc">{dica.descricao}</div>

            {dica.contemo && (
              <details className="dica-conteudo">
                <summary>Ver conteúdo completo</summary>
                <p>{dica.contemo}</p>
              </details>
            )}
          </div>
          );
        })}
      </div>

      {/* Modal de adicionar/editar */}
      {modal && (
        <div className="dicas-modal-overlay" onClick={fecharModal}>
          <form
            className="dicas-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={salvarDica}
          >
            <div className="dicas-modal-head">
              <h2 className="dicas-modal-title">
                {modal.mode === "novo" ? "Nova Dica" : "Editar Dica"}
              </h2>
              <button
                type="button"
                className="dicas-modal-close"
                onClick={fecharModal}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="dicas-field">
              <label htmlFor="dica-categoria">Categoria</label>
              <input
                id="dica-categoria"
                className="dicas-input"
                placeholder="Ex.: Investimento, Planejamento, Educação..."
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              />
            </div>

            <div className="dicas-field">
              <label htmlFor="dica-titulo">Título</label>
              <input
                id="dica-titulo"
                className="dicas-input"
                placeholder="Título da dica"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                required
              />
            </div>

            <div className="dicas-field">
              <label htmlFor="dica-descricao">Descrição curta</label>
              <textarea
                id="dica-descricao"
                className="dicas-textarea"
                placeholder="Texto que aparece no card da dica"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              />
            </div>

            <div className="dicas-field">
              <label htmlFor="dica-conteudo">Conteúdo completo</label>
              <textarea
                id="dica-conteudo"
                className="dicas-textarea"
                placeholder="Conteúdo completo da dica (opcional)"
                value={form.contemo}
                onChange={(e) => setForm({ ...form, contemo: e.target.value })}
              />
            </div>

            <div className="dicas-modal-actions">
              <button
                type="button"
                className="dicas-btn-secondary"
                onClick={fecharModal}
                disabled={salvando}
              >
                Cancelar
              </button>
              <button type="submit" className="dicas-btn-primary" disabled={salvando}>
                {salvando
                  ? "Salvando..."
                  : modal.mode === "novo"
                  ? "Criar dica"
                  : "Salvar alterações"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmação de exclusão */}
      {confirmarExclusaoId && (
        <div
          className="dicas-modal-overlay"
          onClick={() => setConfirmarExclusaoId(null)}
        >
          <div
            className="dicas-modal dicas-confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dicas-confirm-icon">
              <AlertTriangle size={20} />
            </div>
            <h2 className="dicas-modal-title" style={{ marginBottom: "0.5rem" }}>
              Excluir dica?
            </h2>
            <p className="dicas-confirm-text">
              Tem certeza que deseja excluir "{dicaParaExcluir?.titulo}"? Essa
              ação não pode ser desfeita.
            </p>
            <div className="dicas-modal-actions">
              <button
                className="dicas-btn-secondary"
                onClick={() => setConfirmarExclusaoId(null)}
              >
                Cancelar
              </button>
              <button
                className="dicas-btn-danger"
                onClick={() => excluirDica(confirmarExclusaoId)}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}