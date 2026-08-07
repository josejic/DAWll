"use client";

import clsx from "clsx";
import {
  ArrowUpRight,
  ArrowDownRight,
  Hash,
  Plus,
  Search,
  ChevronDown,
  Eye,
  Trash2,
} from "lucide-react";

const transacoes = [
  { desc: "Supermercado", categoria: "Alimentação", valor: -320.5, data: "07/01/2025" },
  { desc: "Curso de finanças", categoria: "Educação", valor: -450, data: "14/01/2025" },
  { desc: "Salário + bônus", categoria: "Salário", valor: 5200, data: "04/03/2025" },
  { desc: "Salário mensal", categoria: "Salário", valor: 4500, data: "04/01/2025" },
  { desc: "Rendimento CDI", categoria: "Investimento", valor: 1200, data: "09/01/2025" },
  { desc: "Salário", categoria: "Salário", valor: 3800, data: "04/02/2025" },
  { desc: "Dividendos", categoria: "Investimento", valor: 850, data: "09/02/2025" },
  { desc: "Aluguel", categoria: "Moradia", valor: -1500, data: "31/01/2025" },
  { desc: "Cinema e restaurante", categoria: "Lazer", valor: -150, data: "28/02/2025" },
  { desc: "Combustível", categoria: "Transporte", valor: -180, data: "11/01/2025" },
];

const totalReceitas = transacoes.filter((t) => t.valor > 0).reduce((s, t) => s + t.valor, 0);
const totalDespesas = transacoes.filter((t) => t.valor < 0).reduce((s, t) => s + Math.abs(t.valor), 0);

function formatarMoeda(v) {
  return `R$ ${Math.abs(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

export default function TransacoesPage() {
  return (
    <>
      <div className="admin-page-header-row">
        <div>
          <h1 className="admin-page-title">Transações</h1>
          <p className="admin-page-subtitle">Movimentações financeiras de todos os usuários</p>
        </div>
        <button className="admin-btn-primary" type="button">
          <Plus size={16} />
          Nova Transação
        </button>
      </div>

      <div className="admin-tx-stats">
        <div className="admin-tx-stat-card">
          <div className="admin-tx-stat-icon admin-tx-stat-icon--green">
            <ArrowUpRight size={17} />
          </div>
          <div>
            <div className="admin-tx-stat-label">Receitas</div>
            <div className="admin-tx-stat-value admin-tx-stat-value--green">
              {formatarMoeda(totalReceitas)}
            </div>
          </div>
        </div>

        <div className="admin-tx-stat-card">
          <div className="admin-tx-stat-icon admin-tx-stat-icon--red">
            <ArrowDownRight size={17} />
          </div>
          <div>
            <div className="admin-tx-stat-label">Despesas</div>
            <div className="admin-tx-stat-value admin-tx-stat-value--red">
              {formatarMoeda(totalDespesas)}
            </div>
          </div>
        </div>

        <div className="admin-tx-stat-card">
          <div className="admin-tx-stat-icon admin-tx-stat-icon--gray">
            <Hash size={17} />
          </div>
          <div>
            <div className="admin-tx-stat-label">Total</div>
            <div className="admin-tx-stat-value">{transacoes.length} transações</div>
          </div>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar-search">
          <Search size={15} />
          <input type="text" placeholder="Buscar transações..." />
        </div>
        <button className="admin-toolbar-filter" type="button">
          Todos tipos
          <ChevronDown size={15} />
        </button>
        <button className="admin-toolbar-filter" type="button">
          Todas categorias
          <ChevronDown size={15} />
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t, i) => (
              <tr key={i}>
                <td>
                  <div
                    className={clsx(
                      "admin-tx-tipo-icon",
                      t.valor > 0 ? "admin-tx-tipo-icon--pos" : "admin-tx-tipo-icon--neg"
                    )}
                  >
                    {t.valor > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{t.desc}</td>
                <td>
                  <span className="admin-badge-categoria">{t.categoria}</span>
                </td>
                <td className={clsx("admin-tx-value", t.valor > 0 ? "pos" : "neg")}>
                  {t.valor > 0 ? "+" : "-"}
                  {formatarMoeda(t.valor)}
                </td>
                <td>
                  <span className="admin-badge-status">Concluída</span>
                </td>
                <td>{t.data}</td>
                <td>
                  <div className="admin-table-actions">
                    <button className="admin-table-action-btn" type="button" aria-label="Ver">
                      <Eye size={15} />
                    </button>
                    <button
                      className="admin-table-action-btn admin-table-action-btn--danger"
                      type="button"
                      aria-label="Excluir"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}