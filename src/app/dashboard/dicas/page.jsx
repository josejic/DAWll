"use client"
import { useMemo, useState } from "react";
import {
  FileText,
  PlayCircle,
  HelpCircle,
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  X,
  Link as LinkIcon,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
// As classes .dicas-*, .dica-* e as variáveis --color-quiz/--bg-quiz
// já estão no style.css global (seção "10. DASHBOARD — PÁGINA DICAS
// FINANCEIRAS"). Nenhum import de CSS local é necessário aqui.

/**
 * Configuração visual e de ícone por tipo de dica.
 * "accent" / "accentBg" alimentam as variáveis CSS --dica-accent e
 * --dica-accent-bg usadas em dicas.css, então adicionar um novo tipo
 * aqui é o único lugar que precisa mudar.
 */
const TIPOS = {
  artigo: {
    label: "Artigo",
    Icon: FileText,
    accent: "var(--color-info)",
    accentBg: "var(--bg-info)",
  },
  video: {
    label: "Vídeo",
    Icon: PlayCircle,
    accent: "var(--color-danger)",
    accentBg: "var(--bg-danger)",
  },
  quiz: {
    label: "Quiz",
    Icon: HelpCircle,
    accent: "var(--color-quiz)",
    accentBg: "var(--bg-quiz)",
  },
  licao: {
    label: "Lição",
    Icon: BookOpen,
    accent: "var(--color-warning)",
    accentBg: "var(--bg-warning)",
  },
};

const DIFICULDADES = ["Baixa", "Média", "Alta"];

const DICAS_INICIAIS = [
  {
    id: 1,
    tipo: "artigo",
    categoria: "Ed. Financeira",
    dificuldade: "Baixa",
    titulo: "Controle seus gastos",
    descricao:
      "Anote todas as suas despesas por pelo menos 30 dias. Você vai se surpreender com para onde seu dinheiro vai.",
    videoUrl: "",
    ativa: true,
  },
  {
    id: 2,
    tipo: "video",
    categoria: "Dívidas",
    dificuldade: "Média",
    titulo: "Evite dívidas no cartão",
    descricao:
      "O cartão de crédito pode ter juros acima de 300% ao ano. Pague sempre o valor total da fatura.",
    videoUrl: "https://www.youtube.com/watch?v=exemplo",
    ativa: true,
  },
  {
    id: 3,
    tipo: "quiz",
    categoria: "Investimento",
    dificuldade: "Média",
    titulo: "Comece a investir cedo",
    descricao:
      "Quanto antes você começar a investir, maior será o efeito dos juros compostos no seu patrimônio a longo prazo.",
    videoUrl: "",
    ativa: true,
  },
  {
    id: 4,
    tipo: "artigo",
    categoria: "Planejamento",
    dificuldade: "Alta",
    titulo: "Regra 50-30-20",
    descricao:
      "Divida sua renda em 50% para necessidades, 30% para desejos e 20% para poupança e investimentos.",
    videoUrl: "",
    ativa: true,
  },
  {
    id: 5,
    tipo: "licao",
    categoria: "Economia",
    dificuldade: "Alta",
    titulo: "Fundo de Emergência",
    descricao:
      "Mantenha de 3 a 6 meses de despesas guardados em uma aplicação de alta liquidez como CDB ou Tesouro Selic.",
    videoUrl: "",
    ativa: true,
  },
];

const DICA_VAZIA = {
  tipo: "artigo",
  categoria: "",
  dificuldade: "Baixa",
  titulo: "",
  descricao: "",
  videoUrl: "",
  ativa: true,
};

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`dicas-switch ${checked ? "dicas-switch--on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="dicas-switch-knob" />
    </button>
  );
}

export default function DicasPage() {
  const [dicas, setDicas] = useState(DICAS_INICIAIS);
  const [iaApoiadoraAtiva, setIaApoiadoraAtiva] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const [modal, setModal] = useState(null); // { mode: "novo" | "editar", dica }
  const [form, setForm] = useState(DICA_VAZIA);
  const [confirmarExclusaoId, setConfirmarExclusaoId] = useState(null);

  const contagemPorTipo = useMemo(() => {
    const base = { artigo: 0, video: 0, quiz: 0, licao: 0 };
    dicas.forEach((d) => {
      base[d.tipo] = (base[d.tipo] || 0) + 1;
    });
    return base;
  }, [dicas]);

  const dicasFiltradas = useMemo(() => {
    if (filtro === "todos") return dicas;
    return dicas.filter((d) => d.tipo === filtro);
  }, [dicas, filtro]);

  function abrirModalNovo() {
    setForm(DICA_VAZIA);
    setModal({ mode: "novo" });
  }

  function abrirModalEditar(dica) {
    setForm({ ...dica });
    setModal({ mode: "editar", id: dica.id });
  }

  function fecharModal() {
    setModal(null);
    setForm(DICA_VAZIA);
  }

  function salvarDica(e) {
    e.preventDefault();
    if (!form.titulo.trim()) return;

    if (modal.mode === "novo") {
      const novaDica = { ...form, id: Date.now() };
      setDicas((prev) => [novaDica, ...prev]);
    } else {
      setDicas((prev) =>
        prev.map((d) => (d.id === modal.id ? { ...form, id: modal.id } : d))
      );
    }
    fecharModal();
  }

  function alternarAtiva(id) {
    setDicas((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ativa: !d.ativa } : d))
    );
  }

  function excluirDica(id) {
    setDicas((prev) => prev.filter((d) => d.id !== id));
    setConfirmarExclusaoId(null);
  }

  const dicaParaExcluir = dicas.find((d) => d.id === confirmarExclusaoId);
  const ativas = dicas.filter((d) => d.ativa).length;

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

      {/* Cards de contagem por tipo */}
      <div className="admin-stats-grid">
        {Object.entries(TIPOS).map(([key, { label, Icon, accent, accentBg }]) => (
          <div className="admin-stat-card" key={key}>
            <div
              className="admin-stat-icon"
              style={{ backgroundColor: accentBg, color: accent }}
            >
              <Icon size={17} />
            </div>
            <div className="admin-stat-value">{contagemPorTipo[key] || 0}</div>
            <div className="admin-stat-label">{label}</div>
          </div>
        ))}
      </div>


      {/* Filtros por tipo */}
      <div className="dicas-tabs">
        <button
          className={`dicas-tab ${filtro === "todos" ? "dicas-tab--active" : ""}`}
          onClick={() => setFiltro("todos")}
        >
          Todos ({dicas.length})
        </button>
        {Object.entries(TIPOS).map(([key, { label }]) => (
          <button
            key={key}
            className={`dicas-tab ${filtro === key ? "dicas-tab--active" : ""}`}
            onClick={() => setFiltro(key)}
          >
            {label}s
          </button>
        ))}
        <span className="dicas-tabs-count">
          {ativas} ativas · {dicas.length - ativas} inativas
        </span>
      </div>

      {/* Grade de dicas */}
      <div className="dicas-grid">
        {dicasFiltradas.length === 0 && (
          <div className="dicas-empty">Nenhuma dica encontrada para este filtro.</div>
        )}

        {dicasFiltradas.map((dica) => {
          const { label, Icon, accent, accentBg } = TIPOS[dica.tipo];
          const dificuldadeClass =
            dica.dificuldade === "Baixa"
              ? "dica-tag--baixa"
              : dica.dificuldade === "Média"
                ? "dica-tag--media"
                : "dica-tag--alta";

          return (
            <div
              key={dica.id}
              className={`dica-card ${dica.ativa ? "" : "dica-card--inativa"}`}
              style={{ "--dica-accent": accent, "--dica-accent-bg": accentBg }}
            >
              <div className="dica-card-top">
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div className="dica-icon">
                    <Icon size={18} />
                  </div>
                  <div className="dica-tags">
                    <span className="dica-tag dica-tag--tipo">{label}</span>
                    <span className="dica-tag dica-tag--categoria">
                      {dica.categoria}
                    </span>
                    <span className={`dica-tag ${dificuldadeClass}`}>
                      {dica.dificuldade}
                    </span>
                  </div>
                </div>

                <div className="dica-card-actions">
                  <Switch
                    checked={dica.ativa}
                    onChange={() => alternarAtiva(dica.id)}
                    label={`Ativar ou desativar "${dica.titulo}"`}
                  />
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

              {dica.tipo === "video" && dica.videoUrl && (
                <a
                  className="dica-video-link"
                  href={dica.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon size={13} />
                  {dica.videoUrl}
                </a>
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

            <div className="dicas-field-row">
              <div className="dicas-field">
                <label htmlFor="dica-tipo">Tipo</label>
                <select
                  id="dica-tipo"
                  className="dicas-select"
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                >
                  {Object.entries(TIPOS).map(([key, { label }]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dicas-field">
                <label htmlFor="dica-dificuldade">Dificuldade</label>
                <select
                  id="dica-dificuldade"
                  className="dicas-select"
                  value={form.dificuldade}
                  onChange={(e) =>
                    setForm({ ...form, dificuldade: e.target.value })
                  }
                >
                  {DIFICULDADES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="dicas-field">
              <label htmlFor="dica-categoria">Categoria</label>
              <input
                id="dica-categoria"
                className="dicas-input"
                placeholder="Ex.: Ed. Financeira, Dívidas, Investimento..."
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
              <label htmlFor="dica-descricao">Descrição</label>
              <textarea
                id="dica-descricao"
                className="dicas-textarea"
                placeholder="Texto que aparece no card da dica"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              />
            </div>

            {form.tipo === "video" && (
              <div className="dicas-field">
                <label htmlFor="dica-video">Link do vídeo</label>
                <div className="dicas-video-field">
                  <LinkIcon size={15} />
                  <input
                    id="dica-video"
                    type="url"
                    placeholder="https://..."
                    value={form.videoUrl}
                    onChange={(e) =>
                      setForm({ ...form, videoUrl: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <div className="dicas-toggle-row">
              <span>Dica ativa</span>
              <Switch
                checked={form.ativa}
                onChange={(v) => setForm({ ...form, ativa: v })}
                label="Dica ativa"
              />
            </div>

            <div className="dicas-modal-actions">
              <button
                type="button"
                className="dicas-btn-secondary"
                onClick={fecharModal}
              >
                Cancelar
              </button>
              <button type="submit" className="dicas-btn-primary">
                {modal.mode === "novo" ? "Criar dica" : "Salvar alterações"}
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