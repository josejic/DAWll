"use client";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FileText, Plus, Pencil, Trash2, X, AlertTriangle, Tag } from "lucide-react";


const TOTAL_CATEGORIAS_CSS = 8;
const DICA_VAZIA = { titulo: "", categoria: "", descricao: "", contemo: "" };

function getIndiceCategoria(categoria) {
  if (!categoria) return 1;
  let hash = 0;
  for (let i = 0; i < categoria.length; i++) {
    hash = categoria.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash) % TOTAL_CATEGORIAS_CSS) + 1;
}

// 1. Componente de Card isolado para simplificar o loop da lista
function DicaCard({ dica, onEdit, onDelete }) {
  const index = getIndiceCategoria(dica.categoria);
  const accent = `var(--color-cat-${index})`;
  const bg = `var(--bg-cat-${index})`;

  return (
    <div className="dica-card" style={{ "--dica-accent": accent, "--dica-accent-bg": bg }}>
      <div className="dica-card-top">
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div className="dica-icon" style={{ backgroundColor: bg, color: accent }}>
            <FileText size={18} />
          </div>
          <div className="dica-tags">
            <span className="dica-tag dica-tag--categoria" style={{ backgroundColor: bg, color: accent }}>
              {dica.categoria}
            </span>
          </div>
        </div>

        <div className="dica-card-actions">
          <button className="dica-action-btn" onClick={() => onEdit(dica)} aria-label={`Editar "${dica.titulo}"`}>
            <Pencil size={15} />
          </button>
          <button className="dica-action-btn dica-action-btn--delete" onClick={() => onDelete(dica.id)} aria-label={`Excluir "${dica.titulo}"`}>
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
}

// 2. Componente Modal do Formulário (Evita re-renderizar a página a cada tecla digitada)
function DicaModal({ modal, onClose, onSave }) {
  const [form, setForm] = useState(modal.dica || DICA_VAZIA);
  const [salvando, setSalvando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo.trim()) return;
    setSalvando(true);
    await onSave(form, modal.mode, modal.id);
    setSalvando(false);
  };

  return (
    <div className="dicas-modal-overlay" onClick={onClose}>
      <form className="dicas-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="dicas-modal-head">
          <h2 className="dicas-modal-title">{modal.mode === "novo" ? "Nova Dica" : "Editar Dica"}</h2>
          <button type="button" className="dicas-modal-close" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <div className="dicas-field">
          <label htmlFor="categoria">Categoria</label>
          <input id="categoria" name="categoria" className="dicas-input" placeholder="Ex.: Investimento..." value={form.categoria} onChange={handleChange} />
        </div>

        <div className="dicas-field">
          <label htmlFor="titulo">Título</label>
          <input id="titulo" name="titulo" className="dicas-input" placeholder="Título da dica" value={form.titulo} onChange={handleChange} required />
        </div>

        <div className="dicas-field">
          <label htmlFor="descricao">Descrição curta</label>
          <textarea id="descricao" name="descricao" className="dicas-textarea" placeholder="Texto curto..." value={form.descricao} onChange={handleChange} />
        </div>

        <div className="dicas-field">
          <label htmlFor="contemo">Conteúdo completo</label>
          <textarea id="contemo" name="contemo" className="dicas-textarea" placeholder="Conteúdo completo..." value={form.contemo} onChange={handleChange} />
        </div>

        <div className="dicas-modal-actions">
          <button type="button" className="dicas-btn-secondary" onClick={onClose} disabled={salvando}>Cancelar</button>
          <button type="submit" className="dicas-btn-primary" disabled={salvando}>
            {salvando ? "Salvando..." : modal.mode === "novo" ? "Criar dica" : "Salvar alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}

// 3. Componente principal simplificado
export default function DicasPage() {
  const [dicas, setDicas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState("todos");
  const [modal, setModal] = useState(null); // { mode: "novo" | "editar", id?, dica? }
  const [excluirId, setExcluirId] = useState(null);

  useEffect(() => {
    buscarDicas();
  }, []);

  async function buscarDicas() {
    setCarregando(true);
    const { data, error } = await supabase.from("dicas").select().order("created_at", { ascending: false });

    if (error) setErro(error.message);
    else setDicas(data || []);
    
    setCarregando(false);
  }

  const categorias = useMemo(() => Array.from(new Set(dicas.map((d) => d.categoria).filter(Boolean))), [dicas]);

  const dicasFiltradas = useMemo(() => {
    return filtro === "todos" ? dicas : dicas.filter((d) => d.categoria === filtro);
  }, [dicas, filtro]);

  async function handleSalvarDica(formData, mode, id) {
    if (mode === "novo") {
      const { data, error } = await supabase.from("dicas").insert([formData]).select();
      if (!error && data) setDicas((prev) => [data[0], ...prev]);
    } else {
      const { data, error } = await supabase.from("dicas").update(formData).eq("id", id).select();
      if (!error && data) setDicas((prev) => prev.map((d) => (d.id === id ? data[0] : d)));
    }
    setModal(null);
  }

  async function handleExcluirDica(id) {
    const { error } = await supabase.from("dicas").delete().eq("id", id);
    if (!error) {
      setDicas((prev) => prev.filter((d) => d.id !== id));
      setExcluirId(null);
    }
  }

  if (carregando) return <div><h1 className="admin-page-title">Dicas Financeiras</h1><p className="admin-page-subtitle">Carregando...</p></div>;
  if (erro) return <div><h1 className="admin-page-title">Dicas Financeiras</h1><p className="admin-page-subtitle">Erro: {erro}</p></div>;

  const dicaParaExcluir = dicas.find((d) => d.id === excluirId);

  return (
    <div>
      {/* Cabeçalho */}
      <div className="dicas-page-head">
        <div>
          <h1 className="admin-page-title">Dicas Financeiras</h1>
          <p className="admin-page-subtitle" style={{ marginBottom: 0 }}>Gerencie as dicas exibidas no app</p>
        </div>
        <button className="dicas-add-btn" onClick={() => setModal({ mode: "novo" })}>
          <Plus size={17} /> Nova Dica
        </button>
      </div>

      {/* Estatísticas */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon"><FileText size={17} /></div>
          <div className="admin-stat-value">{dicas.length}</div>
          <div className="admin-stat-label">Total de dicas</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon"><Tag size={17} /></div>
          <div className="admin-stat-value">{categorias.length}</div>
          <div className="admin-stat-label">Categorias</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="dicas-tabs">
        <button className={`dicas-tab ${filtro === "todos" ? "dicas-tab--active" : ""}`} onClick={() => setFiltro("todos")}>
          Todos ({dicas.length})
        </button>
        {categorias.map((cat) => {
          const index = getIndiceCategoria(cat);
          return (
            <button key={cat} className={`dicas-tab ${filtro === cat ? "dicas-tab--active" : ""}`} onClick={() => setFiltro(cat)}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: `var(--color-cat-${index})`, marginRight: 6 }} />
              {cat}
            </button>
          );
        })}
      </div>

      {/* Listagem */}
      <div className="dicas-grid">
        {dicasFiltradas.length === 0 ? (
          <div className="dicas-empty">Nenhuma dica encontrada para este filtro.</div>
        ) : (
          dicasFiltradas.map((dica) => (
            <DicaCard
              key={dica.id}
              dica={dica}
              onEdit={(d) => setModal({ mode: "editar", id: d.id, dica: d })}
              onDelete={setExcluirId}
            />
          ))
        )}
      </div>

      {/* Modais */}
      {modal && <DicaModal modal={modal} onClose={() => setModal(null)} onSave={handleSalvarDica} />}

      {excluirId && (
        <div className="dicas-modal-overlay" onClick={() => setExcluirId(null)}>
          <div className="dicas-modal dicas-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="dicas-confirm-icon"><AlertTriangle size={20} /></div>
            <h2 className="dicas-modal-title" style={{ marginBottom: "0.5rem" }}>Excluir dica?</h2>
            <p className="dicas-confirm-text">Tem certeza que deseja excluir "{dicaParaExcluir?.titulo}"?</p>
            <div className="dicas-modal-actions">
              <button className="dicas-btn-secondary" onClick={() => setExcluirId(null)}>Cancelar</button>
              <button className="dicas-btn-danger" onClick={() => handleExcluirDica(excluirId)}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}