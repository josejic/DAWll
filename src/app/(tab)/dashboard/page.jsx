"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const movimentacoes = [
  { mes: "Jan", receitas: 2400, despesas: 1800 },
  { mes: "Fev", receitas: 3800, despesas: 1400 },
  { mes: "Mar", receitas: 5200, despesas: 1000 },
  { mes: "Abr", receitas: 4900, despesas: 300 },
  { mes: "Mai", receitas: 4200, despesas: 250 },
  { mes: "Jun", receitas: 4600, despesas: 200 },
  { mes: "Jul", receitas: 4300, despesas: 180 },
  { mes: "Ago", receitas: 4700, despesas: 150 },
  { mes: "Set", receitas: 4400, despesas: 170 },
  { mes: "Out", receitas: 4900, despesas: 160 },
  { mes: "Nov", receitas: 5100, despesas: 190 },
  { mes: "Dez", receitas: 5300, despesas: 200 },
];

const metas = [
  { nome: "Fundo de Emergência", usuario: "Maria Silva", atual: 8500, alvo: 15000, status: "progresso" },
  { nome: "Viagem Europa", usuario: "João Santos", atual: 12000, alvo: 12000, status: "concluida" },
  { nome: "MBA em Finanças", usuario: "Ana Costa", atual: 10000, alvo: 25000, status: "progresso" },
  { nome: "Carro novo", usuario: "Pedro Lima", atual: 22000, alvo: 60000, status: "atrasada" },
  { nome: "Investir em ações", usuario: "Carla Oliveira", atual: 3200, alvo: 5000, status: "progresso" },
];

const transacoes = [
  { desc: "Salário mensal", meta: "Maria Silva · 04 jan", valor: 4500, tipo: "pos" },
  { desc: "Supermercado", meta: "João Santos · 03 jan", valor: -320.5, tipo: "neg" },
  { desc: "Mesada", meta: "Ana Costa · 02 jan", valor: 300, tipo: "pos" },
  { desc: "Uber", meta: "Pedro Lima · 02 jan", valor: -45, tipo: "neg" },
];

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

export default function AdminDashboardPage() {
  return (
    <>
      <h1 className="admin-page-title">Início</h1>
      <p className="admin-page-subtitle">Visão geral da plataforma bolso</p>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Total de usuários</span>
            <div className="admin-stat-icon admin-stat-icon--blue">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="7" r="4" />
                <path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
              </svg>
            </div>
          </div>
          <div className="admin-stat-value">128</div>
          <div className="admin-stat-foot">+12% este mês</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Receitas totais</span>
            <div className="admin-stat-icon admin-stat-icon--green">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 17l6-6 4 4 8-8" />
              </svg>
            </div>
          </div>
          <div className="admin-stat-value">R$ 5,00</div>
          <div className="admin-stat-foot">todas as transações</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Despesas totais</span>
            <div className="admin-stat-icon admin-stat-icon--red">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 4l-4 4h14M17 20l4-4H7" />
              </svg>
            </div>
          </div>
          <div className="admin-stat-value">R$ 1,50</div>
          <div className="admin-stat-foot">todas as transações</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">Metas concluídas</span>
            <div className="admin-stat-icon admin-stat-icon--yellow">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
          </div>
          <div className="admin-stat-value">2</div>
          <div className="admin-stat-foot">de 6 metas</div>
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <h3 className="admin-card-title">Movimentações</h3>
          <p className="admin-card-subtitle">Receitas vs Despesas</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={movimentacoes}>
              <CartesianGrid stroke="#EEF1EC" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="receitas" stroke="#3C7A5C" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="despesas" stroke="#B23A48" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title">Metas dos Usuários</h3>
          <p className="admin-card-subtitle">&nbsp;</p>
          {metas.map((m) => {
            const pct = Math.min(100, Math.round((m.atual / m.alvo) * 100));
            return (
              <div className="admin-goal-item" key={m.nome}>
                <div className="admin-goal-top">
                  <div>
                    <div className="admin-goal-name">{m.nome}</div>
                    <div className="admin-goal-user">{m.usuario}</div>
                  </div>
                  <span className={`admin-goal-badge ${badgeClasse(m.status)}`}>
                    {badgeTexto(m.status)}
                  </span>
                </div>
                <div className="admin-goal-bar-track">
                  <div className="admin-goal-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="admin-goal-values">
                  {formatarMoeda(m.atual)} / {formatarMoeda(m.alvo)} · {pct}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Transações Recentes</h3>
        <p className="admin-card-subtitle">&nbsp;</p>
        {transacoes.map((t, i) => (
          <div className="admin-tx-item" key={i}>
            <div className="admin-tx-left">
              <div className={`admin-tx-icon ${t.tipo === "pos" ? "admin-tx-icon--pos" : "admin-tx-icon--neg"}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {t.tipo === "pos" ? <path d="M12 19V5M5 12l7-7 7 7" /> : <path d="M12 5v14M5 12l7 7 7-7" />}
                </svg>
              </div>
              <div>
                <div className="admin-tx-desc">{t.desc}</div>
                <div className="admin-tx-meta">{t.meta}</div>
              </div>
            </div>
            <span className={`admin-tx-value ${t.tipo}`}>
              {t.valor > 0 ? "+" : ""}
              {formatarMoeda(t.valor)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}