"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  Users,
  TrendingUp,
  ArrowLeftRight,
  Target,
  ArrowUp,
  ArrowDown
} from "lucide-react";

import { movimentacoesMensais } from "./transacoes-data.js";

const Icon = ({ icon: IconComponent }) => (
  <IconComponent size={15} strokeWidth={2} />
);

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
  return `R$ ${v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2
  })}`;
}

export default function AdminDashboardPage() {
  return (
    <>
      <h1 className="admin-page-title">Início</h1>
      <p className="admin-page-subtitle">
        Visão geral da plataforma bolso
      </p>

      <div className="admin-stats-grid">

        {/* USUÁRIOS */}
        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">
              Total de usuários
            </span>

            <div className="admin-stat-icon admin-stat-icon--blue">
              <Icon icon={Users} />
            </div>
          </div>

          <div className="admin-stat-value">128</div>
          <div className="admin-stat-foot">+12% este mês</div>
        </div>

        {/* RECEITAS */}
        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">
              Receitas totais
            </span>

            <div className="admin-stat-icon admin-stat-icon--green">
              <Icon icon={TrendingUp} />
            </div>
          </div>

          <div className="admin-stat-value">R$ 5,00</div>
          <div className="admin-stat-foot">
            todas as transações
          </div>
        </div>

        {/* DESPESAS */}
        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">
              Despesas totais
            </span>

            <div className="admin-stat-icon admin-stat-icon--red">
              <Icon icon={ArrowLeftRight} />
            </div>
          </div>

          <div className="admin-stat-value">R$ 1,50</div>
          <div className="admin-stat-foot">
            todas as transações
          </div>
        </div>

        {/* METAS */}
        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span className="admin-stat-label">
              Metas concluídas
            </span>

            <div className="admin-stat-icon admin-stat-icon--yellow">
              <Icon icon={Target} />
            </div>
          </div>

          <div className="admin-stat-value">2</div>
          <div className="admin-stat-foot">de 6 metas</div>
        </div>

      </div>

      <div className="admin-grid-2">

        {/* GRÁFICO */}
        <div className="admin-card">
          <h3 className="admin-card-title">Movimentações</h3>
          <p className="admin-card-subtitle">
            Receitas vs Despesas
          </p>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={movimentacoesMensais}>
              <CartesianGrid
                stroke="#7dc1a8"
                vertical={false}
              />

              <XAxis
                dataKey="mes"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="receitas"
                stroke="#7dc1a8"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="despesas"
                stroke="#B23A48"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* METAS */}
        <div className="admin-card">
          <h3 className="admin-card-title">
            Metas dos Usuários
          </h3>

          <p className="admin-card-subtitle">&nbsp;</p>

          {metas.map((m) => {
            const pct = Math.min(
              100,
              Math.round((m.atual / m.alvo) * 100)
            );

            return (
              <div className="admin-goal-item" key={m.nome}>

                <div className="admin-goal-top">
                  <div>
                    <div className="admin-goal-name">
                      {m.nome}
                    </div>

                    <div className="admin-goal-user">
                      {m.usuario}
                    </div>
                  </div>

                  <span
                    className={`admin-goal-badge ${badgeClasse(
                      m.status
                    )}`}
                  >
                    {badgeTexto(m.status)}
                  </span>
                </div>

                <div className="admin-goal-bar-track">
                  <div
                    className="admin-goal-bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="admin-goal-values">
                  {formatarMoeda(m.atual)} /{" "}
                  {formatarMoeda(m.alvo)} · {pct}%
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* TRANSAÇÕES */}
      <div className="admin-card">
        <h3 className="admin-card-title">
          Transações Recentes
        </h3>

        <p className="admin-card-subtitle">&nbsp;</p>

        {transacoes.map((t, i) => {

          const positivo = t.tipo === "pos";

          return (
            <div className="admin-tx-item" key={i}>

              <div className="admin-tx-left">

                <div
                  className={`admin-tx-icon ${
                    positivo
                      ? "admin-tx-icon--pos"
                      : "admin-tx-icon--neg"
                  }`}
                >
                  <Icon
                    icon={positivo ? ArrowUp : ArrowDown}
                  />
                </div>

                <div>
                  <div className="admin-tx-desc">
                    {t.desc}
                  </div>

                  <div className="admin-tx-meta">
                    {t.meta}
                  </div>
                </div>

              </div>

              <span
                className={`admin-tx-value ${t.tipo}`}
              >
                {t.valor > 0 ? "+" : ""}
                {formatarMoeda(t.valor)}
              </span>

            </div>
          );
        })}
      </div>
    </>
  );
}