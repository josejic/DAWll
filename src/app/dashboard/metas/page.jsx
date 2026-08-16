"use client";

import clsx from "clsx";
import { Plus, Search, ChevronDown, Pencil, Trash2 } from "lucide-react";

const metas = [
  {
    nome: "MBA em Finanças",
    usuario: "Ana Costa",
    desc: "Curso de pós-graduação",
    atual: 10000,
    alvo: 25000,
    status: "progresso",
    categoria: "Educação",
    prazo: "28/02/26",
  },
  {
    nome: "Fundo de Emergência",
    usuario: "Maria Silva",
    desc: "Guardar 6 meses de despesas",
    atual: 8500,
    alvo: 15000,
    status: "progresso",
    categoria: "Emergência",
    prazo: "30/12/25",
  },
  {
    nome: "Reserva para imprevistos",
    usuario: "Lucas Ferreira",
    desc: "Meta mínima de segurança",
    atual: 3000,
    alvo: 3000,
    status: "concluida",
    categoria: "Emergência",
    prazo: "31/03/25",
  },
  {
    nome: "Investir em ações",
    usuario: "Carla Oliveira",
    desc: "Carteira diversificada",
    atual: 3200,
    alvo: 5000,
    status: "progresso",
    categoria: "Investimento",
    prazo: "29/09/25",
  },
  {
    nome: "Viagem Europa",
    usuario: "João Santos",
    desc: "Férias na Europa em 2025",
    atual: 12000,
    alvo: 12000,
    status: "concluida",
    categoria: "Viagem",
    prazo: "30/06/25",
  },
  {
    nome: "Carro novo",
    usuario: "Pedro Lima",
    desc: "Trocar o carro",
    atual: 22000,
    alvo: 60000,
    status: "atrasada",
    categoria: "Compra",
    prazo: "31/05/25",
  },
];

const emAndamento = metas.filter((m) => m.status === "progresso").length;
const concluidas = metas.filter((m) => m.status === "concluida").length;

function badgeClasse(status) {
  if (status === "concluida") return "admin-goal-badge--done";
  if (status === "atrasada") return "admin-goal-badge--late";
  return "admin-goal-badge--progress";
}

function badgeTexto(status) {
  if (status === "concluida") return "Concluída";
  if (status === "atrasada") return "Atrasada";
  return "Em andamento";
}

function formatarMoeda(v) {
  return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

export default function MetasPage() {
  return (
    <>
      <div className="admin-page-header-row">
        <div>
          <h1 className="admin-page-title">Metas</h1>
          <p className="admin-page-subtitle">Acompanhe as metas financeiras dos usuários</p>
        </div>
        <button className="admin-btn-primary" type="button">
          <Plus size={16} />
          Nova Meta
        </button>
      </div>

      <div className="admin-simple-stats">
        <div className="admin-simple-stat-card">
          <div className="admin-simple-stat-label">Total de Metas</div>
          <div className="admin-simple-stat-value">{metas.length}</div>
        </div>
        <div className="admin-simple-stat-card">
          <div className="admin-simple-stat-label">Em Andamento</div>
          <div className="admin-simple-stat-value admin-simple-stat-value--blue">{emAndamento}</div>
        </div>
        <div className="admin-simple-stat-card">
          <div className="admin-simple-stat-label">Concluídas</div>
          <div className="admin-simple-stat-value admin-simple-stat-value--green">{concluidas}</div>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar-search">
          <Search size={15} />
          <input type="text" placeholder="Buscar metas..." />
        </div>
        <button className="admin-toolbar-filter" type="button">
          Todos status
          <ChevronDown size={15} />
        </button>
      </div>

      <div className="admin-goals-grid">
        {metas.map((m) => {
          const pct = Math.min(100, Math.round((m.atual / m.alvo) * 100));
          return (
            <div className="admin-goal-card-big" key={m.nome}>
              <div className="admin-goal-card-header">
                <span className="admin-goal-card-title">{m.nome}</span>
                <span className={clsx("admin-goal-badge", badgeClasse(m.status))}>
                  {badgeTexto(m.status)}
                </span>
              </div>
              <div className="admin-goal-card-owner">{m.usuario}</div>
              <div className="admin-goal-card-desc">{m.desc}</div>

              <div className="admin-goal-progress-row">
                <span>Progresso</span>
                <strong>{pct}%</strong>
              </div>
              <div className="admin-goal-bar-track">
                <div className="admin-goal-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="admin-goal-values-row">
                <span>{formatarMoeda(m.atual)}</span>
                <span>{formatarMoeda(m.alvo)}</span>
              </div>

              <div className="admin-goal-footer">
                <div className="admin-goal-footer-left">
                  <span className="admin-goal-category-tag">{m.categoria}</span>
                  <span className="admin-goal-due">até {m.prazo}</span>
                </div>
                <div className="admin-goal-footer-actions">
                  <button className="admin-table-action-btn" type="button" aria-label="Editar">
                    <Pencil size={14} />
                  </button>
                  <button
                    className="admin-table-action-btn admin-table-action-btn--danger"
                    type="button"
                    aria-label="Excluir"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
